import React from "react";
import { screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";
import userEvent from "@testing-library/user-event";
import CardPage from "./CardPage";
import renderWithRouter from "../../tests/renderWithRouter";
import { cardMock } from "../../mocks/cardMock";

describe("Tests for the Detailed Card component", () => {
  const card = cardMock;
  beforeEach(async () => {
    renderWithRouter(<Card info={card} details={true} />);
  });

  it("shows loader while cards are uploading", async () => {
    const { container } = renderWithRouter(<CardPage />);
    const loader = container.querySelector(".main__loader");
    await waitFor(() => {
      expect(loader).toBeInTheDocument();
    });
  });

  it("renders card with username", () => {
    expect(screen.getByText(card.username!)).toBeInTheDocument();
  });

  it("renders card with email", () => {
    expect(screen.getByText(card.email!)).toBeInTheDocument();
  });

  it("renders card with phone", () => {
    expect(screen.getByText(card.phone!)).toBeInTheDocument();
  });

  it("clicking the close button hides the component", async () => {
    const pathRoute = "/details/1";
    renderWithRouter(<CardPage />, pathRoute);
    const user = userEvent.setup();
    const closeButton = screen.getAllByRole("link")[0];
    expect(screen.queryAllByTestId("detail")[0]).toBeInTheDocument();
    user.click(closeButton);
    expect(screen.queryAllByTestId("detail")[0]).toBeNull;
  });
});
