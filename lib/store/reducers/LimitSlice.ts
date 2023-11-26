import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// const searchParamsLimit = new URLSearchParams(window.location.search).get(
//   "limit",
// );

const initialState = {
  // limit: searchParamsLimit || "30",
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
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.limit,
      };
    },
  },
});

export const { setLimit } = limitSlice.actions;
export default limitSlice.reducer;
export const selectLimit = (state: string) => state.toString;
