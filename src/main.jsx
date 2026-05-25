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

// Development-only helper: records Gutendex fetches on <html> data attributes
// so we can inspect API calls from the browser without opening DevTools.
if (import.meta.env.DEV && !window.__gutendexFetchMonitorInstalled) {
  const originalFetch = window.fetch;

  window.__gutendexFetchMonitorInstalled = true;
  window.__gutendexRequests = [];

  window.fetch = async (...args) => {
    const url = String(args[0]?.url ?? args[0]);

    if (url.includes("gutendex.com/books")) {
      window.__gutendexRequests.push({
        url,
        time: new Date().toISOString(),
      });

      document.documentElement.dataset.gutendexRequests = String(
        window.__gutendexRequests.length,
      );
      document.documentElement.dataset.gutendexLastRequest = url;
      document.documentElement.dataset.gutendexRequestUrls = JSON.stringify(
        window.__gutendexRequests.map((request) => request.url),
      );
    }

    return originalFetch(...args);
  };
}

createRoot(document.getElementById("root")).render(
  // The providers make shared state available to every route/component below.
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
