import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./reducers/CardsSlice";
import { cardsAPI } from "../services/CardsService";
import { searchSlice } from "./reducers/SearchSlice";
import { limitSlice } from "./reducers/LimitSlice";
import { loadingSlice } from "./reducers/LoadingSlice";
import { loadingDetailsSlice } from "./reducers/LoadingDetailsSlice";

const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
  search: searchSlice.reducer,
  limit: limitSlice.reducer,
  isLoading: loadingSlice.reducer,
  isLoadingDetails: loadingDetailsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
