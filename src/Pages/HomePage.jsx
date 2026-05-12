import { useApiFetch } from "../Logic/ApiFetch";
import { useFavoritesContext } from "../State/FavoritesContext";
import styles from "../styles/HomePage.module.css";
import heartOutline from "../images/heart-outline.svg";
import heartFilled from "../images/heart-filled.svg";

export default function HomePage() {
  const { data, loading } = useApiFetch();
  const { favoriteBooks, showFavorites, toggleFavoriteBook } =
    useFavoritesContext();
  console.log("RENDER", data);
  const favoriteBookIds = favoriteBooks.map((book) => book.id);
  const books = showFavorites ? favoriteBooks : data.results || [];

  return (
    <div>
      {!showFavorites && loading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.layout}>
        {books.map((result) => (
          <div className={styles.card} key={result.id}>
            <img
              className={styles.heart}
              src={favoriteBookIds.includes(result.id) ? heartFilled : heartOutline}
              alt="Click to favorite this book"
              onClick={() => toggleFavoriteBook(result)}
            />
            <img
              className={styles.image}
              src={result.formats["image/jpeg"]}
              alt={result.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
