import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();
const FAVORITES_STORAGE_KEY = "favoriteBooks";

/**
 * Stores favorite books and whether the UI is currently showing favorites.
 *
 * Favorites live in React state while the app is running and are mirrored to
 * localStorage so they survive a page refresh.
 *
 * @param {{ children: import("react").ReactNode }} props
 */
export function FavoritesContextProvider({ children }) {
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    // Load saved favorites once when the app starts.
    const storedFavoriteBooks = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedFavoriteBooks) {
      return [];
    }

    try {
      return JSON.parse(storedFavoriteBooks);
    } catch {
      // Bad saved JSON should not break the app; just start fresh.
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // Keep localStorage updated whenever favorites change.
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  /**
   * Adds a book if it is missing, or removes it if it is already a favorite.
   *
   * @param {{ id: number }} book
   */
  const toggleFavoriteBook = (book) => {
    setFavoriteBooks((currentFavoriteBooks) =>
      // Store full book objects so favorites can render without refetching.
      currentFavoriteBooks.some((favoriteBook) => favoriteBook.id === book.id)
        ? currentFavoriteBooks.filter((favoriteBook) => favoriteBook.id !== book.id)
        : [...currentFavoriteBooks, book],
    );
  };

  const values = {
    favoriteBooks,
    showFavorites,
    setShowFavorites,
    toggleFavoriteBook,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Reads favorite books and favorite-view controls.
 *
 * @returns {{
 *   favoriteBooks: Array<object>,
 *   showFavorites: boolean,
 *   setShowFavorites: import("react").Dispatch<import("react").SetStateAction<boolean>>,
 *   toggleFavoriteBook: (book: { id: number }) => void,
 * }}
 */
export function useFavoritesContext() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesContextProvider",
    );
  }

  return context;
}
