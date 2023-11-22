import reducer from "./LimitSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ limit: "30" });
});
