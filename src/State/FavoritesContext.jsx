import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();
const FAVORITES_STORAGE_KEY = "favoriteBooks";

export function FavoritesContextProvider({ children }) {
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const storedFavoriteBooks = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!storedFavoriteBooks) {
      return [];
    }

    try {
      return JSON.parse(storedFavoriteBooks);
    } catch {
      return [];
    }
  });
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  const toggleFavoriteBook = (book) => {
    setFavoriteBooks((currentFavoriteBooks) =>
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

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesContextProvider",
    );
  }

  return context;
}
