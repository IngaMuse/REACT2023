import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./reducers/CardsSlice";
import { cardsApi } from "../services/CardsService";

const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
  [cardsApi.reducerPath]: cardsApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
