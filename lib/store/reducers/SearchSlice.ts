import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { SearchState } from "../../../types/search.types";
import { HYDRATE } from "next-redux-wrapper";

const initialState: SearchState = {
  search: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
export const selectSearch = (state: SearchState) => state.search;
