import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section
      id="about"
      className="page-section"
      aria-labelledby="about-heading"
      tabIndex={-1}
    >
      <Container className="about-grid">
        <SectionHeading
          id="about-heading"
          number="05"
          label="About"
          title="Curiosity, with a build plan."
        />
        <div className="about-copy">
          <p className="about-lead">
            I’m Brady. I work at the intersection of AI engineering, creative
            software, and real-time game development.
          </p>
          <p>
            I turn ambitious ideas into software through design-first thinking,
            agentic development workflows, and hands-on testing. I’m interested
            in how systems fit together—and in the details that make them
            useful.
          </p>
          <p>
            Whether the work involves local AI inference, a synthesizer, or a
            game’s visual experience, the approach stays consistent: understand
            the problem, design deliberately, build, and refine.
          </p>
        </div>
      </Container>
    </section>
  );
}
