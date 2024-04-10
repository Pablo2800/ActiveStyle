import React from "react";
import { createRoot } from "react-dom/client"; // Importa createRoot desde react-dom en lugar de ReactDOM
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // Utiliza createRoot().render() en lugar de ReactDOM.render()
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
