import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormValues, ICards } from "../../types/form.types";

const initialState: ICards = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<FormValues[]>) {
      state.cards = action.payload;
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
