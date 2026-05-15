import { useEffect, useState } from "react";
import { useSearchContext } from "../State/SearchContext";
import styles from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import { usePageContext } from "../State/PageContext";

export default function SearchField() {
  const { search, setSearch } = useSearchContext();
  const [searchInput, setSearchInput] = useState(search);
  const navigate = useNavigate();
  const { setPage } = usePageContext();

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput);
    navigate("/");
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
