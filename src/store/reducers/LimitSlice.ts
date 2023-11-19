import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const searchParamsLimit = new URLSearchParams(window.location.search).get(
  "limit",
);

const initialState = {
  limit: searchParamsLimit || "30",
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
export default limitSlice.reducer;
