import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import WebFont from "webfontloader";

// redux
import store from "./store/index";

// add react-toastify
import "react-toastify/dist/ReactToastify.css";

// axios
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8181/api";
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenKey");
  if (token) {
    // ig token saved in localStorage
    config.headers["token"] = token;
  }
  config.headers["Content-Type"] = "application/json";
  return config;
});

WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700", "sans-serif"],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
