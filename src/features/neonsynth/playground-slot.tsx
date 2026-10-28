import type { Project } from "@/content/projects";

// A passive extension boundary. A future authorized DSP integration can replace
// this content without changing the surrounding case-study layout.
export function NeonSynthPlaygroundSlot({
  content,
}: {
  content: NonNullable<Project["playground"]>;
}) {
  return (
    <section
      id="playground"
      className="playground-slot case-section"
      aria-labelledby="playground-heading"
      tabIndex={-1}
    >
      <p className="eyebrow">NeonSynth Web Playground / Future</p>
      <h2 id="playground-heading">{content.title}</h2>
      <p>{content.description}</p>
      <p>{content.note}</p>
      <p className="playground-status">
        <span aria-hidden="true">◌</span>Future integration · not available yet
      </p>
    </section>
  );
}
