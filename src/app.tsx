import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./style.css";
import {
  createRoutesFromElements,
  RouterProvider,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { Layout } from "./components/Layout";
import CardPage from "./components/Cards/CardPage";
import ErrorPage from "./components/Error/ErrorPage";

const store = setupStore();
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="details/:id" element={<CardPage />} />
      </Route>
      <Route path="/*" element={<ErrorPage />} />
    </>,
  ),
);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

const root = document.getElementById("root");
if (root) ReactDOM.createRoot(root).render(<App />);

export default App;
