import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const PERSISTED_QUERY_CACHE_KEY = "gutendex:query-cache";
const ONE_DAY = 1000 * 60 * 60 * 24;
const THIRTY_MINUTES = 1000 * 60 * 30;

function isBooksQuery(query) {
  return query.queryKey[0] === "books";
}

function getPersistedBookResults(persistedClient) {
  return persistedClient?.clientState?.queries?.map((query) => ({
    queryHash: query.queryHash,
    results: query.state.data?.results,
  }));
}

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

export const persistOptions = {
  persister: queryPersister,
  maxAge: ONE_DAY,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) =>
      query.state.status === "success" && isBooksQuery(query),
  },
};
