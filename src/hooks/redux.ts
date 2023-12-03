import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { bindActionCreators } from "@reduxjs/toolkit";
import { rootAction } from "../store/root.action";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(rootAction, dispatch);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
