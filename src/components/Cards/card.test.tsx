import React from "react";
import { screen, render } from "@testing-library/react";
import { ICard } from "../../types/card.types";
import "@testing-library/jest-dom";
import Card from "./Card";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Cards from "./Cards";
import CardPage from "./CardPage";
import { cleanup } from "@testing-library/react";
import renderWithRouter from "../../tests/renderWithRouter";
import { cardMock } from "../../mocks/cardMock";

const card = cardMock;

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: { card },
      }),
  }),
) as unknown as typeof global.fetch;

describe("Renders the relevant card data", () => {
  beforeEach(async () => {
    renderWithRouter(<Card info={card} details={false} key={0} />);
  });
  afterEach(cleanup);

  it('renders card with image src and alt="image"', async () => {
    const img = screen.getAllByRole("img")[0];
    expect(img).toHaveAttribute(
      "src",
      expect.stringMatching(/\/robohash.org\/hicveldicta.png/),
    );
    expect(img).toHaveAttribute("alt", "image");
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
    renderWithRouter(<Card info={null} details={false} />);
    expect(screen.getByText(/card not found/)).toBeInTheDocument();
  });
});

describe("Renders the relevant card data", () => {
  it("clicking on a card opens a detailed and clicking triggers an additional API call", async () => {
    renderWithRouter(<Card info={card} details={false} key={0} />);
    const user = userEvent.setup();
    const detailsLink = screen.getAllByRole("link");
    user.click(detailsLink[0]);
    expect(screen.getByTestId("detail")).toBeInTheDocument();
    expect(fetch).toHaveBeenCalled();
  });
});

// const memoryRouter = createMemoryRouter(
//   [
//     {
//       path: '/',
//       element: <App />,
//       loader: vi.fn(),
//       children: [],
//     },
//   ],
//   { initialEntries: [badRoute] }
// );
// render(<RouterProvider router={memoryRouter} />);
// const { pathname } = memoryRouter.state.location;
// expect(pathname).equal(badRoute);
