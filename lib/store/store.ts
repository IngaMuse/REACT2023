import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./reducers/CardsSlice";
import { cardSlice } from "./reducers/CardSlice";
import { cardsAPI } from "../services/CardsService";
import { searchSlice } from "./reducers/SearchSlice";
import { pageSlice } from "./reducers/PageSlice";
import { limitSlice } from "./reducers/LimitSlice";
import { loadingSlice } from "./reducers/LoadingSlice";
import { loadingDetailsSlice } from "./reducers/LoadingDetailsSlice";
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
  card: cardSlice.reducer,
  [cardsAPI.reducerPath]: cardsAPI.reducer,
  search: searchSlice.reducer,
  page: pageSlice.reducer,
  limit: limitSlice.reducer,
  isLoading: loadingSlice.reducer,
  isLoadingDetails: loadingDetailsSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsAPI.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
