import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";
import { PRIMARY_CASES } from "@/lib/cases";
import { CaseSummary } from "./case-summary";

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
        <main id="top" data-portfolio-document>
          <header className="portfolio-hero border-b-2 border-fg pb-10 pt-14 print:pt-0">
            <p className="m-0 text-sm font-medium text-muted">Maker · Tech Lead · Backend Engineer</p>
            <h1 className="mt-4 text-[clamp(2.15rem,4.6vw,3.35rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
              <span className="block md:whitespace-nowrap">아이디어를 새로운 가치로 실현하는</span>
              <span className="block">메이커, 김대정입니다.</span>
            </h1>
            <div className="mt-8 grid grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] gap-10 border-y border-border py-6 max-lg:grid-cols-1 max-lg:gap-5">
              <p className="m-0 text-xl font-semibold leading-[1.55] text-pretty">
                고객이 돈을 내는 이유를 찾고, 기획·QA·마케팅과 제품 판단부터 출시·운영까지
                이끌었습니다. 팀과 함께 Thready를 실제 고객이 결제하는 제품으로 만들었습니다.
              </p>
              <p className="m-0 text-base leading-[1.75] text-fg-2 text-pretty">
                제품 판단부터 구현·출시·운영까지 연결하고, 그 과정에 필요한 backend·AI·핵심
                frontend를 직접 구축했습니다. 다른 제품에서는 비동기 작업과 실시간 세션의
                실패 경계를 다뤘고, 제품에서 쌓인 결정과 검증 기록을 회사 업무로 확장하는 AX
                구조 설계에도 참여했습니다.
              </p>
            </div>
          </header>

          <nav aria-label="대표 사례 바로가기" className="py-12 print:py-4">
            <div className="flex items-end justify-between gap-6 border-b border-border pb-4">
              <h2 className="m-0 text-2xl font-semibold tracking-[-0.025em]">세 가지 대표 사례</h2>
              <p className="m-0 text-right text-sm text-muted max-sm:hidden">60초 요약 · 상세 기술 근거 연결</p>
            </div>
            <ol className="portfolio-case-index m-0 grid list-none p-0">
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
              <CaseSummary key={meta.slug} meta={meta} />
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
                    <p className="m-0 text-sm font-semibold">Memento · Payment</p>
                    <p className="m-0 mt-2 text-sm text-muted">Stripe 선결제 구축 주도 · 결제 도메인 공동 기여</p>
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

          <section className="portfolio-keep my-14 bg-fg px-7 py-9 text-bg print:my-8 print:border print:border-fg print:bg-transparent print:text-fg">
            <p className="m-0 text-sm font-medium text-bg/65 print:text-muted">다음 제품에서 맡고 싶은 일</p>
            <h2 className="m-0 mt-3 max-w-[900px] text-[clamp(1.7rem,3vw,2.7rem)] font-semibold leading-[1.2] tracking-[-0.03em] text-balance">
              고객 문제를 실제 매출이 발생하는 제품으로 만들고, 그 제품을 계속 운영할 시스템까지 책임집니다.
            </h2>
            <p className="m-0 mt-5 max-w-[760px] text-base leading-[1.7] text-bg/75 print:text-fg-2">
              제품 판단과 직접 구현을 함께 맡을 Tech Lead·Backend Engineer 역할이라면 이야기 나누고 싶습니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 print:hidden">
              <Link href="/resume" className="focus-ring inline-flex min-h-11 items-center border-b border-bg text-sm font-semibold hover:text-bg/70">
                이력서 보기 →
              </Link>
              <a href="mailto:marin.backend@gmail.com" className="focus-ring inline-flex min-h-11 items-center border-b border-bg text-sm font-semibold hover:text-bg/70">
                이메일로 이야기하기 →
              </a>
              <a href="#top" className="focus-ring inline-flex min-h-11 items-center text-sm text-bg/70 hover:text-bg">
                처음으로 ↑
              </a>
            </div>
          </section>
        </main>
      </Container>
      <div className="print:hidden"><SiteFooter /></div>
      <ReviewLauncher />
    </>
  );
}
