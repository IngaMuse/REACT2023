import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { cardMock } from "@/tests/cardMock";
import DetailsPage from "@/pages/details/[id]";
import { responseDetailsMock } from "@/tests/responseMock";
import mockRouter from "next-router-mock";

describe("Tests for the Detailed Card component", () => {
  const card = cardMock;
  beforeEach(async () => {
    render(<Card info={card} details={true} />);
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
});

describe("Tests for the Detailed Card component", () => {
  it("clicking the close button hides the component", async () => {
    mockRouter.push("/details/1?page=1&limit=30&id=1");
    render(<DetailsPage response={responseDetailsMock} />);
    const user = userEvent.setup();
    const closeButton = screen.getByTestId("close");
    expect(screen.queryAllByTestId("detail")[0]).toBeInTheDocument();
    user.click(closeButton);
    expect(screen.queryAllByTestId("detail")[0]).toBeNull;
  });
});
