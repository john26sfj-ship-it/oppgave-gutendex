import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const PERSISTED_QUERY_CACHE_KEY = "gutendex:query-cache";
const ONE_DAY = 1000 * 60 * 60 * 24;
const THIRTY_MINUTES = 1000 * 60 * 30;

/**
 * Checks whether a persisted React Query entry belongs to the book list.
 *
 * @param {{ queryKey: unknown[] }} query
 * @returns {boolean}
 */
function isBooksQuery(query) {
  return query.queryKey[0] === "books";
}

/**
 * Pulls out only the book results from a persisted query cache snapshot.
 *
 * This is used to compare the old and new persisted data. If the visible book
 * results did not change, we skip writing to localStorage again.
 *
 * @param {object | undefined} persistedClient
 * @returns {Array<{ queryHash: string, results: unknown[] | undefined }> | undefined}
 */
function getPersistedBookResults(persistedClient) {
  return persistedClient?.clientState?.queries?.map((query) => ({
    queryHash: query.queryHash,
    results: query.state.data?.results,
  }));
}

/**
 * Safely parses JSON from localStorage.
 *
 * localStorage can contain old or manually-edited values, so parsing must fail
 * softly instead of crashing the app.
 *
 * @param {string | null} value
 * @returns {object | undefined}
 */
function parsePersistedClient(value) {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

/**
 * Creates the storage adapter used by TanStack Query persistence.
 *
 * The adapter has the same getItem/setItem/removeItem shape as localStorage,
 * but setItem avoids duplicate writes when the book results have not changed.
 *
 * @returns {{
 *   getItem: (key: string) => string | null,
 *   removeItem: (key: string) => void,
 *   setItem: (key: string, value: string) => void,
 * } | undefined}
 */
function createBooksPageStorage() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return {
    getItem: (key) => window.localStorage.getItem(key),
    removeItem: (key) => window.localStorage.removeItem(key),
    setItem: (key, value) => {
      const previousClient = parsePersistedClient(
        window.localStorage.getItem(key),
      );
      const nextClient = parsePersistedClient(value);

      if (
        JSON.stringify(getPersistedBookResults(previousClient)) ===
        JSON.stringify(getPersistedBookResults(nextClient))
      ) {
        return;
      }

      window.localStorage.setItem(key, value);
    },
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Book data changes rarely, so avoid refetching while moving around.
      staleTime: THIRTY_MINUTES,
      // Keep recent searches/details cached for quick back-and-forth browsing.
      gcTime: THIRTY_MINUTES,
    },
  },
});

export const queryPersister = createSyncStoragePersister({
  key: PERSISTED_QUERY_CACHE_KEY,
  storage: createBooksPageStorage(),
});

// Persist only successful book list queries. Details stay in memory cache only.
export const persistOptions = {
  persister: queryPersister,
  maxAge: ONE_DAY,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) =>
      query.state.status === "success" && isBooksQuery(query),
  },
};
