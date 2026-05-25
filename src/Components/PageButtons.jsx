import { usePageContext } from "../State/PageContext";
import { useBooksQuery } from "../Logic/bookQueries";
import styles from "../styles/Header.module.css";

const BOOKS_PER_PAGE = 32;

export default function PageButtons({ isFavoritesMode = false, totalFavorites = 0 }) {
  const { page, setPage } = usePageContext();
  const { data, loading } = useBooksQuery({ enabled: !isFavoritesMode });
  const totalBooks = isFavoritesMode ? totalFavorites : data?.count ?? 0;
  // Gutendex returns 32 books per page.
  const totalPages = Math.ceil(totalBooks / BOOKS_PER_PAGE);

  const handlePageChange = (newPage) => {
    // Prevent invalid page 0 when clicking Previous on page 1.
    setPage(Math.min(Math.max(1, newPage), totalPages || 1));
  };

  return (
    <div className={styles.pageControls}>
      <p>{isFavoritesMode ? "Favorite books" : "Books in search"}: {totalBooks}</p>
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
          disabled={
            loading || (isFavoritesMode ? page >= totalPages : !data?.next)
          }
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
