import { useParams } from "react-router-dom";
import { useBookDetailsQuery } from "../Logic/bookQueries";
import { useFavoritesContext } from "../State/FavoritesContext";
import styles from "../styles/BookDetails.module.css";
import heartOutline from "../images/heart-outline.svg";
import heartFilled from "../images/heart-filled.svg";

export default function BookDetails() {
  const { bookId } = useParams();
  const { data: book, loading, isError, error } = useBookDetailsQuery(bookId);
  const { favoriteBooks, toggleFavoriteBook } = useFavoritesContext();
  const title = book?.title;
  const authors = book?.authors || [];
  const languages = book?.languages || [];
  const summaries = book?.summaries || [];
  const download_count = book?.download_count || [];
  const categories = book?.bookshelves || [];
  const image = book?.formats?.["image/jpeg"];
  const applicationFormats = Object.entries(book?.formats || {}).filter(
    ([format]) => format.startsWith("application/"),
  );
  const isFavorite = favoriteBooks.some(
    (favoriteBook) => favoriteBook.id === book?.id,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.glassBackground}>
      <h1>{title}</h1>
      <div className={styles.card}>
        <img
          className={styles.heart}
          src={isFavorite ? heartFilled : heartOutline}
          alt="Click to favorite this book"
          onClick={() => toggleFavoriteBook(book)}
        />
        {image && <img className={styles.image} src={image} alt={title} />}
      </div>
      {authors.map(({ name, birth_year, death_year }) => (
        <div key={`${name}-${birth_year}-${death_year}`}>
          <p>Author: {name}</p>
          <p>Birth year: {birth_year}</p>
          <p>Death year: {death_year}</p>
        </div>
      ))}
      <p>Languages: {languages.join(", ")}</p>
      <p>Downloaded: {download_count} times</p>
      <p className={styles.summaries}>Summaries: {summaries.join(", ")}</p>
      {categories.map((category) => (
        <p key={category}>{category}</p>
      ))}
      <h3>Download links:</h3>
      {applicationFormats.map(([format, url]) => (
        <a
          className={styles.formatLink}
          href={url}
          key={format}
          rel="noreferrer"
          target="_blank"
        >
          {url}
        </a>
      ))}
    </div>
  );
}
