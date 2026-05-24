import { createRoot } from "react-dom/client";
import "./index.css";
import { CategoriesContextProvider } from "./State/CategoriesContext.jsx";
import { SearchContextProvider } from "./State/SearchContext.jsx";
import { PageContextProvider } from "./State/PageContext.jsx";
import { FavoritesContextProvider } from "./State/FavoritesContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { persistOptions, queryClient } from "./Logic/queryClient.js";

createRoot(document.getElementById("root")).render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={persistOptions}
  >
    <PageContextProvider>
      <SearchContextProvider>
        <CategoriesContextProvider>
          <FavoritesContextProvider>
            <RouterProvider router={router} />
          </FavoritesContextProvider>
        </CategoriesContextProvider>
      </SearchContextProvider>
    </PageContextProvider>
  </PersistQueryClientProvider>,
);
