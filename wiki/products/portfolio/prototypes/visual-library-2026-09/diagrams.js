/* Review expressions only. Claim ownership and maturity: README.md. */
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const txt=(x,y,s,cls='',anchor='middle')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(s)}</text>`;
const group=(x,y,w,h,s)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" class="boundary"/>${txt(x+20,y+28,s,'group-title','start')}`;
const line=(path,label='',x=0,y=0,risk=false)=>`<path d="${path}" class="edge ${risk?'risk-edge':''}"/>${label?txt(x,y,label,'edge-label'):''}`;
const node=(x,y,name,sub='',type='server')=>{
 let shape='';const color=type==='human'?'#668981':type==='gate'?'#b48041':'#4b7da7';
 if(type==='db')shape=`<path d="M-38-23V24C-38 45 38 45 38 24V-23" fill="#d9e7f1" stroke="${color}" stroke-width="2"/><ellipse cy="-23" rx="38" ry="13" fill="#a7c9e1" stroke="${color}" stroke-width="2"/><path d="M-38 0C-38 19 38 19 38 0M-38 20C-38 39 38 39 38 20" fill="none" stroke="${color}" stroke-width="2"/>`;
 else if(type==='gate')shape=`<path d="M0-42L45 0 0 42-45 0Z" fill="#fbf1e2" stroke="${color}" stroke-width="2"/><path d="M-15 0L-3 12 18-13" fill="none" stroke="${color}" stroke-width="3"/>`;
 else if(type==='human')shape=`<circle cy="-19" r="18" fill="#9ebeb4"/><path d="M-34 36V18Q-34-1 0-1T34 18V36Z" fill="${color}"/>`;
 else if(type==='doc')shape=`<path d="M-29-39H12L31-20V39H-29Z" fill="#e7eff6" stroke="${color}" stroke-width="2"/><path d="M12-39V-20H31M-15-9H15M-15 5H15M-15 19H8" fill="none" stroke="${color}" stroke-width="3"/>`;
 else if(type==='queue')shape=`<rect x="-42" y="-32" width="84" height="64" rx="7" fill="#e5edf5" stroke="${color}" stroke-width="2"/><path d="M-22-17V17M0-17V17M22-17V17" stroke="${color}" stroke-width="9"/>`;
 else shape=`<rect x="-34" y="-40" width="68" height="80" rx="8" fill="${color}"/><rect x="-23" y="-27" width="46" height="12" rx="3" fill="white"/><rect x="-23" y="-6" width="46" height="12" rx="3" fill="white"/><circle cx="-18" cy="24" r="4" fill="white"/><path d="M-5 24H23" stroke="white" stroke-width="3"/>`;
 return `<g transform="translate(${x} ${y})">${shape}</g>${txt(x,y+72,name,'label')}${sub?txt(x,y+96,sub,'sub'):''}`;
};
const flow=(items,y=200)=>items.map((a,i)=>node(140+i*300,y,...a)+(i<items.length-1?line(`M${190+i*300} ${y}H${390+i*300}`):'')).join('');
const note=(s,y=493)=>txt(600,y,s,'note');
const cases=[];
function add(id,category,title,summary,scope,takeaway,draw){cases.push({id,category,title,summary,scope,takeaway,draw});}

add('product','01 / 제품화','반복 업무를 유료 AI 제품으로','참고 자료 정리부터 초안·검수·예약·발행까지 반복하던 고객 업무를 하나의 제품 흐름으로 연결했습니다. 초기 시제품 이후 백엔드·AI와 핵심 화면을 구현하고, 기획·QA·마케팅과 제품화를 주도해 팀과 월 구독료 매출 1천만 원 수준의 서비스를 운영했습니다.','제품화 주도 · 백엔드·AI 직접 구현 · 핵심 화면은 coding agent 활용','제품·팀 성과: 2026년 8월 월 구독료 매출 1천만 원 수준',()=>
 group(45,65,560,260,'AI가 맡는 제작 보조')+group(635,65,520,260,'사용자가 소유하는 최종 결정')+
 node(160,160,'자료 정리','참고 자료·소재','doc')+node(455,160,'초안·1차 검수','AI 생성·평가')+node(765,160,'수정·승인','사람의 판단','human')+node(1030,160,'예약·발행','제품 사용 흐름','doc')+
 line('M210 160H405')+line('M505 160H715')+line('M815 160H980')+
 txt(200,410,'0 → 1','large')+txt(200,447,'초기 시제품 이후 제품화','sub')+txt(650,410,'월 1천만 원 수준','large')+txt(650,447,'구독료 매출 · 2026.08 · 팀 성과','sub')+note('기획·QA·마케팅과 제품화·운영을 연결',515));

