import reducer from "./SearchSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ search: "" });
});
