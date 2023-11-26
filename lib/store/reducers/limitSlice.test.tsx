import reducer from "./LimitSlice";
import { it, expect } from "vitest";

it("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ limit: "30" });
});
