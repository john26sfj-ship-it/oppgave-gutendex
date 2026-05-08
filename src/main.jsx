import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiContextProvider } from "./State/ApiContext.jsx";
import { CategoriesContextProvider } from "./State/CategoriesContext.jsx";
import { SearchContextProvider } from "./State/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <SearchContextProvider>
    <CategoriesContextProvider>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </CategoriesContextProvider>
  </SearchContextProvider>,
  //</StrictMode>
);
