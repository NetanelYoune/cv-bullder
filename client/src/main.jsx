import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { CvProvider } from "./context/CvContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CvProvider>
        <App />
      </CvProvider>
    </BrowserRouter>
  </React.StrictMode>
);