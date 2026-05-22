import { useRef } from "react";
import { useSearchContext } from "../State/SearchContext";
import styles from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../State/PageContext";
import { useMenuContext } from "../State/MenuContext";

export default function SearchField() {
  const { search, setSearch } = useSearchContext();
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { setPage } = usePageContext();
  const { toggleMenu } = useMenuContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    // New searches should always begin on page 1.
    setPage(1);
    setSearch(searchInputRef.current.value);
    navigate("/");
    // Close the mobile menu after the user submits a search.
    toggleMenu();
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        className={styles.searchElement}
        type="text"
        placeholder="Search..."
        defaultValue={search}
        // Remount the input when reset clears the search context.
        key={search}
        ref={searchInputRef}
      />
    </form>
  );
}
