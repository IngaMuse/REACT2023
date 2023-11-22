import React from "react";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";

const store = setupStore();

export default (Component: JSX.Element, initialEntries = "/") => {
  const route = {
    path: initialEntries,
    element: Component,
  };
  const config = {
    initialEntries: [initialEntries],
  };

  const router = createMemoryRouter([route], config);

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};
