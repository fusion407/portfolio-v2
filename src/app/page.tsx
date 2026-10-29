import { Hero } from "@/components/sections/hero";
import { personSchema, serializeSchema } from "@/lib/metadata";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(personSchema()) }}
      />
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
