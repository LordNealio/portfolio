import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ModeProvider } from "./lib/mode";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/supreme.css";
import "./styles/study.css";
import "./styles/cipher.css";
import "./styles/fashion.css";
import "./styles/patron.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModeProvider>
  </React.StrictMode>
);
