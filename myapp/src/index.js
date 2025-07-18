import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./Context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AppContextProvider>
);
reportWebVitals();
