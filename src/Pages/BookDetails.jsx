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
  const downloadCount = book?.download_count || 0;
  const categories = book?.bookshelves || [];
  // Same Gutendex MIME-key pattern as the home page cover image.
  const image = book?.formats?.["image/jpeg"];
  // Hide text/html here so this section stays focused on download files.
  const applicationFormats = Object.entries(book?.formats || {}).filter(
    ([format]) => format.startsWith("application/"),
  );
  // Decide which heart icon to show for this book.
  const isFavorite = favoriteBooks.some(
    (favoriteBook) => favoriteBook.id === book?.id,
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  // fetchBookDetails throws; TanStack exposes that error through isError/error.
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
          <p className={styles.detailText}>Author: {name}</p>
          <p className={styles.detailText}>Birth year: {birth_year}</p>
          <p className={styles.detailText}>Death year: {death_year}</p>
        </div>
      ))}
      <p className={styles.detailText}>Languages: {languages.join(", ")}</p>
      <p className={styles.detailText}>Downloaded: {downloadCount} times</p>
      <p className={styles.summaries}>Summaries: {summaries.join(", ")}</p>
      {categories.map((category) => (
        <p className={styles.detailText} key={category}>
          {category}
        </p>
      ))}
      <h3 className={styles.downloadHeading}>Download links:</h3>
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
