import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="page-section"
      aria-labelledby="experience-heading"
      tabIndex={-1}
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          number="03"
          label="Experience"
          title="Engineering across boundaries."
        />
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-entry" key={item.organization}>
              <div>
                <p className="experience-context">{item.context}</p>
                <h3>{item.organization}</h3>
                <p className="experience-role">{item.role}</p>
              </div>
              <div>
                <p className="experience-description">{item.description}</p>
                <ul>
                  {item.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
