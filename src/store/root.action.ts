import { cardsSlice } from "./reducers/CardsSlice";
import { searchSlice } from "./reducers/SearchSlice";
import { limitSlice } from "./reducers/LimitSlice";
import { loadingSlice } from "./reducers/LoadingSlice";

export const rootAction = {
  ...cardsSlice.actions,
  ...searchSlice.actions,
  ...limitSlice.actions,
  ...loadingSlice.actions,
};
