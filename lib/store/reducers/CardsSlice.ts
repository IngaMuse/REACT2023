import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { ICard, CardsProps } from "../../../types/card.types";
import { HYDRATE } from "next-redux-wrapper";

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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cards,
      };
    },
  },

  // extraReducers: (builder) => {
  //   builder
  //     .addCase(HYDRATE, (state, action) => {
  //       return {
  //               ...state.cards,
  //               ...action.payload.cards,
  //             };
  //     })
  // }
});

export const { setCards } = cardsSlice.actions;
export const selectCards = (state: CardsProps) => state.cards;
export default cardsSlice.reducer;
