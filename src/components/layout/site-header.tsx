import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="wordmark" href="/">
          <span className="brand-mark" aria-hidden="true">
            bd<span>.</span>
          </span>
          <span>{site.name}</span>
        </Link>
        <nav className="desktop-navigation" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
