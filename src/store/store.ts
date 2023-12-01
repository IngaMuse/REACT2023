import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cardsSlice } from "./reducers/CardsSlice";
import { errorSlice } from "./reducers/ErrorSlice";
import { countrySlice } from "./reducers/CountrySlice";

const rootReducer = combineReducers({
  cards: cardsSlice.reducer,
  error: errorSlice.reducer,
  country: countrySlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
