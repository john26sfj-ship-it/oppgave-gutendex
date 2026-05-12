import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApiContextProvider } from "./State/ApiContext.jsx";
import { CategoriesContextProvider } from "./State/CategoriesContext.jsx";
import { SearchContextProvider } from "./State/SearchContext.jsx";
import { PageContextProvider } from "./State/PageContext.jsx";
import { FavoritesContextProvider } from "./State/FavoritesContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <PageContextProvider>
    <SearchContextProvider>
      <CategoriesContextProvider>
        <FavoritesContextProvider>
          <ApiContextProvider>
            <RouterProvider router={router} />
          </ApiContextProvider>
        </FavoritesContextProvider>
      </CategoriesContextProvider>
    </SearchContextProvider>
  </PageContextProvider>,
  //</StrictMode>
);
