import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { SearchState } from "../../types/search.types";

const initialState: SearchState = {
  search: localStorage.getItem("search") || "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
