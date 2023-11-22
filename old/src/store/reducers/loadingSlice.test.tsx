import reducer from "./LoadingSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ isLoading: false });
});
