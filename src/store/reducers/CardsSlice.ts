import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ICard, CardsProps } from "../../types/card.types";

const initialState: CardsProps = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<ICard[]>) {
      state.cards = action.payload;
    },
  },
});
