import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WorkflowExplorer } from "@/components/workflow/workflow-explorer";

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
        <WorkflowExplorer />
      </Container>
    </section>
  );
}
