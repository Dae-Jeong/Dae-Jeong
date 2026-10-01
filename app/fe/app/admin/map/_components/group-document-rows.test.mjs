import test from 'node:test';
import assert from 'node:assert/strict';
import { groupDocumentRows } from './group-document-rows.ts';
import { STATUS_ORDER, STATUS_LABEL } from '../../../../features/applications/status.ts';

test('uses shared status order and labels, counts companies and preserves every row once', () => {
  const rows = [...STATUS_ORDER].reverse().map((status, i) => ({ key: `company-${i}`, status, cells: { resume: { href: `/company-${i}/resume` } } }));
  rows.push({ key: 'second-in-progress', status: 'in-progress', cells: {} }, { key: 'unmatched', cells: { career: { href: '/unmatched/career' } } });
  const groups = groupDocumentRows(rows, 'ready');
  assert.deepEqual(groups.map(g => g.key), STATUS_ORDER);
  assert.deepEqual(groups.map(g => g.title), STATUS_ORDER.map(s => STATUS_LABEL[s]));
  assert.equal(groups[0].rows.length, 2);
  assert.equal(groups.at(-1).title, '상태 미확인');
  assert.equal(groups.find(g => g.key === 'pre-apply').rows.length, 2);
  assert.equal(new Set(groups.flatMap(g => g.rows)).size, rows.length);
  for (const row of rows) assert.equal(groups.flatMap(g => g.rows).filter(r => r.key === row.key).length, 1);
});
for (const kind of ['missing', 'error']) test(`${kind} keeps links in fallback, never infers unmatched`, () => {
  const rows = [{ key: 'linked', cells: { resume: { href: '/linked/resume' } } }, { key: 'draft', cells: { resume: { label: '초안', note: '배포 비공개 · 승인 전' } } }];
  const groups = groupDocumentRows(rows, kind);
  assert.equal(groups.length, 1); assert.equal(groups[0].key, 'companies');
  assert.deepEqual(groups[0].rows, rows); assert.equal(groups[0].rows[0].cells.resume.href, '/linked/resume');
  assert.equal(groups[0].rows[1].cells.resume.href, undefined);
});
test('ready empty and unavailable empty produce no empty company section', () => {
  for (const kind of ['ready', 'missing', 'error']) assert.deepEqual(groupDocumentRows([], kind), []);
});
test('ready without matching history and sparse statuses render only present groups', () => {
  assert.deepEqual(groupDocumentRows([{ key: 'a' }], 'ready').map(g => g.key), ['pre-apply']);
  assert.deepEqual(groupDocumentRows([{ status: 'rejected' }, { status: 'unknown' }], 'ready').map(g => g.key), ['rejected', 'unknown']);
});

test('prepared row receives consistent pre-apply cell without mutating source or its links', () => {
  const cells = { resume: { href: '/prepared/resume' } };
  const original = { key: 'prepared', cells };
  const row = groupDocumentRows([original], 'ready')[0].rows[0];
  assert.equal(row.status, 'pre-apply');
  assert.equal(original.status, undefined);
  assert.equal(row.cells, cells);
});
