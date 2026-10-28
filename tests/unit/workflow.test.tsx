import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WorkflowExplorer } from "@/components/workflow/workflow-explorer";

describe("workflow selection", () => {
  it("updates the detail region and exposes one pressed stage", () => {
    render(<WorkflowExplorer />);
    fireEvent.click(screen.getByRole("button", { name: /Test personally/ }));

    const panel = screen.getByRole("region", {
      name: "Selected stage: Test personally",
    });
    expect(within(panel).getByText("Purpose", { exact: true })).toBeVisible();
    expect(within(panel).getByText("Inputs", { exact: true })).toBeVisible();
    expect(within(panel).getByText("Outputs", { exact: true })).toBeVisible();
    expect(
      within(panel).getByText("Manual observations and automated test results"),
    ).toBeVisible();
    expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
  });

  it("returns from feedback to implementation and restores stage focus", () => {
    render(<WorkflowExplorer />);
    fireEvent.click(
      screen.getByRole("button", { name: /Give feedback\. Repeat\./ }),
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Return to implementation/ }),
    );

    const implement = screen.getByRole("button", {
      name: /Implement with agents/,
    });
    expect(implement).toHaveAttribute("aria-pressed", "true");
    expect(implement).toHaveFocus();
    expect(
      screen.getByRole("region", {
        name: "Selected stage: Implement with agents",
      }),
    ).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Showing stage 6 of 8",
    );
  });
});
