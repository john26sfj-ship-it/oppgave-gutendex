import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiContextProvider } from "./State/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <ApiContextProvider>
    <App />
  </ApiContextProvider>,
  //</StrictMode>,
);
