import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICard } from "../../types/form.types";

export interface IForm {
  cards: ICard[];
  createdForm: boolean;
}

const initialState: IForm = {
  cards: [],
  createdForm: false,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ICard>) {
      state.cards.push(action.payload);
    },
    setCreatedForm(state, action) {
      state.createdForm = action.payload;
    },
  },
});

export const { addCard } = cardsSlice.actions;
export const { setCreatedForm } = cardsSlice.actions;
export default cardsSlice.reducer;
