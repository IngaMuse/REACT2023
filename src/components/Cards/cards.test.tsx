import React from "react";
import {
  screen,
  fireEvent,
  createEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import renderWithRouter from "../../tests/renderWithRouter";
import Main from "../Main";

describe("Tests for the Card List component", () => {
  it("renders 2 cards", async () => {
    renderWithRouter(<Main />);
    await waitFor(() => {
      const cardCount = screen.getAllByAltText("image");
      expect(cardCount).toHaveLength(2);
    });
    expect(screen.getByText(/Terry Medhurst/)).toBeInTheDocument();
    expect(screen.getByText(/Sheldon Quigley/)).toBeInTheDocument();
  });

  it("returns no cards found on wrong search", async () => {
    renderWithRouter(<Main />);
    const expectedValue = "ejjjhhhkl";
    const search = screen.getAllByRole("textbox")[0];
    const user = userEvent.setup();
    await user.type(search, expectedValue);
    const form = screen.getAllByRole("form")[0];
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);
    await waitFor(() => {
      expect(screen.getByText(/cards not found/)).toBeInTheDocument();
    });
  });
});
