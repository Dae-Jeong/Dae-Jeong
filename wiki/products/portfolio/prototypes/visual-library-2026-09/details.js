// Same claim/summary metadata as the overview; only the diagram expression differs.
const DT=(x,y,s,c='dstrong',a='middle')=>txt(x,y,s,c,a);
const DL=(p,s='',x=0,y=0,c='')=>`<path d="${p}" class="dline ${c}"/>${s?DT(x,y,s,'dlabel'):''}`;
const DB=(x,y,w,title,sub='',kind='dbox',h=76)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${kind}"/>${DT(x+w/2,y+(sub?30:h/2+6),title)}${sub?DT(x+w/2,y+56,sub,'dsub'):''}`;
const DG=(x,y,w,h,title,sub='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" class="dlane"/>${DT(x+22,y+31,title,'dtitle','start')}${sub?DT(x+22,y+57,sub,'dsub','start'):''}`;
const lanes=(names)=>names.map((n,i)=>DG(20+i*470,20,420,425,n[0],n[1])).join('');
const box=(col,y,t,s='',kind='dbox')=>DB(48+col*470,y,364,t,s,kind);
const down=(col,y1,y2,s='')=>DL(`M${230+col*470} ${y1}V${y2}`,s,310+col*470,(y1+y2)/2+5);
const across=(from,to,y,s='')=>DL(`M${412+from*470} ${y}H${48+to*470}`,s,(460+(from+to)*235),y-16);
const rule=(i,title,context,rows)=>{
 const x=20+i*460;
 return `<rect x="${x}" y="520" width="440" height="204" rx="10" class="dfault"/>${DT(x+22,550,title,'dstrong','start')}${DT(x+22,581,context,'dsub','start')}<path d="M${x+22} 600H${x+418}" stroke="#e4d6c2"/>`+rows.map((r,j)=>{const y=633+j*43;return DT(x+22,y,r[0],'dsub','start')+DL(`M${x+112} ${y-6}H${x+142}`,'',0,0,'dwarn')+DT(x+160,y,r[1],'','start');}).join('');
};
const rules=(heading,items)=>DT(22,492,heading,'dtitle','start')+items.map((a,i)=>rule(i,...a)).join('');
const D={};
const chain=(steps)=>steps.map((s,i)=>DB(35+i*345,145,295,s[0],s[1],i===2?'dgate':'dbox')+(i<3?DL(`M${330+i*345} 183H${378+i*345}`):'')).join('');
const matrix=(title,heads,rows)=>DG(20,20,1360,425,title)+heads.map((h,i)=>DT(85+i*420,110,h,'dstrong','start')).join('')+rows.map((r,j)=>`<path d="M50 ${139+j*90}H1350" stroke="#d7e0e8"/>`+r.map((s,i)=>DT(85+i*420,185+j*90,s,i?'dsub':'dstrong','start')).join('')).join('');

D.tenant=()=>lanes([['01 · 관리자 인증','서버가 소유하는 작업 지점'],['02 · 지점 전환 요청','권한이 있는 전환 API'],['03 · 접근 경계','클라이언트 지정값을 신뢰하지 않음']])+box(0,112,'인증 상태에서 지점 확인','관리자 작업 context')+box(0,286,'지점이 선택됐는가?','미선택 요청은 거절','dgate')+down(0,188,284)+box(1,112,'전환할 지점 권한 확인','허용된 관리자만 전환','dgate')+box(1,286,'작업 지점 갱신','서버 인증 상태에 반영')+down(1,188,284)+box(2,112,'서버 context로 접근','임의 header 지정과 분리')+box(2,286,'기존 Homepage 계약 유지','관리자 경계와 별도 취급')+across(0,1,150)+across(1,2,150)+rules('권한 판단과 검증 범위',[['지점 미선택','작업 context가 없는 요청',[['처리','409 응답'],['요구','작업 지점 선택']]],['권한 없는 전환','대상 지점에 접근할 수 없음',[['처리','403 응답'],['보호','임의 지점 전환 차단']]],['진행 상태','경계 전환을 주도하는 단계',[['구현','관리자 접근 경계'],['남음','일부 회귀 검증']]]]);
D.generation=()=>matrix('생성 경로를 단순화하면서 비교 가능성 유지',['구분','기존 Graph 경로','비교용 Agent 경로'],[['실행','LangGraph 생성 그래프','단일 SDK agent engine'],['공통 계약','guard · repair 적용','동일 guard · repair 적용'],['비교','trace 식별 유지','실제 실행 시간 대조']])+rules('단순화의 판단 기준',[['생성 흐름','하나의 발행 가능한 결과에 집중',[['변경','불필요한 흐름 축소'],['보존','trace용 node 식별']]],['실행 준비','그래프 준비 시점을 분리',[['시점','첫 생성 요청'],['방식','lazy compilation']]],['교체 경계','실제 교체하는 의존성에 한정',[['분리','LLM · tool adapter'],['지양','전 계층의 과한 추상화']]]]);
D.labeling=()=>matrix('재적재 시 필드별 갱신 정책',['데이터','동일 source key 재적재','소유 경계'],[['원문·이어쓰기','원문 갱신 · 이어쓰기 교체','별도 labeling schema'],['사람 평가','기존 점수·사유 보존','관리 화면의 평가 기록'],['LLM 검수','자동 검수 이력 별도 저장','사람 평가와 분리']])+rules('Importer와 평가 화면의 검증',[['입력·식별','반복 적재의 기본 계약',[['입력','typed batch validation'],['반영','source key 기반 upsert']]],['증분 재적재','기존 평가가 사라지지 않는지',[['데이터','적재 건수 확인'],['평가','label 유지 확인']]],['평가 진행','평가자가 이어서 작업할 수 있게',[['작성','글별 점수·사유'],['이동','진행률·다음 미평가 글']]]]);
D.quality=()=>matrix('품질 기준의 서로 다른 근거',['판단 층','확인할 내용','역할'],[['형식 기준','필수 형식·출력 계약','결정적 최소 기준'],['관측 분포','실제 데이터의 특성','기준 재측정의 근거'],['사람 판단','글별 점수와 사유','자동 평가와 분리']])+rules('자사 출력이 기준으로 돌아오는 순환 점검',[['발견','출력과 평가 기준의 관계',[['위험','자사 출력이 기준화'],['대응','독립적인 재측정']]],['수정','기준을 그대로 강화하지 않음',[['점검','평가 축과 기준'],['반영','판단 기준 재수립']]],['성과 위치','제품 개발을 지원한 검증 작업',[['역할','품질 판단 기반'],['제한','품질 향상 수치 아님']]]]);
D.rebuild=()=>DG(20,20,1360,425,'기존 화면을 유지하고 백엔드 전환 경로 선택','초기 시제품 이후 제품화 단계의 판단')+chain([['대안 비교','점진 수정 / 병렬 재구축'],['병렬 FastAPI 선택','공통 개발 기준 정립'],['기능 단위 구현','분석·테스트·FE 연동'],['연결 전환','기존 화면 유지']])+DB(335,310,730,'유지할 계약과 바꿀 구현을 분리','고객 화면 전체 재작성과 백엔드 재구축을 묶지 않음')+rules('재구축에서 맡은 엔지니어링',[['선택','제품화에 필요한 전환 방식',[['비교','기존 구조의 점진 수정'],['결정','병렬 백엔드 재구축']]],['실행','기준을 세우고 기능별로 이행',[['기준','계층·트랜잭션·API'],['검증','기능 테스트·화면 연동']]],['소유 범위','시제품과 이후 구현을 구분',[['기여','이후 제품화·백엔드'],['구분','초기 시제품 단독 아님']]]]);
D.template=()=>matrix('기능 구현자와 공통 템플릿의 책임',['계층','기능 담당자가 구현','템플릿이 제공'],[['API · Service','제품 요청·업무 로직','계층 규칙·API 계약'],['Repository · Model','데이터 접근·도메인 모델','세션 접근 기본값'],['Transaction','업무 단위 경계 선택','전파·rollback·자원 정리']])+rules('다른 직군의 구현을 지원한 방식',[['기능 담당자','coding agent로 제품 기능 구현',[['집중','기능 요구·제품 로직'],['활용','공통 backend template']]],['엔지니어 역할','기본값 제공 이후에도 지원',[['피드백','구조·구현 검토'],['지원','검증·배포']]],['적용 범위','일괄 적용으로 과장하지 않음',[['기존','세션 구조 점진 적용'],['신규','템플릿 전체 적용']]]]);
D.rag=()=>DG(20,20,1360,425,'판정의 근거를 먼저 고정하고 LLM은 문장화','설계·구현 진행 중 · 생성형 answer adapter는 임상 검수 대기')+chain([['엔티티 확정','자연어 → code · alias'],['구조화 규칙 판정','관계형 기준 데이터'],['문헌 검색','lexical ranking'],['Context Pack','source ID · revision']])+DB(515,310,370,'LLM 문장화','안전·추천 판단 권한 없음')+DL('M1218 221V348H887')+rules('검색·생성의 권한 분리',[['판정','문장 생성 전에 판단',[['소유','구조화 규칙'],['역할','안전·추천 조건']]],['근거','문헌과 판정 결과를 연결',[['검색','lexical 문헌 검색'],['추적','출처 ID·revision']]],['확장 조건','vector-first로 시작하지 않음',[['현재','구조화·문헌 검색'],['후보','평가 후 embedding']]]]);
D.publication=()=>DG(20,20,1360,425,'기준 데이터 적재와 공개 release를 분리','기존 계약 유지 · 전환 진행 중')+chain([['기존 JSON','API 계약 동결 테스트'],['결정적 Importer','반복 적재 정합성'],['Canonical DB','규칙·문서·release'],['Draft','검수 중 release']])+DB(865,310,280,'Publication Gate','공개 승격 판단','dgate')+DB(420,310,280,'Published','승인된 release')+DL('M1218 221V348H1147')+DL('M865 348H702')+rules('서로 다른 데이터 책임',[['호환성','저장 방식 변경과 API 계약',[['보호','기존 계약 동결 테스트'],['전환','JSON → 관계형 기준']]],['적재','반복 실행 가능한 입력 처리',[['방식','결정적 importer'],['구분','적재 완료 ≠ 공개']]],['공개','release 단위 승격',[['초기','draft로 관리'],['조건','publication gate 통과']]]]);
D.agent=()=>DG(20,20,1360,425,'편집 실행과 운영 명령을 다른 경계로 처리','독립 prototype · 실제 계정 상태 변경은 하지 않음')+chain([['자연어 요청','대화 context'],['Typed Plan','등록 capability 선택'],['Executor','편집 기능 실행'],['Artifact','version으로 결과 관리']])+DB(370,310,300,'명시적 확인','상태 변경 명령 승인','dgate')+DB(825,310,380,'Mock Gateway','멱등 command 경계')+DL('M528 221V308')+DL('M670 348H823')+rules('대화의 기록과 실행 범위',[['맥락','장기 대화 입력 크기 관리',[['기록','append-only activity'],['축약','token-aware compaction']]],['결과','실행 기록과 산출물 분리',[['관리','versioned artifact'],['재사용','편집 writer 기능']]],['검증 범위','운영 명령은 Mock에서 검증',[['구현','확인·멱등 실행 경계'],['제외','실제 예약·발행·삭제']]]]);
D.kubernetes=()=>DG(300,20,1080,425,'개인 Mac · Lima / kubeadm 3-node cluster','노드별 workload 배치를 확정하지 않은 논리 경로')+DB(25,140,230,'Host Client','호스트 접근')+DB(345,140,260,'Ingress','ingress-nginx')+DB(680,140,260,'Service','요청 라우팅')+DB(1020,140,280,'Pod','애플리케이션')+DL('M255 178H343')+DL('M605 178H678')+DL('M940 178H1018')+DB(1020,320,280,'PVC','local-path')+DL('M1160 216V318')+DB(345,320,350,'선언적 배포','Helm · ArgoCD')+DT(825,360,'Calico · MetalLB','dsub')+rules('설치 이후 확인한 경로',[['요청·저장','실제 기능 연결 검증',[['요청','Ingress → Service → Pod'],['저장','Pod → PVC']]],['네트워크','VM 통신을 막던 제약 진단',[['변경','vzNAT → user-v2'],['접근','host forwarding 조정']]],['소유·범위','개인 환경의 직접 구축',[['확인','LoadBalancer IP 할당'],['구분','회사 production 아님']]]]);
D['infra-change']=()=>matrix('제품군·환경별 변경 범위 분리',['공통 Root','제품군 / STG','제품군 / Production'],[['별도 remote state','별도 remote state','별도 remote state'],['공유 리소스 변경','STG 변경 범위','Production 변경 범위'],['State · Plan · Live 대조','State · Plan · Live 대조','State · Plan · Live 대조']])+rules('Apply 이전의 교차 확인',[['State','도구가 관리하는 현재 상태',[['확보','state snapshot'],['확인','관리 대상·주소']]],['Plan · Live','계획과 실제 리소스 비교',[['검토','destroy · replace'],['대조','실제 존재·설정']]],['사람 판단','의도하지 않은 교체를 통제',[['이상','apply 이전에 보류'],['정상','변경 범위 확인 후 적용']]]]);
D.operations=()=>DG(20,20,1360,425,'결정부터 배포까지 같은 작업 맥락 유지','제품 일정·이슈·릴리스 운영 리드 · 회사 업무 AX 구조 설계 참여')+chain([['제품 결정','요구·우선순위'],['명세·작업 기록','담당 범위 연결'],['기능 구현','BE · FE 담당'],['검수·릴리스','승인·버전 확인']])+DB(335,310,730,'인수인계 가능한 실행 맥락','결정·명세·진행 기록을 사람과 coding agent가 함께 참조')+rules('릴리스 판단에 연결한 상태',[['검수','작업 상태만으로 출시하지 않음',[['확인','QA 승인'],['소유','사람의 승인 책임']]],['완료·버전','실제 완료와 변경을 기록',[['연결','완료 시점·버전 변경'],['파생','release notes 자동화']]],['AX 확장','제품 운영 경험에서 출발',[['참여','회사 업무 구조 설계'],['구분','플랫폼 직접 구축 아님']]]]);

function renderDetail(){
 let i=cases.findIndex(c=>c.id===location.hash.slice(1));if(i<0)i=0;const c=cases[i];picker.value=c.id;
 for(const k of ['category','title','summary','takeaway','scope'])document.querySelector('#'+k).textContent=c[k];
 document.querySelector('#overview').href='index.html#'+c.id;
 const canvas=document.querySelector('#canvas');canvas.dataset.case=c.id;
 const markers='<defs><marker id="da" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#6c8ba6"/></marker><marker id="dw" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#b4884f"/></marker></defs>';
 canvas.innerHTML=['outbox','infrastructure'].includes(c.id)?`<iframe title="${esc(c.title)}" src="${c.id==='outbox'?'outbox-detail':'infrastructure'}.html?embed"></iframe>`:`<svg viewBox="0 0 1400 760" role="img" aria-labelledby="detail-title"><title id="detail-title">${esc(c.title)}</title>${markers}${D[c.id]()}</svg>`;
 document.querySelector('#count').textContent=`${i+1} / ${cases.length}`;document.querySelector('#prev').disabled=i===0;document.querySelector('#next').disabled=i===cases.length-1;document.title=c.title+' · 내부 동작';
}
picker.onchange=()=>location.hash=picker.value;
document.querySelector('#prev').onclick=()=>location.hash=cases[Math.max(0,picker.selectedIndex-1)].id;
document.querySelector('#next').onclick=()=>location.hash=cases[Math.min(cases.length-1,picker.selectedIndex+1)].id;
window.addEventListener('hashchange',renderDetail);
window.addEventListener('keydown',e=>{if(['SELECT','INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight')document.querySelector('#next').click();if(e.key==='ArrowLeft')document.querySelector('#prev').click();});
window.addEventListener('DOMContentLoaded',renderDetail);

D.product=()=>lanes([['01 · 고객의 반복 업무','콘텐츠 제작의 전후 과정을 함께 다룸'],['02 · 직접 구현한 제품 기능','백엔드·AI·핵심 화면'],['03 · 출시 이후 제품 운영','기획·QA·마케팅과 협업']])+
 box(0,113,'자료 정리·초안·검수','참고 자료와 작성 맥락')+box(0,270,'수정·예약·발행 결정','최종 판단은 사용자')+down(0,189,268)+
 box(1,113,'제품 백엔드 + 생성·평가','API·도메인 모델·AI 실행')+box(1,270,'사용자·관리 화면','coding agent 활용 · 검수·배포')+down(1,189,268)+
 box(2,113,'출시·QA·운영 이슈 연결','실제 고객 사용 과정 대응')+DT(1170,300,'월 1천만 원 수준','dmetric')+DT(1170,337,'2026.08 구독료 매출 · 제품·팀 성과','dsub')+down(2,189,253)+across(0,1,151)+across(1,2,151)+
 rules('제품화에서 맡은 책임',[['제품의 시작','초기 시제품 이후의 역할을 구분',[['아이디어','제품 아이디어 제안'],['구현','이후 제품화 주도']]],['엔지니어링','기능을 실제 사용 흐름으로 연결',[['직접 구현','백엔드·AI 시스템'],['화면','요구 정의·구현·검수']]],['운영과 시장','기술 역할과 팀 결과를 함께 제시',[['운영','기획·QA·마케팅 조율'],['시장 반응','실제 구독 매출 발생']]]]);

D.boundary=()=>lanes([['01 · 제품 서비스','정책·원장의 변경 규칙'],['02 · 서비스 간 계약','인증 HTTP · 전달 책임'],['03 · AI 실행 서비스','생성 lifecycle·평가 이력']])+
 box(0,115,'제품 정책 판단','제품이 소유하는 요청·원장')+box(0,285,'제품 DB에 상태 저장','원장 변경 + 전달 기록')+down(0,191,283)+
 box(1,115,'인증된 생성 요청','공개 가능한 서비스 계약')+box(1,285,'원장 변경의 별도 전달','Outbox · retry · version fence')+
 box(2,115,'생성 실행·상태 전이','독립 FastAPI application')+box(2,285,'AI DB에 실행 이력 저장','생성 상태·평가·복제 데이터')+down(2,191,283)+across(0,1,153)+across(1,2,153)+across(0,1,323)+across(1,2,323)+
 rules('분리한 뒤에도 유지하는 조건',[['원장의 소유권','서비스별로 책임을 나눈다',[['제품','정책·원장 상태 소유'],['AI','실행·평가 상태 소유']]],['실패·전달 경계','저장과 네트워크 전달을 분리',[['저장','원장·Outbox 함께 확정'],['전달','재시도·버전 판정 적용']]],['구현·검증 범위','독립 application·DB를 운영',[['환경','STG·Prod 운영'],['데이터','이관 검증은 STG 범위']]]]);

D.transaction=()=>lanes([['01 · Service의 정책','기능 구현에서 세션 수명 분리'],['02 · 현재 task의 세션','ContextVar · SessionProxy'],['03 · Repository / DB','SQL 실행과 트랜잭션 종료']])+
 box(0,115,'Service 호출','트랜잭션 propagation 선언')+box(0,285,'호출 task 소유권 확인','다른 task의 session 접근 차단','dgate')+
 box(1,115,'AsyncSession · 상태 bind','현재 실행 맥락에 연결')+box(1,285,'현재 세션 resolve','매 계층에 session 인자 전달하지 않음')+down(1,191,283)+
 box(2,115,'Repository가 SQL 실행','Service의 트랜잭션에 참여')+box(2,285,'정책에 따라 종료·정리','commit / rollback · session 반환','dgate')+down(2,191,283)+across(0,1,153)+DL('M518 323H414')+DL('M230 361V409H935V153H986','소유 task만 SQL 접근',690,397)+
 rules('propagation마다 달라지는 경계',[['REQUIRED','기존 transaction이 있는 호출',[['참여','현재 transaction 사용'],['책임','같은 작업 경계 유지']]],['REQUIRES_NEW','독립적인 새 transaction',[['생성','새 connection·session'],['판단','추가 connection 비용']]],['NESTED / 취소','중첩과 실행 취소를 별도로 검증',[['중첩','SAVEPOINT 사용'],['취소','rollback·자원 정리']]]]);

D.concurrency=()=>DG(20,20,1360,425,'동일 version을 읽은 두 worker의 경합','설명용 A/B 실행 순서 · 운영 경합 건수를 뜻하지 않음')+
 DB(55,130,255,'Worker A','version v 읽기')+DB(55,300,255,'Worker B','같은 version v 읽기')+
 DB(420,130,320,'전이 합법성 판정','entity의 상태·명령 규칙','dgate')+DB(420,300,320,'같은 도메인 판정','멱등 replay에도 재사용','dgate')+
 DB(900,130,390,'A의 version CAS 성공','기대 version이 일치한 row 변경')+DB(900,300,390,'B의 version CAS 불일치','row 변경 수로 경합 판별','drisk')+
 DL('M310 168H418')+DL('M310 338H418')+DL('M740 168H898')+DL('M740 338H898')+DL('M1095 206V298','A가 먼저 반영됨',1200,258)+
 rules('하나의 조건문으로 섞지 않은 책임',[['도메인 판정','어떤 변경이 합법적인가',[['소유','생성 entity'],['공유','실제 전이·멱등 replay']]],['동시성 중재','어떤 변경이 먼저 저장됐는가',[['방식','기대 version으로 CAS'],['결과','영향받은 row로 판별']]],['검증 범위','이 사례는 생성 aggregate에 한정',[['보호','뒤늦은 변경 덮기 방지'],['구분','합법성 ≠ 경합 승리']]]]);

D.quota=()=>lanes([['01 · 생성 요청의 입장 판단','완료된 사용량만 보지 않음'],['02 · 예약과 실행','PENDING / RUNNING'],['03 · 종료 상태 반영','사용 확정 또는 예약 해제']])+
 box(0,112,'확정 사용량 + 진행 중 예약','남은 생성 한도와 대조','dgate')+box(0,286,'한도에 맞는 요청만 수락','동시 요청도 예약을 계산에 포함')+
 box(1,112,'생성 요청을 예약','실행 전에 quota를 잡음')+box(1,286,'AI 생성 실행','예약을 진행 상태로 관리')+down(1,188,284)+
 box(2,112,'종료 상태 판정','성공·취소·실패를 구분','dgate')+box(2,286,'예약을 확정·해제','확정 사용량과 예약 분리')+down(2,188,284)+down(0,188,284)+across(0,1,150)+DL('M882 324H930V150H988')+
 rules('종료 결과에 따른 사용량 규칙',[['성공','정상 생성 결과가 완료됨',[['예약','진행 중 예약 종료'],['사용량','확정 사용으로 반영']]],['시작 후 취소','실행이 시작된 뒤 취소됨',[['기준','단순 실패와 구분'],['사용량','확정 사용으로 반영']]],['실패','생성 실패로 종료됨',[['예약','해제'],['보호','실패 예약을 남기지 않음']]]]);

D.worker=()=>lanes([['01 · 주문 API','주문 생성과 알림 완료는 별개'],['02 · 비동기 알림 Worker','외부 발송 결과를 작업별 기록'],['03 · 결과와 주문 상태','전체 성공·최종 실패 구분']])+
 box(0,112,'주문 생성·저장','업무 상태를 먼저 관리')+box(0,286,'알림 작업을 큐로 전달','API 응답과 실행 책임 분리')+down(0,188,284)+
 box(1,112,'큐 작업 실행','외부 알림 발송')+box(1,286,'공급사별 발송 결과 기록','실패 시 재시도 여부 판정')+down(1,188,284)+
 box(2,112,'발송 결과 집계','모든 대상의 성공 여부 확인','dgate')+box(2,286,'주문 상태에 반영','전체 성공 시 다음 상태')+down(2,188,284)+DL('M412 324H457V150H518')+DL('M882 324H930V150H988')+
 rules('실패를 운영 가능한 상태로 남기기',[['재시도할 수 있는 실패','API 요청과 분리된 실행 경계',[['자동 처리','정해진 규칙으로 retry'],['기록','발송 결과·실패 상태']]],['재시도 후 최종 실패','실패를 성공 상태로 넘기지 않음',[['주문','실패 상태 반영'],['운영','실패 이력 확인']]],['수동 재발송','운영자의 후속 처리 경로',[['확인','재발송 조건 검토'],['실행','발송 결과와 상태 연결']]]]);

D.payment=()=>lanes([['01 · 결제 승인','manual-capture 선결제'],['02 · 로컬 예약 트랜잭션','DB 변경의 성공·실패'],['03 · 외부 결제 처리','DB 트랜잭션과 다른 경계']])+
 box(0,112,'결제 승인 상태 확인','예약 전에 결제 상태 검증','dgate')+box(0,286,'로컬 거래 ID 연결','결제 이력·provider metadata')+
 box(1,112,'예약 처리','로컬 데이터 변경')+box(1,286,'DB 트랜잭션 확정','외부 capture 이전에 확정')+down(1,188,284)+
 box(2,112,'결제 capture','로컬 DB 확정 이후 실행')+box(2,286,'외부 상태에 맞는 보상','예약 실패 시 cancel / refund','dgate')+across(0,1,150)+DL('M882 324H930V150H988')+down(0,188,284)+
 rules('예약 처리 실패 시의 보상 분기',[['미매입 상태','승인됐지만 capture 전',[['상태','매입 대기'],['보상','승인 취소 · cancel']]],['매입 완료 상태','결제 금액이 capture된 상태',[['상태','결제 성공'],['보상','환불 · refund']]],['서로 다른 원자성 경계','DB rollback이 외부 결제를 취소하지 않음',[['DB','로컬 transaction'],['외부','상태 기반 보상 요청']]]]);

D.speech=()=>DG(20,20,870,425,'중첩 세션과 시간축','외부 모델의 발화 중간 중단을 우회한 과거 처리 방식')+DG(920,20,460,425,'전사 병합','세션별 버퍼를 분리')+
 DL('M130 110H850','시간',800,94)+['세션 A','세션 B','세션 C'].map((s,i)=>DT(88,172+i*88,s,'dsub')+`<rect x="${145+i*155}" y="${145+i*88}" width="320" height="43" rx="6" fill="${['#b8cddd','#92b1cb','#668eaf'][i]}"/>`).join('')+
 DB(955,120,390,'세션별 전사 버퍼','부분 실패·출력 순서 분리')+DB(955,280,390,'시간 offset + 순서 병합','버퍼에서 전사를 정렬해 연결')+DL('M1150 196V278')+
 '<path d="M465 166H868M620 254H868M775 342H868M868 166V342" fill="none" stroke="#6c8ba6" stroke-width="1.8"/>'+DL('M868 166H953')+DT(520,407,'겹치는 구간으로 세션 종료 경계를 연결','dsub')+
 rules('우회책으로 얻은 것과 비용',[['연속성 확보','하나의 외부 세션에만 의존하지 않음',[['방식','세션 구간을 중첩'],['병합','각 버퍼의 순서 보존']]],['trade-off','문제를 우회하는 데 드는 비용',[['비용','동시 세션 비용 증가'],['지연','실시간성 손실 기록']]],['우회책 제거','모델 교체로 중단 원인이 해소됨',[['판단','우회책을 영구화하지 않음'],['정리','레거시 provider 제거']]]]);

D.sequence=()=>DG(20,20,1360,425,'전사 이벤트의 도착 순서와 발화 소유권','A/B는 설명용 발화 식별자 · 텍스트가 같아도 서로 다른 발화')+
 [160,690,1200].map((x,i)=>DT(x,100,['전사 이벤트','sequence 기반 Map','상담 화면'][i],'dtitle')+`<path d="M${x} 117V421" stroke="#c0ceda" stroke-dasharray="5 5"/>`).join('')+
 [[170,'A · 부분 전사','A 초안 표시'],[240,'A · 완료','A 확정'],[310,'B · 새 발화','B 추가 · A 유지'],[380,'A · 늦은 보정','A만 교체 · B 유지']].map(([y,a,b])=>DL(`M160 ${y}H690`,a,420,y-15)+DL(`M690 ${y}H1200`,b,945,y-15)).join('')+
 rules('화면이 유지해야 하는 조건',[['부분 전사와 완료','같은 발화에 이벤트를 연결',[['부분','조기 keyword 판단'],['완료','문맥 판단·저장']]],['늦게 도착한 보정','새 발화가 시작된 뒤의 보정',[['식별','발화 sequence 사용'],['변경','해당 Map 항목만 교체']]],['반복된 동일 문장','내용으로 이전 발화를 찾지 않음',[['기준','문자열 일치가 아님'],['보호','다른 turn을 덮지 않음']]]]);

D.migration=()=>lanes([['01 · STG 이관 리허설','생성 이력·품질·trace 데이터'],['02 · 데이터 정합성','원본과 이관 결과 대조'],['03 · 실제 생성 검증','배포 성공과 기능 동작 구분']])+
 box(0,112,'STG 데이터로 리허설','실제 관계와 데이터 형태 확인')+box(0,286,'부모 → 자식 순서 복사','FK 의존성을 고려한 이관')+down(0,188,284)+
 box(1,112,'건수 · fingerprint 비교','원본과 대상 데이터 대조','dgate')+box(1,286,'FK orphan 검사','참조가 끊어진 데이터 확인','dgate')+down(1,188,284)+
 box(2,112,'배포·health 확인','실행 환경의 정상 여부')+box(2,286,'생성 API E2E 실행','실제 사용자 기능까지 확인','dgate')+down(2,188,284)+DL('M412 324H456V150H518')+DL('M882 324H930V150H988')+
 rules('검증 결과를 서로 대신하지 않기',[['복사 결과','데이터가 도착한 사실',[['건수','대상 누락 여부'],['내용','fingerprint 일치']]],['관계 정합성','부모·자식 데이터의 연결',[['확인','FK orphan 검사'],['범위','STG 이관 검증']]],['제품 기능','배포 성공만으로 완료하지 않음',[['실행','실제 생성 API 호출'],['판단','사용자 흐름 검증']]]]);
