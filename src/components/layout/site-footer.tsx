import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <p>
          {site.name}
          <span className="footer-divider">/</span>Ideas. Systems. Working
          software.
        </p>
        <a href="#top" className="back-to-top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </Container>
    </footer>
  );
}
