import { useBooksQuery } from "../Logic/bookQueries";
import { useFavoritesContext } from "../State/FavoritesContext";
import { usePageContext } from "../State/PageContext";
import styles from "../styles/HomePage.module.css";
import heartOutline from "../images/heart-outline.svg";
import heartFilled from "../images/heart-filled.svg";
import { Link } from "react-router-dom";

const BOOKS_PER_PAGE = 32;

export default function HomePage() {
  const { favoriteBooks, showFavorites, toggleFavoriteBook } =
    useFavoritesContext();
  const { page } = usePageContext();
  const { data, loading, loadingUncachedPage, isError, error } = useBooksQuery({
    enabled: !showFavorites,
  });
  const favoriteBookIds = favoriteBooks.map((book) => book.id);
  const firstFavoriteIndex = (page - 1) * BOOKS_PER_PAGE;
  const visibleFavoriteBooks = favoriteBooks.slice(
    firstFavoriteIndex,
    firstFavoriteIndex + BOOKS_PER_PAGE,
  );
  // This is the exact list rendered below: either favorites or API results.
  const books = showFavorites ? visibleFavoriteBooks : data?.results || [];

  if (!showFavorites && loading) {
    return <p className="loading">Loading...</p>;
  }

  // API errors should not block the local favorites view.
  if (!showFavorites && isError) {
    return <p className="loading">{error.message}</p>;
  }

  return (
    <>
      {!showFavorites && loadingUncachedPage && (
        <p className="loading">Loading...</p>
      )}
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
              {/* Gutendex stores cover URLs by MIME type; use brackets because the key contains "/". */}
              {result.formats["image/jpeg"] ? (
                <img
                  className={styles.image}
                  src={result.formats["image/jpeg"]}
                  alt={result.title}
                  loading="lazy"
                />
              ) : (
                // Some Gutendex books have text files but no cover image.
                <div>
                  <p className={styles.titleFallback}>{result.title}</p>
                  <p className={styles.titleFallback}>No cover available</p>
                </div>
              )}
            </Link>
            <p className={styles.bookTitleTooltip}>{result.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
