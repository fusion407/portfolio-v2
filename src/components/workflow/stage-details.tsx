import type { WorkflowStage } from "@/content/workflow";

export function StageDetails({ stage }: { stage: WorkflowStage }) {
  return (
    <dl className="workflow-details">
      <div className="workflow-purpose">
        <dt>Purpose</dt>
        <dd>{stage.purpose}</dd>
      </div>
      <div>
        <dt>Inputs</dt>
        <dd>
          <ul>
            {stage.inputs.map((input) => (
              <li key={input}>{input}</li>
            ))}
          </ul>
        </dd>
      </div>
      <div>
        <dt>Outputs</dt>
        <dd>
          <ul>
            {stage.outputs.map((output) => (
              <li key={output}>{output}</li>
            ))}
          </ul>
        </dd>
      </div>
    </dl>
  );
}
