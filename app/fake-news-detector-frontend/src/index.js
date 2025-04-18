import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/main.css";
import "react-toastify/dist/ReactToastify.css";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { MyProvider } from "./context";
import { ApiProvider } from "./apiContext";

import './index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <MyProvider>
        <App />
      </MyProvider>
    </ApiProvider>
  </React.StrictMode>
);
