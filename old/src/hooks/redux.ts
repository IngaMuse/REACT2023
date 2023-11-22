import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { rootAction } from "../store/root.action";

export const useActions = () => {
  const dispacth = useDispatch();
  return bindActionCreators(rootAction, dispacth);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
