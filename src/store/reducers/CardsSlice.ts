import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICards, ICard } from "../../types/form.types";

const initialState: ICards = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ICard>) {
      state.cards.push(action.payload);
    },
  },
});

export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
