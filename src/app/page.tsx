import { Hero } from "@/components/sections/hero";
import { PageMotion } from "@/components/motion/page-motion";
import { FeaturedBuilds } from "@/components/sections/featured-builds";
import { HowIBuild } from "@/components/sections/how-i-build";
import { Experience } from "@/components/sections/experience";
import { TechnologyStack } from "@/components/sections/technology-stack";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <PageMotion />
      <Hero />
      <FeaturedBuilds />
      <HowIBuild />
      <Experience />
      <TechnologyStack />
      <About />
      <Contact />
    </>
  );
}
