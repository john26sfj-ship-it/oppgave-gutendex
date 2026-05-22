import { useEffect } from "react";
import { useBooksQuery } from "../Logic/bookQueries";
import { useFavoritesContext } from "../State/FavoritesContext";
import styles from "../styles/HomePage.module.css";
import heartOutline from "../images/heart-outline.svg";
import heartFilled from "../images/heart-filled.svg";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { data, loading, isError, error } = useBooksQuery();
  const { favoriteBooks, showFavorites, toggleFavoriteBook } =
    useFavoritesContext();
  const favoriteBookIds = favoriteBooks.map((book) => book.id);
  // Show saved books when favorites mode is active.
  const books = showFavorites ? favoriteBooks : data?.results || [];

  useEffect(() => {
    console.log("HomePage books shown on screen:", books);
  }, [books]);

  if (!showFavorites && loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  // API errors should not block the local favorites view.
  if (!showFavorites && isError) {
    return <p className={styles.loading}>{error.message}</p>;
  }

  return (
    <div className={styles.layout}>
      {books.map((result) => (
        <div className={styles.card} key={result.id}>
          <img
            className={styles.heart}
            src={
              favoriteBookIds.includes(result.id) ? heartFilled : heartOutline
            }
            alt="Click to favorite this book"
            onClick={() => toggleFavoriteBook(result)}
          />
          <Link className={styles.imageLink} to={`/book/${result.id}`}>
            {result.formats["image/jpeg"] ? (
              <img
                className={styles.image}
                src={result.formats["image/jpeg"]}
                alt={result.title}
              />
            ) : (
              <div>
                <p className={styles.titleFallback}>{result.title}</p>
                <p className={styles.titleFallback}>No cover available</p>
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
