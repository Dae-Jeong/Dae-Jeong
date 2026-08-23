import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { PRIMARY_CASES } from "@/lib/cases";
import { CaseDossier } from "./case-dossier";

export const metadata: Metadata = {
  title: "Portfolio — 김대정 · Tech Lead · Backend Engineer",
  description:
    "아이디어를 새로운 가치로 실현하는 메이커, 김대정의 제품·백엔드·회사 AX 포트폴리오",
};

export default function PortfolioPage() {
  return (
    <>
      <div className="print:hidden"><TopBar variant="subpage" crumb="Portfolio" /></div>
      <Container variant="doc" className="flex-1 pb-24 print:pb-0">
        <main data-portfolio-document>
          <header className="border-b-2 border-fg pb-10 pt-14 print:pt-0">
            <p className="m-0 font-mono text-xs text-muted">Tech Lead · Backend Engineer · 실무 4년차</p>
            <h1 className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              아이디어를 새로운 가치로 실현하는 메이커,
              <br />
              김대정입니다.
            </h1>
            <div className="mt-8 grid grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-12 border-y border-border py-6 max-lg:grid-cols-1 max-lg:gap-6">
              <p className="m-0 text-lg leading-[1.72] text-fg-2">
                고객의 문제를 제품 범위와 품질 기준으로 좁히고, 백엔드·AI·핵심 화면을
                직접 만들어 배포와 운영까지 맡아왔습니다. 그 과정에서 생기는 결정·작업·검증이
                사람과 agent 모두에게 이어지도록 회사의 실행 체계 설계에도 참여했습니다.
              </p>
              <dl className="m-0 grid content-start gap-3">
                {[
                  ["제품", "기획·QA·마케팅과 제품 운영을 리드하고, backend·AI·핵심 frontend를 직접 구현"],
                  ["백엔드·AI", "병렬 재구축·STG migration·Outbox·worker·realtime session의 실패 경계 설계"],
                  ["회사 AX", "제품 개발 흐름을 운영하고, 의사결정·회의·업무 배정·승인·후속 작업으로 확장하는 구조 설계 참여"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[120px_minmax(0,1fr)] gap-4 text-sm max-sm:grid-cols-1 max-sm:gap-1">
                    <dt className="font-mono text-xs text-muted">{label}</dt>
                    <dd className="m-0 font-semibold leading-[1.55]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </header>

          <nav aria-label="대표 사례 바로가기" className="py-12 print:py-4">
            <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
              <h2 className="m-0 text-2xl font-semibold tracking-[-0.025em]">세 가지 대표 사례</h2>
              <p className="m-0 text-right text-sm text-muted max-sm:hidden">제품 · 회사 AX · 서비스</p>
            </div>
            <ol className="m-0 grid list-none p-0">
              {PRIMARY_CASES.map((item) => (
                <li key={item.slug} className="border-b border-border">
                  <a href={`#case-${item.slug}`} className="focus-ring grid grid-cols-[52px_minmax(0,1fr)_minmax(220px,0.45fr)] gap-5 py-5 hover:bg-surface max-md:grid-cols-[42px_minmax(0,1fr)] print:grid-cols-[42px_minmax(0,1fr)_minmax(180px,0.45fr)] print:gap-3 print:py-2.5">
                    <span className="font-mono text-sm text-muted">{item.no}</span>
                    <div>
                      <strong className="block text-base">{item.shortName}</strong>
                      <span className="mt-1 block text-sm text-fg-2 max-sm:hidden">{item.blurb}</span>
                    </div>
                    <span className="text-sm text-fg-2 max-md:col-start-2">{item.proof[0]}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-0">
            {PRIMARY_CASES.map((meta) => (
              <CaseDossier key={meta.slug} meta={meta} />
            ))}
          </div>

          <section id="supporting-systems" className="portfolio-support border-t-2 border-fg pb-8 pt-10">
            <h2 className="m-0 text-2xl font-semibold tracking-[-0.025em]">이전 경력에서는 외부 결제의 상태 전이를 다뤘습니다.</h2>
            <p className="m-0 mt-3 text-base leading-[1.7] text-fg-2">예약과 결제가 서로 다른 시점에 끝나는 상황에서, 취소·환불과 로컬 상태 변경의 순서를 나눴습니다.</p>
            <div className="mt-8">
              <section
                className="border-y border-border py-7"
              >
                <div className="grid grid-cols-[180px_minmax(0,1fr)] gap-8 max-md:grid-cols-1 max-md:gap-3">
                  <div>
                    <p className="m-0 font-mono text-xs text-muted">Memento · Payment</p>
                    <p className="m-0 mt-2 font-mono text-xs text-muted">Stripe slice led · shared domain contributed</p>
                  </div>
                  <div>
                    <h3 className="m-0 text-lg font-semibold leading-[1.4]">Stripe 선결제부터 Webhook·취소·환불까지 결제 상태 흐름을 구축했습니다.</h3>
                    <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">Stripe Checkout manual capture 영역을 구축하고 local transaction ID로 Checkout·Webhook을 결제 이력과 연결했습니다. 예약 처리에 실패하면 PaymentIntent 상태에 따라 cancel/refund하고, 마일리지 복원·이용권 삭제는 provider의 환불 완료 뒤로 옮겼습니다.</p>
                  </div>
                </div>
                <div className="portfolio-keep mt-6 grid grid-cols-[repeat(5,minmax(0,1fr))] border-y border-border text-center text-xs max-md:grid-cols-1 max-md:text-left print:grid-cols-5 print:text-center">
                  {["Checkout", "예약 결과", "Cancel / Refund", "Webhook 완료", "Mileage · Ticket"].map((step, index) => (
                    <div key={step} className={`${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""} px-3 py-4 font-mono print:px-2 print:py-3`}>{step}</div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </main>
      </Container>
      <div className="print:hidden"><SiteFooter /></div>
      <ReviewLauncher />
    </>
  );
}
