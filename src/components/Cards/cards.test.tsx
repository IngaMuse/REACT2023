import React from "react";
import {
  screen,
  render,
  fireEvent,
  createEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cards from "./Cards";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import renderWithRouter from "../../tests/renderWithRouter";
import Main from "../Main";

describe("Tests for the Card List component", () => {
  it("renders 2 cards", async () => {
    renderWithRouter(<Main />);
    const expectedValue = "e";
    const search = screen.getAllByRole("textbox")[0];
    const user = userEvent.setup();
    await user.type(search, expectedValue);
    const form = screen.getAllByRole("form")[0];
    const submitEvent = createEvent.submit(form);
    fireEvent(form, submitEvent);

    await waitFor(() => {
      const cardCount = screen.getAllByAltText("image");
      expect(cardCount).toHaveLength(2);
    });
    // const cardCount = screen.getAllByAltText("image");
    // expect(cardCount).toHaveLength(2);
    // expect(screen.getByText(/Terry Medhurst/)).toBeInTheDocument();
    // expect(screen.getByText(/Sheldon Quigley/)).toBeInTheDocument();
  });

  it("returns no cards found on wrong search", async () => {
    renderWithRouter(<Cards />);
    expect(screen.getByText(/cards not found/)).toBeInTheDocument();
  });
});
