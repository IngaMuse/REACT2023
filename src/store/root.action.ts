import { cardsSlice } from "./reducers/CardsSlice";
import { errorSlice } from "./reducers/ErrorSlice";
import { countrySlice } from "./reducers/CountrySlice";

export const rootAction = {
  ...cardsSlice.actions,
  ...errorSlice.actions,
  ...countrySlice.actions,
};
