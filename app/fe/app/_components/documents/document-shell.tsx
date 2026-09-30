import { Container } from "../../../components/site/container";
import { SiteFooter } from "../site-footer";
import { TopBar } from "../../../components/site/topbar";

export function DocumentShell({
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
    </>
  );
}