add('boundary','02 / 백엔드','제품 원장과 AI 실행의 소유권 분리','제품의 정책·원장과 AI 생성의 실행 상태는 서로 다른 변경 규칙을 가져야 했습니다. 제품 백엔드는 정책과 원장을, 독립 FastAPI 애플리케이션·DB는 생성 lifecycle과 평가 이력을 소유하도록 나누고 인증 HTTP 계약으로 연결했습니다.','직접 설계·구현 · STG·Prod 운영','서비스를 나누는 기준은 프레임워크가 아니라 변경과 상태의 소유권',()=>
 group(80,55,420,425,'제품 서비스')+group(700,55,420,425,'AI 서비스')+
 node(290,170,'Product API','정책·요청 검증')+node(290,370,'Product DB','제품 원장','db')+node(910,170,'AI Application','생성 lifecycle')+node(910,370,'AI DB','실행·평가 이력','db')+
 line('M340 170H860','인증 HTTP',600,151)+line('M290 277V324','읽기·쓰기',350,307)+line('M910 277V324','읽기·쓰기',970,307));

add('outbox','02 / 백엔드','원장 변경과 전달 책임의 분리','원장이 바뀐 뒤 전달 작업이 중단되거나, 지연된 요청이 최신 상태를 덮는 상황을 고려했습니다. 원장 변경과 Outbox 기록을 같은 트랜잭션에 묶고, 전달에는 lease 기반 재점유·시도 식별·버전 검증을 적용해 중복과 역순 도착을 통제했습니다.','직접 설계·구현','중복과 역순 전달이 최신 상태를 덮어쓰지 않도록 통제',()=>
 group(35,60,385,235,'동일 DB 트랜잭션')+node(130,155,'원장 변경','','db')+node(325,155,'Outbox 기록','','db')+line('M177 155H275')+
 node(620,155,'전달 작업','재점유 · 시도 식별')+node(1030,155,'수신 서비스','오래된 버전 미적용')+line('M375 155H570','commit 이후',470,136)+line('M670 155H980','상태 전달',825,136)+
 line('M620 262V353H340','실패',494,334,true)+node(290,353,'재시도','중단 작업 다시 점유','queue')+
 line('M620 353H875','상한 초과',740,334,true)+node(925,353,'최종 실패 보존','운영자 확인','doc')+note('오래된 delivery version은 적용하지 않고, 종료된 attempt가 결과를 덮지 않음',516));

add('transaction','02 / 백엔드','트랜잭션 정책과 세션 수명 분리','기능마다 세션을 전달·정리하는 방식 대신 Service가 트랜잭션 정책을 선언하도록 공통 경계를 만들었습니다. ContextVar와 SessionProxy로 현재 AsyncSession을 해석하고, task 소유권 검사와 취소 시 rollback·connection 반환을 integration test로 검증했습니다.','조직 공통 템플릿 직접 설계·구축','동일 AsyncSession의 child-task 접근은 차단하고 취소·정리 경계를 검증',()=>
 group(325,65,850,265,'현재 task가 소유하는 transaction · session')+flow([['Router','입력·응답'],['Service','트랜잭션 정책'],['Repository','현재 session resolve'],['Database','commit / rollback','db']],165)+
 txt(195,410,'REQUIRED','label')+txt(195,445,'기존 트랜잭션 참여','sub')+txt(600,410,'REQUIRES_NEW','label')+txt(600,445,'새 connection·session','sub')+txt(1000,410,'NESTED','label')+txt(1000,445,'SAVEPOINT','sub')+note('ContextVar + SessionProxy · owner-task guard · 취소 rollback · connection cleanup',515));

