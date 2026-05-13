import { useQuery } from "@tanstack/react-query";
import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";
import { usePageContext } from "../State/PageContext";

async function fetchBooks({ category, search, page }) {
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

async function fetchBookDetails(bookId) {
  const response = await fetch(`https://gutendex.com/books/${bookId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }

  return response.json();
}

export function useApiFetch() {
  const { category } = useCategoriesContext();
  const { search } = useSearchContext();
  const { page } = usePageContext();
  const query = useQuery({
    queryKey: ["books", { category, search, page }],
    queryFn: () => fetchBooks({ category, search, page }),
  });

  return {
    ...query,
    loading: query.isLoading,
  };
}

export function useBookDetailsFetch(bookId) {
  const query = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookDetails(bookId),
    enabled: Boolean(bookId),
  });

  return {
    ...query,
    loading: query.isLoading,
  };
}
