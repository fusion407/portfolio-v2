import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/geist";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getPortfolioPage } from "@/content/pages";
import { pageMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = pageMetadata(getPortfolioPage("home")!);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <div id="top" tabIndex={-1} className="site-shell">
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
