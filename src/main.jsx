import { createRoot } from "react-dom/client";
import "./index.css";
import { CategoriesContextProvider } from "./State/CategoriesContext.jsx";
import { SearchContextProvider } from "./State/SearchContext.jsx";
import { PageContextProvider } from "./State/PageContext.jsx";
import { FavoritesContextProvider } from "./State/FavoritesContext.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Book data changes rarely, so avoid refetching while moving around.
      staleTime: 1000 * 60 * 5,
      // Keep recent searches/details cached for quick back-and-forth browsing.
      gcTime: 1000 * 60 * 30,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <PageContextProvider>
      <SearchContextProvider>
        <CategoriesContextProvider>
          <FavoritesContextProvider>
            <RouterProvider router={router} />
          </FavoritesContextProvider>
        </CategoriesContextProvider>
      </SearchContextProvider>
    </PageContextProvider>
  </QueryClientProvider>,
);
