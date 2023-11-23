import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

// const searchParamsPage = new URLSearchParams(window.location.search).get(
//   "page",
// );

const initialState = {
  page: "1",
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setLimit(state, action: PayloadAction<string>) {
      state.page = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.page,
      };
    },
  },
});

export const { setLimit } = pageSlice.actions;
export default pageSlice.reducer;
export const selectLimit = (state: string) => state.toString;
