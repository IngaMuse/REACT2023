import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoadingDetails: false,
};

export const loadingDetailsSlice = createSlice({
  name: "loadingDetails",
  initialState,
  reducers: {
    setLoadingDetails(state, action: PayloadAction<boolean>) {
      state.isLoadingDetails = action.payload;
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

export const { setLoadingDetails } = loadingDetailsSlice.actions;
export default loadingDetailsSlice.reducer;
export const selectLoadingDetails = (state: boolean) => state;
