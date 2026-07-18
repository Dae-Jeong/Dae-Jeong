import type { Metadata } from "next";
import { AskLauncher, AskPanel } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
import { MobileNavPanel } from "@/components/site/mobile-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Card, CardGrid } from "@/components/ui/card-grid";
import { Chip } from "@/components/ui/chip";
import { EvidencePopover, PopoverCard } from "@/components/ui/evidence-popover";
import {
  KeyValueCard,
  KeyValueRows,
} from "@/components/ui/key-value-list";
import { ModalPanel } from "@/components/ui/modal";
import { NumberedList, NumberedRow } from "@/components/ui/numbered-row";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { Toast } from "@/components/ui/toast";
import { ModalDemo, ToastDemo } from "./overlay-demos";
import { ColorTokens, TypeTokens } from "./token-grid";

export const metadata: Metadata = {
  title: "Design System — marinkim.xyz",
  description:
    "컴포넌트 9종 living specimen — canonical: app/design/component-sheet.html",
};

/* specimen 프레임 — 데모 전용 로컬 헬퍼 */
function Specimen({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 grid gap-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em]">
          {label}
        </span>
        {hint && (
          <span className="font-mono text-[10px] tracking-[0.04em] text-muted">
            {hint}
          </span>
        )}
      </div>
      <div className="border border-border-soft p-6 max-sm:p-4">{children}</div>
    </div>
  );
}

