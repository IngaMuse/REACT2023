import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import mockRouter from "next-router-mock";

describe("Pagination", () => {
  it("renders Pagination component", () => {
    render(<Pagination totalPages={1} page="1" />);
    const pages = screen.getByText("1");
    expect(pages).toBeInTheDocument();
  });

  it("renders Pagination component with passed pages amount", () => {
    render(<Pagination totalPages={10} page="1" />);
    const pages = screen.getByText("10");
    expect(pages).toBeInTheDocument();
  });

  it("switches to page on click", async () => {
    render(<Pagination totalPages={10} page="1" />);
    const pageClick = screen.queryAllByTestId("page")[1];
    const user = userEvent.setup();
    await user.click(pageClick);
    expect(mockRouter.asPath).toBe("/?page=2");
  });
});
