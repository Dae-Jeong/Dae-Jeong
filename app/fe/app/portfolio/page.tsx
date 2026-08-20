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
    "아이디어를 새로운 가치로 실현하는 메이커, 김대정의 제품·백엔드·인프라 포트폴리오",
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
                직접 만들어 배포와 운영까지 맡아왔습니다.
              </p>
              <dl className="m-0 grid content-start gap-3">
                {[
                  ["제품", "기획·QA·마케팅과 제품 운영을 리드하고, backend·AI·핵심 frontend를 직접 구현"],
                  ["백엔드·AI", "병렬 재구축·STG migration·Outbox·worker·realtime session의 실패 경계 설계"],
                  ["플랫폼·실행 체계", "회사 Azure 변경 통제와 조직 표준 FastAPI template 설계·구축"],
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
              <h2 className="m-0 text-2xl font-semibold tracking-[-0.025em]">네 가지 대표 사례</h2>
              <p className="m-0 text-right text-sm text-muted max-sm:hidden">제품 · 서비스 · 인프라 · 실행 시스템</p>
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
            <h2 className="m-0 text-2xl font-semibold tracking-[-0.025em]">같은 원칙을 제품 운영과 외부 결제에도 적용했습니다.</h2>
            <p className="m-0 mt-3 text-base leading-[1.7] text-fg-2">제품 결정의 전달과 외부 결제의 완료 시점에서도, 판단과 상태의 소유자를 먼저 나눴습니다.</p>
            <div className="mt-8 grid gap-10">
              <section
                className="border-y border-border py-7"
                data-claim="mediness.product-system-design-participation mediness.product-operations"
              >
                <div className="grid grid-cols-[180px_minmax(0,1fr)] gap-8 max-md:grid-cols-1 max-md:gap-3">
                  <div>
                    <p className="m-0 font-mono text-xs text-muted">Product Operations</p>
                    <p className="m-0 mt-2 font-mono text-xs text-muted">설계 contributed · 운영 led</p>
                  </div>
                  <div>
                    <h3 className="m-0 text-lg font-semibold leading-[1.4]">제품 결정을 SPEC·작업·QA·release gate까지 연결했습니다.</h3>
                    <p className="m-0 mt-3 text-sm leading-[1.65] text-fg-2">제품 요구·운영 흐름의 설계에는 참여했고, 확정된 결정은 Decision·SPEC·Work Package와 BE·FE·QA owner lane, QA approval·version cut으로 이어지게 운영했습니다. Agent는 협업 도구 활동과 blocker 후보를 모으고, 제품 판단과 release 승인은 사람이 맡았습니다.</p>
                  </div>
                </div>
                <div className="portfolio-keep mt-6 grid grid-cols-[repeat(5,minmax(0,1fr))] border-y border-border text-center text-xs max-md:grid-cols-1 max-md:text-left print:grid-cols-5 print:text-center">
                  {["Decision", "SPEC", "Work Package", "BE · FE · QA", "Release Gate"].map((step, index) => (
                    <div key={step} className={`${index > 0 ? "border-l border-border max-md:border-l-0 max-md:border-t print:border-l print:border-t-0" : ""} px-3 py-4 font-mono print:px-2 print:py-3`}>{step}</div>
                  ))}
                </div>
              </section>

              <section
                className="border-y border-border py-7"
                data-claim="career.memento-stripe-prepayment career.memento-payment"
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
