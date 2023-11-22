import React from "react";
import { screen, waitFor, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";
import userEvent from "@testing-library/user-event";
import CardPage from "./CardPage";
import { cleanup } from "@testing-library/react";
import renderWithRouter from "../../tests/renderWithRouter";
import { cardMock } from "../../mocks/cardMock";
import Main from "../Main";
import { createMemoryRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "../../store/store";

const store = setupStore();
const card = cardMock;

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
    const memoryRouter = createMemoryRouter(
      [
        {
          path: "/",
          element: <Main />,
          children: [
            {
              path: "/",
              element: <Outlet />,
              children: [
                {
                  path: "details/:id",
                  element: <CardPage />,
                },
              ],
            },
          ],
        },
      ],
      { initialEntries: ["/"] },
    );
    render(
      <Provider store={store}>
        {" "}
        <RouterProvider router={memoryRouter} />
      </Provider>,
    );
    await waitFor(() => {
      const user = userEvent.setup();
      const detailsLink = screen.getAllByRole("link");
      user.click(detailsLink[0]);
    });
    await waitFor(() => {
      expect(screen.getByTestId("detail")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/blood group/i)).toBeInTheDocument();
    });
  });
});
