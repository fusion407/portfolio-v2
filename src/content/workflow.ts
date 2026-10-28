export const workflow = [
  {
    id: "brainstorm",
    title: "Brainstorm with AI",
    description:
      "Explore an ambitious idea, ask questions, and find the problem worth solving.",
    purpose:
      "Explore the problem and possible directions before choosing what to build.",
    inputs: [
      "An initial idea or problem",
      "Questions, constraints, and AI-assisted exploration",
    ],
    outputs: ["Candidate approaches", "An initial direction to refine"],
  },
  {
    id: "design",
    title: "Refine the design",
    description:
      "Iterate on requirements and the experience before committing to implementation.",
    purpose:
      "Clarify what the software should do and how people should experience it.",
    inputs: [
      "Initial ideas and candidate approaches",
      "Feedback from design iterations",
    ],
    outputs: [
      "Refined requirements and experience",
      "Explicit constraints and acceptance expectations",
    ],
  },
  {
    id: "architecture",
    title: "Architect the system",
    description:
      "Connect the parts into a coherent plan, with clear boundaries and tradeoffs.",
    purpose:
      "Plan how the complete system fits together before implementing its parts.",
    inputs: [
      "Refined requirements",
      "Technical constraints and design decisions",
    ],
    outputs: [
      "System architecture",
      "Component boundaries and technical tradeoffs",
    ],
  },
  {
    id: "milestones",
    title: "Plan milestones",
    description:
      "Break the work into sequential, reviewable steps with acceptance criteria.",
    purpose:
      "Make the work sequential and reviewable, with a clear standard for each step.",
    inputs: [
      "The system architecture",
      "Dependencies and implementation priorities",
    ],
    outputs: ["A sequential milestone plan", "Review and testing criteria"],
  },
  {
    id: "context",
    title: "Build master context",
    description:
      "Give coding agents the requirements, architecture, constraints, and full project context.",
    purpose:
      "Give AI coding agents a comprehensive source of truth and explicit task boundaries.",
    inputs: [
      "Approved requirements and architecture",
      "Milestones, constraints, and project context",
    ],
    outputs: [
      "Comprehensive master context",
      "Implementation instructions and boundaries",
    ],
  },
  {
    id: "implement",
    title: "Implement with agents",
    description:
      "Direct AI coding agents through focused engineering tasks and review the results.",
    purpose:
      "Turn the plan into working software through focused tasks under human direction.",
    inputs: [
      "Master context and the current milestone",
      "Existing code and project constraints",
    ],
    outputs: ["A reviewable implementation", "Changes ready for verification"],
  },
  {
    id: "test",
    title: "Test personally",
    description:
      "Run the software, exercise the experience, and run automated checks.",
    purpose:
      "Use hands-on testing and automated checks to find issues and evaluate acceptance criteria.",
    inputs: [
      "The running implementation",
      "Acceptance criteria and test cases",
    ],
    outputs: [
      "Manual observations and automated test results",
      "Recorded defects and remaining uncertainties",
    ],
  },
  {
    id: "feedback",
    title: "Give feedback. Repeat.",
    description:
      "Use what testing reveals to guide another implementation pass and refine the design.",
    purpose:
      "Turn findings into focused changes, repeating until the result meets the intended standard.",
    inputs: ["Testing findings", "Personal review and feedback"],
    outputs: [
      "Actionable feedback",
      "Another implementation pass, or revised design when needed",
    ],
  },
] as const;

export type WorkflowStage = (typeof workflow)[number];
export type WorkflowStageId = WorkflowStage["id"];
