import reducer from "./CardSlice";
import { it, expect } from "vitest";

it("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ card: null });
});
