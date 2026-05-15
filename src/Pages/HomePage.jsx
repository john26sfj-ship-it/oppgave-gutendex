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
  const books = showFavorites ? favoriteBooks : data?.results || [];

  useEffect(() => {
    if (data) {
      console.log("HomePage full API result:", data);
    }
  }, [data]);

  if (!showFavorites && loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

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
            <img
              className={styles.image}
              src={result.formats["image/jpeg"]}
              alt={result.title}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
