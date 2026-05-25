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
 * Fetches a paginated list of books from Gutendex.
 * @param {{ category: string, search: string, page: number }} filters
 * @returns {Promise<object>}
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
 * @param {string} bookId
 * @returns {Promise<object>}
 */
async function fetchBookDetails(bookId) {
  const response = await fetch(`https://gutendex.com/books/${bookId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  return response.json();
}

export function useBooksQuery({ enabled = true } = {}) {
  const queryClient = useQueryClient();
  const { category } = useCategoriesContext();
  const { search } = useSearchContext();
  const { page } = usePageContext();
  const query = useQuery({
    // Include filters in the key so cached pages stay separate.
    queryKey: ["books", { category, search, page }],
    queryFn: () => fetchBooks({ category, search, page }),
    enabled,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!enabled || !query.data?.count) {
      return;
    }

    const totalPages = Math.ceil(query.data.count / BOOKS_PER_PAGE);
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
    loadingUncachedPage: query.isLoading || query.isPlaceholderData,
  };
}

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
