import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ICard } from "../../../types/card.types";
import { HYDRATE } from "next-redux-wrapper";

interface CardState {
  card: ICard | null;
}

const initialState: CardState = {
  card: null,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<ICard>) {
      state.card = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.card,
      };
    },
  },
});

export const { setCard } = cardSlice.actions;
export const selectCard = (state: CardState) => state.card;
export default cardSlice.reducer;
