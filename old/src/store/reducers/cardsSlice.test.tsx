import reducer from "./CardsSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ cards: [] });
});
