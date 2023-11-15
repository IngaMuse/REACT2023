import { cardSlice } from "./reducers/CardsSlice";

export const rootAction = {
  ...cardSlice.actions,
};
