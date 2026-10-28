import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { workflow } from "@/content/workflow";

export function HowIBuild() {
  return (
    <section
      id="process"
      className="page-section process-section"
      aria-labelledby="process-heading"
      tabIndex={-1}
    >
      <Container>
        <SectionHeading
          id="process-heading"
          number="02"
          label="How I build"
          title="Human direction. AI acceleration."
          description="Design first. Establish the architecture, work through clear milestones, then test and refine. AI is part of the process; engineering judgment drives it."
        />
        <ol className="workflow-list">
          {workflow.map((stage, index) => (
            <li key={stage.title}>
              <span className="stage-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
        <div className="feedback-note">
          <span aria-hidden="true">↳</span>
          <p>
            <strong>Feedback is part of the architecture.</strong> Testing and
            feedback loop back into implementation, with design and requirements
            revisited when needed.
          </p>
          <span className="loop-label" aria-hidden="true">
            07 → 08 → 06
          </span>
        </div>
      </Container>
    </section>
  );
}
