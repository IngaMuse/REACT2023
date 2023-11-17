import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  limit: "30",
};

export const limitSlice = createSlice({
  name: "limit",
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<string>) {
      state.limit = action.payload;
    },
  },
});

export const { setLimit } = limitSlice.actions;
