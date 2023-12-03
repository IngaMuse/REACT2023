import { createSlice } from "@reduxjs/toolkit";
import { ValidationError } from "yup";

const initialState = {
  name: "",
  age: "",
  email: "",
  password: "",
  passwordConfirm: "",
  gender: "",
  accept: "",
  image: "",
  country: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setValidationError(state, action) {
      const errors: ValidationError[] = action.payload;
      errors.forEach((error) => {
        const path = error.path?.split(".")[0];
        state[path as keyof typeof initialState] = error.message;
      });
    },
    removeValidationError(state) {
      for (const key in state) {
        state[key as keyof typeof initialState] = "";
      }
    },
  },
});

export const { setValidationError, removeValidationError } = errorSlice.actions;
export default errorSlice.reducer;
