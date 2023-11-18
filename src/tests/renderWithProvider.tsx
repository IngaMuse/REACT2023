import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";

const store = setupStore();

export default (Component: JSX.Element) => {
  return render(<Provider store={store}>{Component}</Provider>);
};
