import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedBuilds } from "@/components/sections/featured-builds";
import { HowIBuild } from "@/components/sections/how-i-build";
import { Experience } from "@/components/sections/experience";
import { TechnologyStack } from "@/components/sections/technology-stack";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <div id="top" tabIndex={-1} className="site-shell">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <FeaturedBuilds />
        <HowIBuild />
        <Experience />
        <TechnologyStack />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
