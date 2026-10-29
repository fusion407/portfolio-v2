import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { MobileNavigation } from "./mobile-navigation";
import { CommandPalette } from "@/components/command/command-palette";

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
          {navigation.map((item) =>
            item.href === "/projects" ? (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="header-tools">
          <CommandPalette />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
