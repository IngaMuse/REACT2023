import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./reducers/CardsSlice";

const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