export default function DesignPage() {
  return (
    <>
      <TopBar variant="subpage" crumb="Design" tag="LIVING SPECIMEN" />

      <main className="pb-24">
        <Container variant="doc" className="pt-12">
          <h1 className="font-mono text-3xl font-semibold tracking-[-0.02em]">
            Design System
          </h1>
          <p className="mt-3 max-w-[62ch] text-fg-2">
            실제 배포 컴포넌트가 실제 파이프라인에서 렌더되는 living specimen.
            디자인 canonical 은{" "}
            <span className="font-mono text-sm">
              app/design/component-sheet.html
            </span>{" "}
            — D1(hub 1280 · doc 1180)·D3(Button=fill · Chip=bordered) 확정,
            D2(상태 정의)는 보류로 hover/focus 는 라이브 동작이 기준.
          </p>
        </Container>

        {/* 00 Tokens — foundations, 값은 렌더 시점 실값 */}
        <Container variant="doc" className="pt-16">
          <SectionHead no="00" title="Tokens" meta="@theme · runtime 실값" />
          <Specimen label="Color" hint="semantic 13 — 값은 getComputedStyle 실값">
            <ColorTokens />
          </Specimen>
          <Specimen label="Type Scale" hint="text-xs ~ text-4xl · verbatim contract px">
            <TypeTokens />
          </Specimen>
        </Container>

        {/* 01 TopBar */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="01" title="TopBar" meta="home / subpage" />
          <Specimen label="Home 형" hint="sticky + blur · brand + nav + fill btn">
            <div className="overflow-hidden">
              <TopBar />
            </div>
          </Specimen>
          <Specimen label="Subpage 형" hint="brand + crumb + tag">
            <div className="overflow-hidden">
              <TopBar variant="subpage" crumb="Resume" tag="PHASE 2 PREVIEW" />
            </div>
          </Specimen>
        </Container>

        {/* 02 SectionHead */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="02" title="SectionHead" meta="no + h2 + meta" />
          <Specimen label="기본" hint="이 페이지의 섹션 헤더가 곧 라이브 데모">
            <SectionHead no="04" title="대표 프로젝트" meta="Selected Cases · 5" />
          </Specimen>
        </Container>

        {/* 03 Button */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="03" title="Button" meta="accent-fill 전용 · D3 확정" />
          <Specimen
            label="States"
            hint="default / disabled — hover·focus 는 라이브 (D2 보류)"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#">↓ Resume PDF 다운로드</Button>
              <Button>SEND</Button>
              <Button href="#" disabled title="준비 중">
                ↓ Resume PDF
              </Button>
            </div>
          </Specimen>
        </Container>

        {/* 04 Chip */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="04" title="Chip" meta="bordered 전용 · D3 확정" />
          <Specimen label="Variants" hint="link / status / contact">
            <div className="flex flex-wrap items-center gap-3">
              <Chip href="https://github.com/Dae-Jeong" external>
                github.com/Dae-Jeong
              </Chip>
              <Chip variant="status">MediSolve AI · Backend Engineer · 재직 중</Chip>
              <Chip variant="contact" href="mailto:marin.backend@gmail.com">
                marin.backend@gmail.com
              </Chip>
            </div>
          </Specimen>
        </Container>

        {/* 05 NumberedRow */}
        <Container variant="doc" className="pt-8">
          <SectionHead
            no="05"
            title="NumberedRow"
            meta="summary 56 / creds 110 / career 150"
          />
          <Specimen label="Summary · 56px" hint="번호 + 문장 · 02행 green accent">
            <NumberedList>
              <NumberedRow label="01">
                AI 콘텐츠 생성 <strong>backend 전면 재구축</strong>과 이후
                개발·운영 전담
              </NumberedRow>
              <NumberedRow label="02" accent>
                월 수만 건 규모 요청을 처리하는 production backend를{" "}
                <strong>HTTP 5xx 0.3% 수준</strong>으로 운영
              </NumberedRow>
              <NumberedRow label="03">
                Backend Engineer 합류 후 <strong>Tech Lead·PO 역할 병행</strong>
              </NumberedRow>
            </NumberedList>
          </Specimen>
          <Specimen label="Career · 150px" hint="org + desc + trailing 기간">
            <NumberedList>
              <NumberedRow
                label={
                  <>
                    MediSolve AI<Badge>NOW</Badge>
                  </>
                }
                labelWidth="lg"
                labelClassName="font-semibold text-fg"
                trailing="2025.04 —"
              >
                <span className="text-base text-fg-2">
                  Backend Engineer · Tech Lead·PO 병행
                </span>
              </NumberedRow>
              <NumberedRow
                label="더데이랩스"
                labelWidth="lg"
                labelClassName="font-semibold text-fg"
                trailing="2025.02 — 2025.04"
              >
                <span className="text-base text-fg-2">
                  Centurion 초기 backend 구축 · 개발팀 시스템·기준 수립
                </span>
              </NumberedRow>
            </NumberedList>
          </Specimen>
          <Specimen label="Creds · 110px" hint="연도 + 내용">
            <NumberedList>
              <NumberedRow label="2024.01" labelWidth="md">
                <span className="text-sm text-fg-2">
                  CES 2024 Best of Innovation · AI 부문 대상 제품 참여
                </span>
              </NumberedRow>
              <NumberedRow label="2025.12" labelWidth="md">
                <span className="text-sm text-fg-2">
                  특허 등록 「페이지 출력 방법」 · 등록 10-2898273
                </span>
              </NumberedRow>
            </NumberedList>
          </Specimen>
        </Container>

        {/* 06 CardGrid */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="06" title="CardGrid" meta="1px collapse · 2col / 4col" />
          <Specimen label="2열" hint="핵심 역량 · hover 시 surface">
            <CardGrid cols={2}>
              <Card>
                <h3 className="m-0 font-mono text-base font-semibold">
                  AI Product Systems
                </h3>
                <p className="m-0 text-sm text-fg-2">
                  typed prompt builder, LLM judge, 평가 루프, 관측 로깅 기반 생성
                  품질 시스템
                </p>
              </Card>
              <Card>
                <h3 className="m-0 font-mono text-base font-semibold">
                  Product Backend Ownership
                </h3>
                <p className="m-0 text-sm text-fg-2">
                  주문·재고 API, RabbitMQ·TaskIQ worker, service
                  boundary·migration 주도
                </p>
              </Card>
            </CardGrid>
          </Specimen>
          <Specimen label="4열" hint="route gateway">
            <CardGrid cols={4}>
              {[
                ["Resume", "A4 마스터 이력서 · PDF"],
                ["Portfolio", "case 5건 — 문제·결정·시스템·운영 근거"],
                ["Blog", "판단 과정과 운영 경험 기록"],
                ["Labs", "만든 것들 — 기능·서비스 관문"],
              ].map(([name, desc]) => (
                <Card key={name}>
                  <span className="font-mono text-sm font-semibold uppercase tracking-[0.08em]">
                    {name}
                  </span>
                  <span className="text-xs text-muted">{desc}</span>
                </Card>
              ))}
            </CardGrid>
          </Specimen>
        </Container>

        {/* 07 KeyValueList */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="07" title="KeyValueList" meta="hero card / skills row" />
          <Specimen label="Hero Card · dl" hint="bordered · 값 우측 정렬">
            <KeyValueCard
              className="max-w-[300px]"
              groups={[
                [
                  { k: "Role", v: "Backend" },
                  { k: "Domain", v: "AI Product" },
                ],
                [
                  { k: "Now", v: "MediSolve AI" },
                  { k: "Since", v: "2025.04" },
                ],
                [
                  { k: "Site", v: "marinkim.xyz" },
                  { k: "GitHub", v: "Dae-Jeong" },
                ],
              ]}
            />
          </Specimen>
          <Specimen label="Skills Row" hint="150px key + 값">
            <KeyValueRows
              items={[
                {
                  k: "Language / FW",
                  v: "Python, FastAPI, TypeScript, NestJS, Java, Spring Boot",
                },
                {
                  k: "Data / Messaging",
                  v: "PostgreSQL, MySQL, Redis, RabbitMQ, TaskIQ",
                },
                {
                  k: "Infra / Delivery",
                  v: "Azure, AWS, Terraform, Docker, GitHub Actions",
                },
              ]}
            />
          </Specimen>
        </Container>

        {/* 08 Badge */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="08" title="Badge" meta="inline 반전" />
          <Specimen label="NOW" hint="career 행의 회사명 뒤">
            <span className="font-mono text-lg font-semibold">
              MediSolve AI<Badge>NOW</Badge>
            </span>
          </Specimen>
        </Container>

        {/* 09 AskLauncher */}
        <Container variant="doc" className="pt-8">
          <SectionHead
            no="09"
            title="AskLauncher"
            meta="전 페이지 공통 · 우하단 라이브"
          />
          <Specimen
            label="Panel"
            hint="열림 상태 정적 렌더 — 라이브는 우하단 ASK 버튼"
          >
            <div className="flex justify-end">
              <AskPanel />
            </div>
          </Specimen>
        </Container>

        {/* 10 Modal */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="10" title="Modal" meta="포트폴리오 케이스 · D2 backdrop 단색" />
          <Specimen label="열림 · 정적" hint="backdrop rgba(17,17,17,.55) · blur 미사용">
            <div className="relative min-h-[300px] overflow-hidden bg-surface">
              <div className="absolute inset-0 grid place-items-center bg-[rgba(17,17,17,0.55)] p-5">
                <ModalPanel title="Thready · 케이스 상세">
                  <div className="grid aspect-video place-items-center bg-surface-warm font-mono text-[10px] tracking-[0.08em] text-muted">
                    MEDIA 16:9
                  </div>
                  <p className="m-0 text-sm text-fg-2">
                    AI 콘텐츠 생성 backend 전면 재구축. service boundary
                    재설계와 migration을 주도하고 이후 운영을 전담했습니다.
                  </p>
                  <span className="border-t border-border-soft pt-2.5 font-mono text-[10px] tracking-[0.06em] text-muted">
                    ESC · backdrop 클릭 · × 로 닫힘
                  </span>
                </ModalPanel>
              </div>
            </div>
          </Specimen>
          <Specimen label="라이브" hint="focus trap · ESC · close 시 트리거 복귀">
            <ModalDemo />
          </Specimen>
        </Container>

        {/* 11 EvidencePopover */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="11" title="EvidencePopover" meta="chat 3층 답변 · claim 요약" />
          <Specimen label="라이브" hint="클릭 토글 · 바깥 클릭 / ESC 닫기">
            <div className="min-h-[240px]">
              <EvidencePopover
                index="근거 2"
                label="HTTP 5xx 0.3%"
                claim="월 수만 건 규모 요청을 5xx 0.3% 수준으로 운영"
                source="Thready 운영 지표"
                href="#"
              />
            </div>
          </Specimen>
          <Specimen label="정적 · 카드" hint="claim + src + related link · 삼각 화살표">
            <PopoverCard
              claim="월 수만 건 규모 요청을 5xx 0.3% 수준으로 운영"
              source="Thready 운영 지표"
              href="#"
            />
          </Specimen>
        </Container>

        {/* 12 Banner */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="12" title="Banner" meta="페이지 상단 고지" />
          <Specimen label="dismiss O" hint="DRAFT / PHASE 2 PREVIEW — × 로 닫힘">
            <div className="grid gap-3">
              <Banner tag="DRAFT">
                이 영문 이력서는 <b>초안</b>입니다 — 한글 마스터 기준으로 검수
                중.
              </Banner>
              <Banner tag="PHASE 2 PREVIEW">
                chat·evidence 기능은 <b>미리보기</b>입니다. 입력은 아직 비활성.
              </Banner>
            </div>
          </Specimen>
          <Specimen label="warn · dismiss X" hint="--warn · 사용자가 넘겨선 안 되는 고지">
            <Banner tag="NOTICE" variant="warn">
              일부 지표는 <b>운영 시점 기준</b>이며 실시간 값이 아닙니다.
            </Banner>
          </Specimen>
        </Container>

        {/* 13 Toast */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="13" title="Toast" meta="상단 중앙 · D1 · 자동 소멸 4s" />
          <Specimen label="Variants · 정적" hint="success green dot ×1 / danger 배경 반전">
            <div className="flex flex-wrap items-start gap-4">
              <Toast message="이메일이 복사되었습니다" />
              <Toast
                message="응답을 불러오지 못했습니다 — 다시 시도"
                variant="danger"
              />
            </div>
          </Specimen>
          <Specimen label="라이브" hint="상단 중앙 스택 · AskLauncher(우하단) 회피">
            <ToastDemo />
          </Specimen>
        </Container>

        {/* 14 MobileNav */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="14" title="MobileNav" meta="≤720px · D3 풀스크린" />
          <Specimen label="열림 · 정적 축소" hint="잉크 반전 · 번호 라우트 4">
            <div className="mx-auto w-[320px] max-w-full">
              <MobileNavPanel className="h-[420px]" />
            </div>
          </Specimen>
          <Specimen
            label="라이브"
            hint="뷰포트 ≤720px 에서 위 TopBar(home형)에 MENU 토글 노출 — ESC · CLOSE · 트리거 복귀"
          >
            <p className="m-0 text-sm text-fg-2">
              브라우저 폭을 720px 이하로 줄이면 01 TopBar(home형) 데모에서
              MENU 토글이 라이브로 동작합니다.
            </p>
          </Specimen>
        </Container>

        {/* Reveal 데모 — 스크롤 진입 시 stagger */}
        <Container variant="doc" className="pt-8">
          <SectionHead no="+" title="Reveal" meta="scroll 진입 모션 · reduced-motion 대응" />
          <Specimen label="Stagger" hint="이 블록이 뷰포트에 들어올 때 순차 등장">
            <Reveal stagger className="grid gap-2">
              <p className="m-0 text-sm text-fg-2">첫 번째 행</p>
              <p className="m-0 text-sm text-fg-2">두 번째 행 — 55ms 지연</p>
              <p className="m-0 text-sm text-fg-2">세 번째 행 — 110ms 지연</p>
            </Reveal>
          </Specimen>
        </Container>
      </main>

      <SiteFooter />
      <AskLauncher />
    </>
  );
}
