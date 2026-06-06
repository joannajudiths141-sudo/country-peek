import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavouritesProvider } from "./context/FavouritesContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavouritesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </FavouritesProvider>
  </BrowserRouter>
);