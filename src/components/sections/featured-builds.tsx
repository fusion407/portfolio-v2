import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";
import Link from "next/link";

export function FeaturedBuilds() {
  return (
    <section
      id="work"
      className="page-section"
      aria-labelledby="work-heading"
      tabIndex={-1}
    >
      <Container>
        <SectionHeading
          id="work-heading"
          number="01"
          label="Featured builds"
          title="Different disciplines. One builder."
          description="From local AI integration to sound synthesis and real-time worlds. A selection of work in progress and professional contributions."
        />
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        <div className="section-end-link">
          <Link href="/projects">
            View all projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
