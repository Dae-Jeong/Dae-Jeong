import { Container } from "../../../components/site/container";
import { SiteFooter } from "../site-footer";
import { SiteTopBar } from "../site-topbar";
import styles from "./document-frame.module.css";

export function DocumentShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteTopBar />
      <div className={styles.stage}>
        <Container variant="doc" className={styles.container}>
          {children}
        </Container>
      </div>
      <SiteFooter className="relative z-50 bg-bg print:hidden" />
    </>
  );
}
