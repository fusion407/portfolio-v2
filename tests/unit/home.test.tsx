import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

describe("portfolio introduction", () => {
  it("identifies Brady and his work without requiring client-side enhancement", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: /I build\s*things\./ }),
    ).toBeVisible();
    expect(screen.getByText("AI Engineer & Builder of Things")).toBeVisible();
  });

  it("offers the confirmed professional profiles without inventing contact details", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/fusion407",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/brady-dorsey-9a582279",
    );
    expect(screen.queryByRole("link", { name: /download|email/i })).toBeNull();
  });
});
