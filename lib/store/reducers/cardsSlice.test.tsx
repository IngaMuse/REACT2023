import reducer from "./CardsSlice";
import { it, expect } from "vitest";

it("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    totalPages: 0,
    cards: [],
  });
});
