import reducer from "./LoadingDetailsSlice";
import { it, expect } from "vitest";

it("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    isLoadingDetails: false,
  });
});
