import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { CvProvider } from "./context/CvContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CvProvider>
        <App />
      </CvProvider>
    </BrowserRouter>
  </StrictMode>
);