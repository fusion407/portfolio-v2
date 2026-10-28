import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/content/projects";

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
      </Container>
    </section>
  );
}
