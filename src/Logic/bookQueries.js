import { useQuery } from "@tanstack/react-query";
import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";
import { usePageContext } from "../State/PageContext";

/**
 * Fetches a paginated list of books from Gutendex.
 * @param {{ category: string, search: string, page: number }} filters
 * @returns {Promise<object>}
 */
async function fetchBooks({ category, search, page }) {
  // URLSearchParams builds the query string safely.
  const params = new URLSearchParams();

  if (category !== "") {
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
    `https://gutendex.com/books${query ? `?${query}` : ""}`,
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

export function useBooksQuery() {
  const { category } = useCategoriesContext();
  const { search } = useSearchContext();
  const { page } = usePageContext();
  const query = useQuery({
    // This key changes when filters or page changes, so TanStack refetches.
    queryKey: ["books", { category, search, page }],
    queryFn: () => fetchBooks({ category, search, page }),
  });

  return {
    ...query,
    loading: query.isLoading,
  };
}

export function useBookDetailsQuery(bookId) {
  const query = useQuery({
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
