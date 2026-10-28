"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { workflow, type WorkflowStageId } from "@/content/workflow";
import { StageDetails } from "./stage-details";

// Server HTML offers ordinary fragment links. After hydration the same-sized
// controls become pressed-state buttons, without hiding the readable reference.
const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

export function WorkflowExplorer() {
  const enhanced = useSyncExternalStore(
    subscribe,
    clientSnapshot,
    serverSnapshot,
  );
  const [activeId, setActiveId] = useState<WorkflowStageId>("brainstorm");
  const [announcement, setAnnouncement] = useState("");
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = workflow.find((item) => item.id === activeId) ?? workflow[0];
  const activeIndex = workflow.findIndex((item) => item.id === stage.id);

  function selectStage(index: number, moveFocus = false) {
    const next = workflow[index];
    if (!next) return;
    setActiveId(next.id);
    setAnnouncement(
      `Showing stage ${index + 1} of ${workflow.length}: ${next.title}`,
    );
    if (moveFocus) {
      controls.current[index]?.focus({ preventScroll: true });
      controls.current[index]?.scrollIntoView?.({
        block: "nearest",
        behavior: "auto",
      });
    }
  }

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % workflow.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + workflow.length) % workflow.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = workflow.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    selectStage(next, true);
  }

  return (
    <div className="workflow-explorer">
      <p id="workflow-instructions" className="workflow-instructions">
        Explore a stage to see its purpose, inputs, and outputs. The full
        workflow is also available in one readable view below.
      </p>
      <ol
        className="workflow-list"
        aria-label="Development stages"
        aria-describedby="workflow-instructions"
      >
        {workflow.map((item, index) => {
          const content = (
            <>
              <span className="stage-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="workflow-stage-title">{item.title}</span>
              <span className="workflow-stage-arrow" aria-hidden="true">
                ↗
              </span>
            </>
          );
          return (
            <li key={item.id}>
              {enhanced ? (
                <button
                  type="button"
                  id={`workflow-control-${item.id}`}
                  className="workflow-stage-control"
                  aria-pressed={activeId === item.id}
                  aria-controls="workflow-detail-panel"
                  ref={(element) => {
                    controls.current[index] = element;
                  }}
                  onClick={() => selectStage(index)}
                  onKeyDown={(event) => handleKey(event, index)}
                >
                  {content}
                </button>
              ) : (
                <a
                  id={`workflow-control-${item.id}`}
                  className="workflow-stage-control"
                  href={`#workflow-reference-${item.id}`}
                >
                  {content}
                </a>
              )}
            </li>
          );
        })}
      </ol>
      <p className="workflow-keyboard-hint">
        {enhanced
          ? "Keyboard: Tab to a stage, then Enter or Space. Arrow keys, Home, and End also move between stages."
          : "Follow a stage link to its full description, or open the complete workflow below."}
      </p>
      <div
        id="workflow-detail-panel"
        className="workflow-detail-panel"
        role="region"
        aria-labelledby="workflow-detail-context workflow-detail-heading"
      >
        <span id="workflow-detail-context" className="sr-only">
          Selected stage:
        </span>
        <div className="workflow-panel-intro">
          <p className="eyebrow">
            Stage {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(workflow.length).padStart(2, "0")}
          </p>
          <h3 id="workflow-detail-heading">{stage.title}</h3>
          <p>{stage.description}</p>
        </div>
        <StageDetails stage={stage} />
      </div>
      <p className="sr-only" role="status">
        {announcement}
      </p>

      <div className="workflow-feedback">
        <div className="workflow-loop" aria-label="Validation feedback loop">
          <span>07 / Test</span>
          <span aria-hidden="true">→</span>
          <span>08 / Feedback</span>
          <span aria-hidden="true">→</span>
          {enhanced ? (
            <button type="button" onClick={() => selectStage(5, true)}>
              06 / Return to implementation <span aria-hidden="true">↩</span>
            </button>
          ) : (
            <a href="#workflow-reference-implement">
              06 / Return to implementation <span aria-hidden="true">↩</span>
            </a>
          )}
        </div>
        <p>
          <strong>Feedback is part of the architecture.</strong> Testing and
          feedback loop back into implementation, with design and requirements
          revisited when needed.
        </p>
      </div>

      <details className="workflow-reference">
        <summary>
          Read the full workflow{" "}
          <span className="workflow-reference-count">All 8 stages</span>
        </summary>
        <ol>
          {workflow.map((item, index) => (
            <li key={item.id}>
              <section
                id={`workflow-reference-${item.id}`}
                aria-labelledby={`workflow-reference-heading-${item.id}`}
                tabIndex={-1}
              >
                <p className="eyebrow">
                  Stage {String(index + 1).padStart(2, "0")}
                </p>
                <h3 id={`workflow-reference-heading-${item.id}`}>
                  {item.title}
                </h3>
                <p className="workflow-reference-description">
                  {item.description}
                </p>
                <StageDetails stage={item} />
              </section>
            </li>
          ))}
        </ol>
      </details>
    </div>
  );
}
