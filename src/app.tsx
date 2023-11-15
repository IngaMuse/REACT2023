import React from "react";
import ReactDOM from "react-dom/client";
import { Routing } from "./components/Routing";
import "normalize.css";
import "./style.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const App = () => <Routing />;

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

export default App;
