import { usePageContext } from "../State/PageContext";
import { useBooksQuery } from "../Logic/bookQueries";
import styles from "../styles/Header.module.css";

export default function PageButtons() {
  const { page, setPage } = usePageContext();
  const { data, loading } = useBooksQuery();
  const totalBooks = data?.count ?? 0;
  // Gutendex returns 32 books per page.
  const totalPages = Math.ceil(totalBooks / 32);

  const handlePageChange = (newPage) => {
    // Prevent invalid page 0 when clicking Previous on page 1.
    setPage(Math.max(1, newPage));
  };

  return (
    <div className={styles.pageControls}>
      <p>Books in search: {totalBooks}</p>
      <div className={styles.pageButtons}>
        <button
          className={styles.searchElement}
          type="button"
          disabled={page === 1}
          onClick={() => handlePageChange(1)}
        >
          First
        </button>
        <button
          className={styles.searchElement}
          type="button"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <div>
          <p>
            Page: {page} / {totalPages || "..."}
          </p>
        </div>
        <button
          className={styles.searchElement}
          type="button"
          // Gutendex tells us whether another page exists.
          disabled={loading || !data?.next}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
        <button
          className={styles.searchElement}
          type="button"
          disabled={loading || page === totalPages}
          onClick={() => handlePageChange(totalPages || 1)}
        >
          Last
        </button>
      </div>
    </div>
  );
}
