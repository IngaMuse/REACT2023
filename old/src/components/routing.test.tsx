import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe } from "vitest";
import renderWithRouter from "../tests/renderWithRouter";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Routing } from "./Routing";

describe("Routing App", () => {
  test("makes correct routing render app", async () => {
    const { container } = renderWithRouter(<Layout />);
    const mainClass = container.querySelector(".main");
    expect(mainClass).toBeInTheDocument();
  });

  test("tests for the 404 Page component", async () => {
    const badRoute = "/some/bad/route";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routing />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Page not exists/i)).toBeInTheDocument();
  });
});