add('concurrency','02 / 백엔드','상태 전이와 동시성 중재 분리','여러 worker가 같은 생성 원장을 갱신할 때, 허용되는 상태 전이와 먼저 반영될 변경은 다른 문제였습니다. 전이 규칙은 entity에 두고 version CAS의 영향받은 row 수로 경합을 판별했으며, 멱등 replay에도 같은 도메인 판정을 재사용했습니다.','생성 원장 영역 직접 설계·구현','멱등 replay와 실제 전이가 같은 도메인 판정을 재사용',()=>
 node(150,130,'Worker A','version v 읽기')+node(150,355,'Worker B','version v 읽기')+group(410,55,360,430,'생성 aggregate')+node(590,205,'전이 규칙','합법적 상태 변경만 허용','gate')+node(1040,205,'Version CAS','기대 version으로 UPDATE','db')+
 line('M200 130H345V205H540')+line('M200 355H345V205')+line('M640 205H990')+txt(1040,390,'저장 성공 / 경합 구분','label')+txt(1040,425,'영향받은 row 수로 판별','sub')+line('M1040 312V354')+note('도메인 불변조건과 DB 경합 처리를 하나의 거대한 조건문으로 섞지 않음',520));

add('quota','02 / 백엔드','예약 기반 생성 사용량 통제','완료된 사용량만 보면 동시에 들어온 생성 요청이 남은 한도를 중복으로 사용할 수 있습니다. 예약 시점부터 확정 사용량과 진행 중 예약을 함께 계산하고, 성공·시작 후 취소는 사용량으로 확정하되 실패는 예약을 해제하도록 구현했습니다.','생성 quota 영역 직접 구현','동시 요청의 초과 실행을 예약 시점에서 통제',()=>
 flow([['생성 요청','동시 요청'],['Admission','확정 사용 + 진행 예약','gate'],['생성 예약','PENDING / RUNNING','db'],['AI 실행','예약 이후 실행']],150)+
 line('M1040 257V330H700V360H650','확정 대상',860,311)+node(600,360,'사용량 확정','성공·시작 후 취소','db')+line('M1040 330V420H890','실패',1030,405,true)+node(840,420,'예약 해제','','doc'));

add('worker','02 / 백엔드','비동기 알림과 주문 상태의 일치','주문 생성 이후 외부 알림은 실패할 수 있으므로 API 응답과 알림 완료를 분리했습니다. 공급사별 발송 결과를 기록하고 전체 성공일 때 주문을 다음 상태로 진행시키며, 실패는 자동 재시도·최종 실패 기록·수동 재발송으로 이어지도록 구성했습니다.','주문·재고 backend 및 worker 구축 주도','API 응답 완료와 외부 알림 완료를 같은 성공으로 취급하지 않음',()=>
 flow([['주문 API','주문 저장'],['작업 큐','알림 작업 전달','queue'],['알림 Worker','공급사별 결과 기록'],['결과 집계','모든 발송 성공 시 진행','gate']],150)+
 node(420,390,'재시도·재발송','최종 실패 기록','doc')+node(1040,390,'다음 주문 상태','전체 성공 시 진행','db')+line('M1040 257V344','성공',1090,319)+line('M1010 180H900V325H420V344','실패 → retry / 최종 실패',650,306,true));

add('payment','02 / 백엔드','외부 결제 실패의 보상 경계','로컬 예약 처리의 rollback만으로 외부 결제까지 되돌릴 수는 없었습니다. manual-capture 선결제를 구축하면서 로컬 거래 ID로 결제 이력을 연결하고, 예약 처리 실패 시 미매입 상태는 승인 취소, 매입 완료 상태는 환불로 보상하도록 구현했습니다.','manual-capture 선결제 구축 주도','DB rollback과 외부 결제 보상은 서로 다른 경계',()=>
 group(35,65,1130,235,'정상 처리 흐름')+flow([['결제 승인','manual capture'],['예약 처리','로컬 transaction'],['결제 확정','provider capture'],['결제 이력','transaction ID 연결','db']],155)+
 node(430,410,'예약 처리 실패','','gate')+node(785,385,'승인 취소','미매입 상태','doc')+node(1060,385,'환불','매입 완료 상태','doc')+line('M440 262V310H430V363', '',0,0,true)+line('M480 410H630V385H735','상태 확인',575,390,true)+line('M630 410V310H1060V339','매입 완료',950,291,true));

