import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/geist";
import { SkipLink } from "@/components/layout/skip-link";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.identity}`,
  description: site.description,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
