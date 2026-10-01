import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { groupDocumentRows } = await import('./group-document-rows.ts');
const status = await import('../../../../features/applications/status.ts');
function moduleFrom(path, mocks) {
  const code = ts.transpileModule(readFileSync(new URL(path, import.meta.url), 'utf8'), {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  const compiledModule = {exports:{}};
  vm.runInNewContext(code, {module:compiledModule,exports:compiledModule.exports,require:name=>name in mocks?mocks[name]:require(name)}, {filename:path});
  return compiledModule.exports;
}
const {StatusSectionHeading} = moduleFrom('../../../_components/admin/status-section-heading.tsx', {});
for(const kind of ['ready','missing','error','empty']) test(`actual page isolated ${kind} keeps common, counts, links and notices`, async()=>{
  let guarded = 0;
  const docs = kind==='empty'?[]:[
    ...['one','two','unknown','unmatched','private'].map(company=>({document:{company,companyName:company,kind:'resume',public:true},viewable:company!=='private'})),
    {document:{company:'one',companyName:'one',kind:'career',public:false},viewable:true},
  ];
  const attempts=[{id:'irrelevant',companies:['one','two'],status:'in-progress'},{id:'unknown-attempt',companies:['unknown'],status:'unknown'}];
  const page=moduleFrom('../page.tsx',{
    '@/app/_components/admin/status-section-heading':{StatusSectionHeading},
    './_components/group-document-rows':{groupDocumentRows},
    '@/app/_components/admin/admin-notice':{AdminNotice:({tone,children})=>React.createElement('p',{role:tone==='alert'?'alert':'status'},children)},
    '@/lib/routes':{ROUTES:{resume:'/resume',career:'/career',cv:'/cv'}},
    '@/features/applications/status':status,
    'next/link':{default:({children,...props})=>React.createElement('a',props,children)},
    '@/app/_components/admin/admin-shell':{AdminShell:({children})=>React.createElement('main',null,children)},
    '@/features/applications/load-applications':{loadApplications:async()=>{assert.equal(guarded,1);return kind==='ready'||kind==='empty'?{kind:'ready',data:{attempts}}:{kind}}},
    '@/features/admin-auth/guard':{requireAdmin:async()=>{guarded++}},
    '@/features/company-documents/urls':{companyDocumentHref:(company,kind)=>`/${company}/${kind}`},
    '@/features/company-documents/policy':{listRepresentativeEntries:()=>docs},
    '@/features/company-documents/types':{companyKinds:[{slug:'resume',label:'이력서'},{slug:'career',label:'경력기술서'},{slug:'cv',label:'CV'}]},
  }).default;
  const html=renderToStaticMarkup(await page());
  assert.equal(guarded,1);
  assert.equal((html.match(/data-map-row="common"/g)||[]).length,1);
  for(const href of ['/resume','/career','/cv'])assert(html.includes(`href="${href}"`));
  if(kind==='empty'){assert(html.includes('등록된 회사별 문서가 없습니다.'));assert.equal((html.match(/<section/g)||[]).length,1);return;}
  for(const company of ['one','two','unknown','unmatched','private'])assert.equal((html.match(new RegExp(`data-map-row="${company}"`,'g'))||[]).length,1,company);
  assert(html.includes('href="/one/resume"'));assert(html.includes('href="/one/career"'));assert(!html.includes('href="/private/resume"'));assert(html.includes('배포 비공개 · 승인 전'));
  if(kind==='ready'){
    assert(html.includes('id="map-in-progress"'));assert(html.includes('id="map-unknown"'));assert(html.includes('id="map-pre-apply"'));
    assert(!html.includes('id="map-unmatched"'));assert.equal((html.match(/<section/g)||[]).length,4);
    assert(!html.includes('지원 이력 없음'));
    for (const company of ['unmatched', 'private']) assert(new RegExp(`data-map-row="${company}"[^]*?<td[^]*?<td[^]*?지원 전`).test(html));
    assert(/진행 중<span[^>]*>2<\/span>/.test(html));assert(/상태 미확인<span[^>]*>1<\/span>/.test(html));assert(/지원 전<span[^>]*>2<\/span>/.test(html));
  }else{
    assert(html.includes('id="map-companies"'));assert(!html.includes('지원 이력 없음'));assert(html.includes(kind==='error'?'role="alert"':'role="status"'));assert(html.includes(kind==='error'?'지원 현황을 불러오지 못함':'지원 현황 없음'));
  }
});