add('speech','03 / 실시간 AI','겹치는 세션으로 전사 중단 우회','외부 음성 모델의 세션이 발화 중간에 끊겨 전사가 멈추는 문제를 우회해야 했습니다. 실행 구간이 겹치는 세션과 세션별 버퍼로 순서를 보존하되, 동시 세션 비용과 실시간성 손실을 기록하고 모델 교체로 원인이 해소된 뒤 우회 코드를 제거했습니다.','실시간 backend 공동 주 기여 · 중첩 세션 우회 구현 주도','비용·실시간성 trade-off를 기록하고 모델 교체 후 우회책 제거',()=>
 txt(100,93,'시간','sub')+line('M160 90H1110')+
 ['세션 A','세션 B','세션 C'].map((s,i)=>txt(95,163+i*83,s,'label')+`<rect x="${175+i*235}" y="${130+i*83}" width="390" height="48" rx="6" fill="${['#aec7dd','#7ea7ca','#4d81ae'][i]}"/>`).join('')+
 node(325,414,'세션별 버퍼','부분 실패 격리','queue')+node(850,414,'순서 병합','시간 offset · sequence','doc')+line('M375 414H800','정렬 후 병합',590,395));

add('sequence','03 / 실시간 AI','늦은 전사 보정의 덮어쓰기 방지','전사 완료 뒤 보정 결과가 늦게 도착하면 이미 시작된 다음 발화를 덮을 수 있었습니다. 부분 전사·완료·보정에 같은 sequence를 연결하고, 화면의 sequence 기반 Map에서 해당 발화만 교체해 반복된 문장도 서로 구분했습니다.','실시간 전사 흐름 공동 주 기여','같은 문장이 반복돼도 텍스트 매칭이 아니라 발화 식별자로 반영',()=>
 [180,600,1030].map((x,i)=>txt(x,70,['전사 이벤트','sequence 기준 저장','상담 화면'][i],'label')+`<path d="M${x} 92V477" stroke="#ccd6e0" stroke-dasharray="5 5"/>`).join('')+
 line('M180 155H600','부분 전사 · 발화 A',390,136)+line('M600 155H1030','A 초안',815,136)+
 line('M180 250H600','완료 · 발화 A',390,231)+line('M600 250H1030','A 확정',815,231)+
 line('M180 345H600','새 발화 B',390,326)+line('M600 345H1030','B 추가',815,326)+
 line('M180 440H600','늦은 보정 · 발화 A',390,421)+line('M600 440H1030','A만 교체 · B 유지',815,421)+note('이벤트 도착 순서와 발화의 소유 순서를 분리',526));

add('migration','02 / 백엔드','데이터 이관과 기능 검증의 분리','배포 workflow와 health check가 성공해도 실제 생성 API는 실패할 수 있었습니다. AI DB 분리 시 STG 데이터로 이관을 리허설하고 건수·fingerprint·FK orphan을 대조한 뒤, 배포 후 실제 생성 흐름을 실행하는 E2E 검증을 추가했습니다.','STG 데이터 이관·rehearsal 직접 수행','행 수·fingerprint·FK 검사만으로 사용자 기능의 성공을 대신하지 않음',()=>
 flow([['이관 전 데이터','원본 기준','db'],['Rehearsal','부모 → 자식 순서'],['정합성 검증','건수 · hash · orphan','gate'],['생성 API E2E','사용자 기능 확인','gate']],190)+
 group(90,365,1020,115,'검증 경계')+txt(600,437,'데이터 일치  ≠  배포 성공  ≠  실제 생성 성공','label'));

