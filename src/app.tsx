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
import ErrorPage from "./components/Error/ErrorPage";
import Main from "./components/Main";
import FormOld from "./components/Form/FormOld";
import FormNew from "./components/FormNew/FormNew";
import Root from "./components/Root/Root";

const store = setupStore();
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Main />} />
        <Route path="/form-old" element={<FormOld />} />
        <Route path="/form-new" element={<FormNew />} />
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
