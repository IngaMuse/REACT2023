import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ICard, CardsProps } from "../../../types/card.types";
import { HYDRATE } from "next-redux-wrapper";

const initialState: CardsProps = {
  totalPages: 0,
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cards,
        ...action.payload.totalPages,
      };
    },
  },
});

export const { setCards } = cardsSlice.actions;
export const { setTotalPages } = cardsSlice.actions;
export const selectCards = (state: CardsProps) => state.cards;
export default cardsSlice.reducer;
