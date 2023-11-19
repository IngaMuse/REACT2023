import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
});

export const { setLoadingDetails } = loadingDetailsSlice.actions;
export default loadingDetailsSlice.reducer;