add('tenant','02 / 백엔드','서버가 소유하는 작업 지점','운영자의 소속 지점과 현재 작업 지점을 구분하고, 클라이언트 입력이 데이터 접근 범위를 결정하지 않도록 했습니다. Admin의 작업 지점을 서버 인증 상태에 두고 권한 검증 전용 API로만 전환하며, 미선택과 권한 밖 접근을 구분해 차단하도록 구현 중입니다.','Admin 접근 경계 설계·구현 주도 · 진행 중','클라이언트의 지점 입력을 곧바로 데이터 접근 권한으로 사용하지 않음',()=>
 node(145,170,'운영자','지점 전환 요청','human')+node(465,170,'권한 검증','선택·소속 확인','gate')+node(800,170,'인증 상태','현재 작업 지점','db')+line('M195 170H415')+line('M515 170H750')+
 group(630,325,510,195,'서버가 결정한 데이터 접근 범위')+node(890,400,'Admin API','기존 Homepage 계약은 유지')+line('M800 277V303H890V353')+txt(250,400,'미선택 / 권한 밖 접근','label')+txt(250,432,'서로 다른 오류로 차단','sub')+line('M465 277V323H250V360','거절',350,303,true));

add('generation','03 / AI 제품','생성 그래프의 실행 경계 단순화','생성 흐름을 단순화하면서도 기존 검증·보정 코드와 실행 추적은 유지할 필요가 있었습니다. LangGraph의 기존 그래프를 단일 파이프라인으로 축소하고, 같은 guard·repair를 사용하는 단일 agent 엔진을 병존시켜 실제 생성 경로의 실행 시간을 비교했습니다.','생성 그래프 직접 구현·운영 · 대체 엔진 실측 비교','치환이 실제로 필요한 provider·tool 경계에만 port를 배치',()=>
 group(60,65,1080,250,'공통 생성 계약')+flow([['입력 Guard','소재·형식 확인','gate'],['생성 엔진','그래프 / 단일 agent'],['출력 검증','공통 guard · repair','gate'],['생성 결과','평가 이력 저장','doc']],160)+
 group(310,365,580,123,'엔진 비교')+txt(600,425,'검증·보정은 공유하고 실행 엔진만 비교','label')+txt(600,457,'실제 생성 경로의 실행 시간 측정','sub'));

add('labeling','03 / AI 제품','재적재에도 보존되는 사람 평가','평가할 원문을 다시 가져오더라도 이미 쌓인 사람의 점수·사유는 남아 있어야 했습니다. 독립 labeling schema에 typed batch 검증과 source key 기반 upsert를 구현하고, 원문·이어쓰기만 갱신하면서 사람 평가를 보존하는 규칙을 반복·증분 적재로 확인했습니다.','독립 labeling schema·API·관리 화면 직접 구축 · 로컬 반복 적재 검증','원문은 갱신하고 사람의 점수·사유는 보존',()=>
 node(130,180,'원문 Batch','typed validation','doc')+node(435,180,'멱등 Importer','source key 기준 upsert')+line('M180 180H385')+group(670,55,475,440,'제품 데이터와 분리한 labeling schema')+
 node(820,180,'원문 데이터','이어쓰기 교체','db')+node(1000,385,'사람 평가','점수·사유 보존','db')+line('M485 180H770','원문 갱신',625,161)+
 node(420,385,'평가자 화면','진행률·미평가 글','human')+line('M470 385H950','평가 기록',690,366)+note('LLM 점수·통과 여부·개선안은 사람 평가와 별도 이력으로 관리',531));

add('quality','04 / 보조 사례','자동 검증과 사람 판단의 분리','형식 검사를 통과하거나 LLM 점수가 높다는 것만으로 콘텐츠 품질을 확정하지 않았습니다. 자동 게이트·실측 분포 대조·사람 판단을 분리하고, 자사 출력이 다시 품질 기준의 근거가 되던 순환을 재실측으로 발견해 기준을 재수립했습니다.','품질 기준 설계·실험 직접 수행 · 제품화의 보조 성과','자가 출력이 기준으로 되먹임되는 순환을 재실측으로 교정',()=>
 [85,230,375].map((y,i)=>`<rect x="190" y="${y}" width="820" height="105" rx="10" fill="${['#f2f6fa','#e5eef6','#d5e4ef'][i]}"/>`+txt(230,y+40,['01','02','03'][i],'group-title','start')+txt(600,y+42,['자동 게이트','실측 분포 대조','사람 판정'][i],'label')+txt(600,y+76,['결정적으로 확인할 수 있는 형식 오류','관측 데이터와 규칙의 근거 비교','맥락·설득력·콘텐츠 가치'][i],'sub')).join(''));

