import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { technologyGroups } from "@/content/experience";

export function TechnologyStack() {
  return (
    <section
      id="stack"
      className="page-section stack-section"
      aria-labelledby="stack-heading"
      tabIndex={-1}
    >
      <Container>
        <SectionHeading
          id="stack-heading"
          number="04"
          label="Technology stack"
          title="A toolkit for making things real."
          description="AI runtimes, development tools, and creative software—each with a different role in the work."
        />
        <div className="technology-grid">
          {technologyGroups.map((group, index) => (
            <article key={group.title}>
              <span className="tool-group-number">
                / {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul className="tool-list">
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
