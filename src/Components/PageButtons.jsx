import { usePageContext } from "../State/PageContext";
import { useBooksQuery } from "../Logic/bookQueries";
import styles from "../styles/Header.module.css";

export default function PageButtons() {
  const { page, setPage } = usePageContext();
  const { data, loading } = useBooksQuery();

  const handlePageChange = (newPage) => {
    // Prevent the page number from going below 1.
    setPage(Math.max(1, newPage));
  };

  return (
    <div className={styles.pageButtons}>
      <button
        className={styles.searchElement}
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous page
      </button>
      <div>
        <p>Page: {page}</p>
      </div>
      <button
        className={styles.searchElement}
        disabled={loading || !data?.next}
        onClick={() => handlePageChange(page + 1)}
      >
        Next page
      </button>
    </div>
  );
}
