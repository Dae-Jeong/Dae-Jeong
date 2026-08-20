import { Container } from "@/components/site/container";
import { ReviewLauncher } from "@/components/site/review-launcher";
import { SiteFooter } from "@/components/site/site-footer";
import { TopBar } from "@/components/site/topbar";

export function ResumePageShell({
  crumb = "Resume",
  tag,
  children,
}: {
  crumb?: React.ReactNode;
  tag?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="print:hidden">
        <TopBar variant="subpage" crumb={crumb} tag={tag} />
      </div>
      <Container variant="doc" className="flex-1">
        {children}
      </Container>
      <SiteFooter className="relative z-50 bg-bg print:hidden" />
      <ReviewLauncher className="xl:right-20" />
    </>
  );
}
