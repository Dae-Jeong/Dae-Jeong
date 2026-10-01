import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = readFileSync(
  new URL("../features/admin-auth/apis.ts", import.meta.url),
  "utf8",
);
const code = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const fresh = async () =>
  import(
    "data:text/javascript;base64," +
    Buffer.from(code).toString("base64") +
    "#" + Math.random()
  );

const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, resolve, reject };
};

const response = (session = { admin: true, expiresAt: 9999999999 }) => ({
  ok: true,
  json: async () => session,
});

test("concurrent consumers share only pending GET; success and failure allow immediate requery", async () => {
  const api = await fresh();
  const requests = [];
  const original = globalThis.fetch;
  globalThis.fetch = () => {
    const request = deferred();
    requests.push(request);
    return request.promise;
  };

  try {
    const a = api.getSession();
    const b = api.getSession();
    assert.equal(requests.length, 1);
    assert.equal(a, b);
    requests[0].resolve(response());
    assert.deepEqual(await a, await b);

    const c = api.getSession();
    assert.equal(requests.length, 2);
    requests[1].reject(new Error("offline"));
    assert.deepEqual(await c, { admin: false });

    const d = api.getSession();
    assert.equal(requests.length, 3);
    requests[2].resolve({ ok: false });
    assert.deepEqual(await d, { admin: false });

    const e = api.getSession();
    assert.equal(requests.length, 4);
    requests[3].resolve(response());
    assert.equal((await e).admin, true);
  } finally {
    globalThis.fetch = original;
  }
});

test("login/logout boundaries detach old GET; its completion cannot clear the newer pending GET", async () => {
  for (const mutation of ["login", "logout"]) {
    for (const succeeds of [false, true]) {
      for (const oldFails of [false, true]) {
        const api = await fresh();
        const requests = [];
        const original = globalThis.fetch;
        globalThis.fetch = (url) => {
          const request = deferred();
          requests.push({ url, ...request });
          return request.promise;
        };

        try {
          const old = api.getSession();
          const mutate = mutation === "login"
            ? api.login("fixture-only")
            : api.logout();
          const during = api.getSession();
          assert.equal(requests.length, 3);
          assert.equal(requests[2].url, "/api/admin/session");

          requests[1].resolve(
            succeeds
              ? response({ expiresAt: 9999999999 })
              : { ok: false, status: 401 },
          );
          const result = await mutate;
          assert.equal(mutation === "login" ? result.kind === "ok" : result, succeeds);

          const newer = api.getSession();
          assert.equal(requests.length, 4);
          if (oldFails) {
            requests[0].reject(new Error("old failure"));
          } else {
            requests[0].resolve(response({ admin: false }));
          }
          await old;
          assert.equal(api.getSession(), newer);
          assert.equal(requests.length, 4);

          requests[2].resolve(response({ admin: false }));
          await during;
          assert.equal(api.getSession(), newer);

          requests[3].resolve(response());
          await newer;
          const next = api.getSession();
          assert.equal(requests.length, 5);
          requests[4].resolve(response());
          await next;
        } finally {
          globalThis.fetch = original;
        }
      }
    }
  }
});