add('rebuild','01 / 제품화','제품 흐름을 유지한 백엔드 재구축','초기 시제품을 계속 확장할지, 운영 가능한 백엔드를 별도로 구축할지 판단해야 했습니다. 기존 화면은 유지한 채 FastAPI 백엔드를 병렬로 재구축하고, 계층·트랜잭션 기준 수립부터 기능 분석·구현·연동 검증·전환까지 주도했습니다.','재구축 판단·backend 구현·전환 실행 주도','기능 구현뿐 아니라 구조 기준·검증·전환 판단까지 연결',()=>
 group(50,60,1100,190,'사용자 접점 유지')+node(600,140,'기존 제품 화면','핵심 사용자 흐름')+
 node(225,365,'초기 Backend','기존 동작 확인')+node(600,365,'새 Backend','계층·트랜잭션 기준')+node(990,365,'기능 전환','연동·검증 후 cutover','gate')+
 line('M275 365H550','기능 분석',412,346)+line('M650 365H940','구현·검증',795,346)+line('M990 318V140H650','연결 전환',980,121)+line('M550 140H225V318'));

add('template','01 / 제품화','다른 직군도 구현할 수 있는 개발 기본값','백엔드 경험이 적은 담당자가 coding agent로 기능을 만들 때도 세션 관리와 계층 규칙을 매번 다시 결정하지 않도록 했습니다. 트랜잭션·API 계약·책임별 구조를 템플릿의 기본값으로 제공하고, 각 담당자의 구현에 피드백과 배포를 지원했습니다.','공통 backend template 직접 구축 · 구현 피드백·배포 지원','기능 담당자는 제품 로직에 집중하고 공통 세션 수명은 템플릿이 관리',()=>
 node(145,170,'기능 담당자','기획·QA·디자인','human')+group(335,60,510,250,'공통 backend template')+node(470,170,'개발 규칙','계층·API 계약','doc')+node(730,170,'실행 기본값','transaction·session')+node(1055,170,'제품 기능','coding agent로 구현')+
 line('M195 170H420')+line('M520 170H680')+line('M780 170H1005')+node(600,410,'엔지니어 검토','피드백·배포 지원','human')+line('M1055 277V410H650')+line('M550 410H145V277'));

add('rag','03 / AI 제품','판정과 문장화를 분리한 검색 API','검색한 문헌의 문장화와 안전·추천 판정이 LLM 안에서 섞이지 않도록 역할을 나눴습니다. 질의를 엔티티로 확정한 뒤 구조화 규칙으로 판단하고 문헌 검색으로 근거를 보강하며, 출처 ID·revision을 포함한 Context Pack을 생성의 입력으로 제공하도록 구현 중입니다.','설계·구현 진행 중 · 생성형 answer adapter는 임상 검수 대기','vector-first가 아니라 평가에서 검색 부족이 확인될 때 embedding 추가',()=>
 flow([['자연어 질의','code · alias 확정','doc'],['구조화 조회','엔티티·규칙 판정','db'],['문헌 검색','lexical rank','doc'],['Context Pack','출처 ID · revision','doc']],150)+
 node(1040,395,'LLM 문장화','판정 권한 없음')+line('M1040 257V349')+group(95,360,620,115,'설계 판단')+txt(405,427,'안전·추천 판정은 구조화 규칙이 소유','label'));

