import { useEffect } from "react";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";
import { usePageContext } from "../State/PageContext";

const BOOKS_STALE_TIME = 1000 * 60 * 30;
const BOOKS_PER_PAGE = 32;

/**
 * Fetches one page of book results from Gutendex.
 *
 * The API accepts optional query parameters. We build them with
 * URLSearchParams so special characters in searches/categories are encoded
 * correctly.
 *
 * @param {{ category: string, search: string, page: number }} filters
 * @returns {Promise<object>} Gutendex list response: count, next, previous, results.
 */
async function fetchBooks({ category, search, page }) {
  // URLSearchParams avoids hand-building ?topic=...&search=... strings.
  const params = new URLSearchParams();

  if (category !== "") {
    // Gutendex uses "topic" for category/bookshelf-style filtering.
    params.set("topic", category);
  }

  if (search !== "") {
    params.set("search", search);
  }

  if (page >= 1) {
    params.set("page", page);
  }

  const query = params.toString();
  const response = await fetch(
    `https://gutendex.com/books/${query ? `?${query}` : ""}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}

/**
 * Fetches details for one book from Gutendex.
 *
 * This uses a different endpoint than the book list, so it gets a different
 * React Query cache key in useBookDetailsQuery.
 *
 * @param {string} bookId
 * @returns {Promise<object>} One full Gutendex book object.
 */
async function fetchBookDetails(bookId) {
  const response = await fetch(`https://gutendex.com/books/${bookId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  return response.json();
}

/**
 * Reads current filters from context and fetches the matching book page.
 *
 * React Query uses the queryKey to decide what data belongs together. Putting
 * category, search, and page in the key means each filter/page combination gets
 * its own cache entry.
 *
 * @param {{ enabled?: boolean }} [options]
 * @returns {ReturnType<typeof useQuery> & {
 *   loading: boolean,
 *   loadingUncachedPage: boolean,
 * }}
 */
export function useBooksQuery({ enabled = true } = {}) {
  const queryClient = useQueryClient();
  const { category } = useCategoriesContext();
  const { search } = useSearchContext();
  const { page } = usePageContext();
  const query = useQuery({
    // Include filters in the key so cached pages stay separate.
    queryKey: ["books", { category, search, page }],
    queryFn: () => fetchBooks({ category, search, page }),
    // enabled lets UI states such as local favorites opt out of API fetching.
    enabled,
    // Keep the previous page visible while an uncached page is being fetched.
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!enabled || !query.data?.count) {
      return;
    }

    const totalPages = Math.ceil(query.data.count / BOOKS_PER_PAGE);
    // After the visible page loads, warm up pages users are likely to visit.
    const pagesToPrefetch = [...new Set([page - 1, page + 1, 1, totalPages])];

    pagesToPrefetch.forEach((pageToPrefetch) => {
      if (pageToPrefetch < 1) {
        return;
      }

      if (pageToPrefetch > totalPages) {
        return;
      }

      if (pageToPrefetch === page) {
        return;
      }

      const queryKey = ["books", { category, search, page: pageToPrefetch }];
      const cachedPage = queryClient.getQueryData(queryKey);
      const isAlreadyFetching = queryClient.isFetching({
        queryKey,
        exact: true,
      });

      if (cachedPage || isAlreadyFetching) {
        return;
      }

      void queryClient.prefetchQuery({
        queryKey,
        queryFn: () =>
          fetchBooks({
            category,
            search,
            page: pageToPrefetch,
          }),
        staleTime: BOOKS_STALE_TIME,
      });
    });
  }, [category, enabled, page, query.data?.count, queryClient, search]);

  return {
    ...query,
    loading: query.isLoading,
    // isFetching also becomes true for background refreshes. This flag is only
    // for moments where the visible page itself is missing or still placeholder.
    loadingUncachedPage: query.isLoading || query.isPlaceholderData,
  };
}

/**
 * Fetches and caches details for one route param book id.
 *
 * @param {string | undefined} bookId
 * @returns {ReturnType<typeof useQuery> & { loading: boolean }}
 */
export function useBookDetailsQuery(bookId) {
  const query = useQuery({
    // Details are cached per id, separate from the paginated list query.
    queryKey: ["book", bookId],
    queryFn: () => fetchBookDetails(bookId),
    // Do not fetch until React Router has given us a book id.
    enabled: Boolean(bookId),
  });

  return {
    ...query,
    loading: query.isLoading,
  };
}
