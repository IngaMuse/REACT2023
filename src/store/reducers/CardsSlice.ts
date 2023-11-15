import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ICard, CardsProps } from "../../types/card.types";

const initialState: CardsProps = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // addCard(state, action: PayloadAction<ICard>) {
    //   state.cards.push(action.payload);
    // },
  },
});
