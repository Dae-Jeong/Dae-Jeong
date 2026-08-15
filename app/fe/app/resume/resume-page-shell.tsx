import { AskLauncher } from "@/components/site/ask-launcher";
import { Container } from "@/components/site/container";
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
      <TopBar variant="subpage" crumb={crumb} tag={tag} />
      <Container variant="doc" className="flex-1">
        {children}
      </Container>
      <SiteFooter />
      <AskLauncher />
    </>
  );
}
