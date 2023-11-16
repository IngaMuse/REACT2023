import { cardsSlice } from "./reducers/CardsSlice";
import { searchSlice } from "./reducers/SearchSlice";

export const rootAction = {
  ...cardsSlice.actions,
  ...searchSlice.actions,
};
