import React from "react";
import { screen, fireEvent, createEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import renderWithRouter from "../../tests/renderWithRouter";

describe("Tests for the Search component", () => {
  beforeEach(async () => {
    renderWithRouter(<Search />);
  });

  it("renders Search component", () => {
    const searchLine = screen.getByRole("textbox");
    expect(searchLine).toBeInTheDocument();
  });

  it("changes SearchLine text on typing", async () => {
    const expectedValue = "test";
    const search = screen.getByRole("textbox");
    const user = userEvent.setup();
    await user.type(search, expectedValue);
    expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument();
  });

  it("should prevent default action on submit", () => {
    const form = screen.getByRole("form");
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);
    expect(submitEvent.defaultPrevented).toBe(true);
  });

  it("clicking the Search button saves the entered value to the local storage and retrieves the value from the local storage", async () => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: vi.fn(() => null),
        setItem: vi.fn(() => null),
      },
      writable: true,
    });
    const expectedValue = "test";
    const search = screen.getByRole("textbox");
    const user = userEvent.setup();
    await user.type(search, expectedValue);
    const form = screen.getByRole("form");
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);
    expect(window.localStorage.setItem).toHaveBeenCalledWith("search", "test");
    const searchValue = screen.getByRole("textbox");
    expect(searchValue).toHaveAttribute("value", "test");
  });
});
