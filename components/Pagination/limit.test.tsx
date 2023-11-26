import React from "react";
import { screen, fireEvent, createEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import LimitPage from "./LimitPage";
import { describe, it, expect } from "vitest";

describe("Limit Page", () => {
  it("renders Limit Page component", () => {
    render(<LimitPage limit="30" />);
    const limitButton = screen.getByText("Change Limit Page");
    expect(limitButton).toBeDefined();
  });

  it("renders Limit Placeholder", () => {
    render(<LimitPage limit="30" />);
    const limit = screen.getByRole("textbox");
    expect(limit).toHaveAttribute("placeholder", "30");
  });

  it("should prevent default action on submit", () => {
    render(<LimitPage limit="30" />);
    const form = screen.getByRole("form");
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
