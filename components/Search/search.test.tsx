import React from "react";
import { screen, fireEvent, createEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("Tests for the Search component", () => {
  it("renders Search component", () => {
    render(<Search searchValue="" />);
    const searchLine = screen.getByRole("textbox");
    expect(searchLine).toBeInTheDocument();
  });

  it("changes SearchLine text on typing", async () => {
    render(<Search searchValue="" />);
    const expectedValue = "test";
    const search = screen.getByRole("textbox");
    const user = userEvent.setup();
    await user.type(search, expectedValue);
    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  });

  it("should prevent default action on submit", () => {
    render(<Search searchValue="" />);
    const form = screen.getByRole("form");
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
