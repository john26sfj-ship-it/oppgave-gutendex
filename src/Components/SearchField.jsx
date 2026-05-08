import { useEffect, useState } from "react";
import { useSearchContext } from "../State/SearchContext";
import styles from "../styles/NavBar.module.css";

export default function SearchField() {
  const { search, setSearch } = useSearchContext();
  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(searchInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.searchElement}
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleChange}
      />
    </form>
  );
}
