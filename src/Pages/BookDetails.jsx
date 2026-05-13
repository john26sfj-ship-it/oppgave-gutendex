import { useParams } from "react-router-dom";
import { useBookDetailsFetch } from "../Logic/ApiFetch";
import styles from "../styles/BookDetails.module.css";

export default function BookDetails() {
  const { bookId } = useParams();
  const { data: book, loading, isError, error } = useBookDetailsFetch(bookId);
  const title = book?.title;
  const authors = book?.authors || [];
  const summaries = book?.summaries || [];

  console.log("bookId", bookId);
  console.log("title", title);
  console.log("authors", authors);
  console.log("summaries", summaries);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles.glassBackground}>
      <h1>{title}</h1>
      {authors.map(({ name, birth_year, death_year }) => (
        <div key={`${name}-${birth_year}-${death_year}`}>
          <p>Author: {name}</p>
          <p>Birth year: {birth_year}</p>
          <p>Death year: {death_year}</p>
        </div>
      ))}
      <p>Summaries: {summaries.join(", ")}</p>
    </div>
  );
}
