import reducer from "./LoadingDetailsSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    isLoadingDetails: false,
  });
});
