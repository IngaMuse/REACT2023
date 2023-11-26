import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Error from "./_error";

describe("Test for the 404 Page component", () => {
  it("test for the 404 Page component", async () => {
    render(<Error />);
    expect(screen.getByText(/Page not exists/i)).toBeInTheDocument();
  });
});