add('publication','02 / 백엔드','공개 승격을 통제하는 지식 데이터','기존 API 계약을 유지하면서 JSON 지식을 관계형 기준 데이터로 옮기고, 적재와 공개를 구분해야 했습니다. 계약 동결 테스트와 결정적 importer를 구현하고, 검수 중 draft가 release 단위 publication gate를 거쳐 공개되도록 전환을 진행하고 있습니다.','설계·구현 진행 중 · 전환 완료 전','데이터 적재 완료와 공개 가능한 release를 구분',()=>
 flow([['기존 JSON','계약 동결 테스트','doc'],['결정적 Importer','반복 실행 정합성'],['Canonical DB','규칙·문서·release','db']],150)+node(1040,150,'Published','승인된 release','doc')+
 node(740,395,'Draft','검수 중','doc')+node(1040,395,'Publication Gate','검수·공개 판정','gate')+line('M740 257V349')+line('M790 395H990','승격 요청',890,376)+line('M1040 349V260','검수 승인',1100,309));

add('agent','05 / 실험·설계','대화 요청과 운영 명령의 실행 경계','화면별 편집·관리 기능을 대화로 제어하되, 자연어 계획이 곧바로 운영 상태를 바꾸지 않도록 했습니다. typed plan과 등록 capability를 실행하는 planner-executor를 구현하고, 상태 변경 명령에는 명시적 확인과 멱등 gateway 경계를 두어 Mock에서 검증했습니다.','독립 prototype 직접 설계·구현 · 운영 명령은 Mock 검증','대화 실행 기록과 결과 artifact를 분리해 맥락과 산출물을 복원',()=>
 flow([['사용자 요청','자연어','human'],['Typed Plan','등록 capability 선택','doc'],['Executor','편집 작업 실행'],['결과 Artifact','version 관리','doc']],150)+
 node(440,405,'명시적 확인','운영 명령 승인','gate')+node(810,405,'Mock Gateway','멱등 실행 경계')+line('M440 257V355','상태 변경 요청',525,323)+line('M490 405H760','승인',625,386)+note('실제 계정의 예약·발행·삭제가 아닌, prototype의 command 경계 검증',528));

add('kubernetes','05 / 개인 구축','로컬 Kubernetes의 요청·저장 경로','클러스터 설치 여부보다 호스트 요청이 애플리케이션과 저장소까지 도달하는지를 확인했습니다. 개인 Mac에 Lima·kubeadm 클러스터를 재구축해 ingress·service·pod·PVC 경로와 LoadBalancer IP 할당을 검증하고, VM 통신을 막던 네트워크 선택을 조정했습니다.','개인 구축 · 회사 production 운영 사례와 분리','Lima 네트워크 제약을 진단하고 VM 통신·호스트 접근 경로 조정',()=>
 group(300,40,865,465,'개인 Mac / Lima + kubeadm 클러스터 · 3 nodes')+
 node(125,165,'Client','호스트 접근','human')+node(435,165,'Ingress','ingress-nginx')+node(735,165,'Service','요청 라우팅')+node(1040,165,'Pod','애플리케이션')+line('M175 165H385')+line('M485 165H685')+line('M785 165H990')+
 node(1040,385,'PVC','local-path','db')+line('M1040 272V339')+node(435,385,'GitOps','Helm · ArgoCD')+line('M485 385H855V295H1140V165H1090','선언적 배포',672,366).replace('class="edge ','stroke-dasharray="6 5" class="edge ')+txt(725,456,'Calico · MetalLB','sub'));

add('infrastructure','06 / 인프라','제품 서비스의 배포·데이터 구성','제품 API와 AI 실행부를 각각의 App Service·PostgreSQL 소유 경계로 묶고 운영했습니다. 컨테이너 이미지는 공용 Registry로 전달하고 환경별 로그는 Monitor·Log Analytics에서 확인하도록, 서비스 배포와 기본 운영 경로를 구성·관리했습니다.','Azure·Vercel 배포·기본 운영 담당 · 실제 네트워크 배치가 아닌 공개 패턴','공유 배포 자산과 관측 경로를 각 runtime에 연결',()=>'<iframe title="Thready 인프라 구성도" src="infrastructure.html?embed"></iframe>');

