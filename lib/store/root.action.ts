import { cardsSlice } from "./reducers/CardsSlice";
import { cardSlice } from "./reducers/CardSlice";
import { searchSlice } from "./reducers/SearchSlice";
import { pageSlice } from "./reducers/PageSlice";
import { limitSlice } from "./reducers/LimitSlice";
import { loadingSlice } from "./reducers/LoadingSlice";
import { loadingDetailsSlice } from "./reducers/LoadingDetailsSlice";

export const rootAction = {
  ...cardsSlice.actions,
  ...cardSlice.actions,
  ...searchSlice.actions,
  ...pageSlice.actions,
  ...limitSlice.actions,
  ...loadingSlice.actions,
  ...loadingDetailsSlice.actions,
};
