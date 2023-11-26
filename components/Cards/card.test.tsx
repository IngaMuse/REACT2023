import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import { cardMock } from "@/tests/cardMock";
import Main from "@/pages";
import { responseDetailsMock, responseMock } from "@/tests/responseMock";
import DetailsPage from "@/pages/details/[id]";
import mockRouter from "next-router-mock";
const card = cardMock;

describe("Renders the relevant card data", () => {
  beforeEach(async () => {
    render(<Card info={card} details={false} />);
  });

  it("renders card with image alt", async () => {
    const img = screen.getAllByTestId("image")[0];
    expect(img).toHaveAttribute("alt", "Terry");
  });

  it("renders card with age", () => {
    expect(screen.getByText(card.age)).toBeInTheDocument();
  });

  it("renders card with gender", () => {
    expect(screen.getByText(card.gender)).toBeInTheDocument();
  });

  it("renders card with birth date", () => {
    expect(screen.getByText(card.birthDate)).toBeInTheDocument();
  });

  it("renders card with birth date", () => {
    expect(screen.getByText(card.height)).toBeInTheDocument();
  });

  it("Tests for the Card component", async () => {
    render(<Card info={null} details={false} />);
    expect(screen.getByText(/card not found/)).toBeInTheDocument();
  });
});

describe("Renders the relevant card data", () => {
  it("clicking on a card opens a detailed and clicking triggers an additional API call", async () => {
    render(<Main response={responseMock} />);
    mockRouter.push("/details/1?page=1&limit=30&id=1");
    render(<DetailsPage response={responseDetailsMock} />);
    const user = userEvent.setup();
    const detailsLink = screen.getAllByRole("link");
    user.click(detailsLink[0]);
    expect(screen.getByTestId("detail")).toBeInTheDocument();
    expect(screen.getByText(/blood group/i)).toBeInTheDocument();
  });
});
