import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import createAppStore from "./store";
import { Provider } from "react-redux";

const store = createAppStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