add('infra-change','06 / 인프라','환경별 변경 범위와 Apply 통제','기존 Azure 리소스를 코드로 관리할 때 의도하지 않은 삭제·교체나 다른 환경으로의 변경 전파를 통제해야 했습니다. 제품군·환경별 root와 remote state로 변경 범위를 나누고, state snapshot·plan·실제 리소스를 교차 검증한 뒤 apply 여부를 판단했습니다.','Terraform state·plan·live inventory 교차 검증 운영','의도하지 않은 destroy·replace를 apply 이전에 확인',()=>
 group(60,50,1080,210,'제품군·환경별 독립 변경 범위')+node(245,145,'공통 Root','별도 remote state','doc')+node(600,145,'제품군 / STG','별도 remote state','doc')+node(955,145,'제품군 / Prod','별도 remote state','doc')+
 flow([['State Snapshot','현재 관리 상태','db'],['Plan 대조','live inventory와 비교','gate'],['사람 판단','destroy · replace 검토','human'],['Apply 후 확인','실제 상태 점검','gate']],380));

add('operations','01 / 제품화','결정부터 릴리스까지 이어지는 제품 운영','기획·디자인·개발·QA 사이에서 결정과 진행 상태를 다시 설명하는 부담을 줄이고자 했습니다. 결정·명세·작업 기록과 담당 범위를 연결하고, 검수 승인·실제 완료 시점·버전 변경을 릴리스에 묶어 담당자가 바뀌어도 이어지는 제품 운영을 리드했습니다.','제품별 일정·이슈·릴리스 운영 리드 · 회사 AX 구조 설계 참여','제품 판단과 승인 책임은 사람이 소유하고, 기록으로 업무를 이어감',()=>
 flow([['제품 결정','요구·우선순위','human'],['명세·작업 기록','공유 실행 맥락','doc'],['기능 구현','BE · FE 담당'],['검수·릴리스','승인·버전 기록','gate']],160)+
 group(245,350,730,140,'회사 업무 AX로 확장하는 설계 · 참여 범위')+txt(610,410,'회의·업무 배정·승인·후속 작업','label')+txt(610,450,'제품 운영에서 축적한 맥락을 회사 업무와 연결','sub'));

const defs='<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#7b91a6"/></marker><marker id="risk" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4 0 8Z" fill="#b57933"/></marker></defs>';
const picker=document.querySelector('#picker');
picker.innerHTML=cases.map((c,i)=>`<option value="${c.id}">${String(i+1).padStart(2,'0')} · ${esc(c.title)}</option>`).join('');
function render(){let i=cases.findIndex(c=>c.id===location.hash.slice(1));if(i<0)i=0;const c=cases[i];picker.value=c.id;
 document.querySelector('#category').textContent=c.category;document.querySelector('#title').textContent=c.title;document.querySelector('#summary').textContent=c.summary;
 document.querySelector('#takeaway').textContent=c.takeaway;document.querySelector('#scope').textContent=c.scope;
 document.querySelector('#canvas').innerHTML=c.id==='infrastructure'?c.draw():`<svg viewBox="0 0 1200 560" role="img" aria-labelledby="diagram-title diagram-desc"><title id="diagram-title">${esc(c.title)}</title><desc id="diagram-desc">${esc(c.summary+' '+c.takeaway)}</desc>${defs}${c.draw()}</svg>`;
 document.querySelector('#count').textContent=`${i+1} / ${cases.length}`;document.querySelector('#prev').disabled=i===0;document.querySelector('#next').disabled=i===cases.length-1;document.title=c.title+' · Portfolio Visual Library';}
if(document.body.dataset.view!=='detail'){
picker.onchange=()=>location.hash=picker.value;document.querySelector('#prev').onclick=()=>location.hash=cases[Math.max(0,picker.selectedIndex-1)].id;document.querySelector('#next').onclick=()=>location.hash=cases[Math.min(cases.length-1,picker.selectedIndex+1)].id;
window.addEventListener('hashchange',render);window.addEventListener('keydown',e=>{if(['SELECT','INPUT','TEXTAREA'].includes(document.activeElement.tagName))return;if(e.key==='ArrowRight')document.querySelector('#next').click();if(e.key==='ArrowLeft')document.querySelector('#prev').click();});render();
}
