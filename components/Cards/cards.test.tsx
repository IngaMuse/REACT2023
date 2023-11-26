import React from "react";
import { screen, waitFor, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Cards from "./Cards";
import { cardsMock } from "@/tests/cardsMock";

describe("Tests for the Card List component", () => {
  it("renders 2 cards", async () => {
    render(<Cards cards={cardsMock} />);
    await waitFor(() => {
      const cardCount = screen.queryAllByTestId("card");
      expect(cardCount).toHaveLength(2);
    });
    expect(screen.getByText(/Terry Medhurst/)).toBeInTheDocument();
    expect(screen.getByText(/Sheldon Quigley/)).toBeInTheDocument();
  });

  it("returns no cards found on wrong search", async () => {
    render(<Cards cards={[]} />);
    expect(screen.getByText(/cards not found/)).toBeInTheDocument();
  });
});
