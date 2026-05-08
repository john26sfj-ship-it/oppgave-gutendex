import { usePageContext } from "../State/PageContext";
import { useState } from "react";
import styles from "../styles/NavBar.module.css";

export default function PageButtons() {
  const { page, setPage } = usePageContext();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={styles.pageButtons}>
      <button
        className={styles.searchElement}
        onClick={() => handlePageChange(page - 1)}
      >
        Previous page
      </button>
      <button
        className={styles.searchElement}
        onClick={() => handlePageChange(page + 1)}
      >
        Next page
      </button>
    </div>
  );
}
