import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";
import styles from "../styles/NavBar.module.css";

export default function ResetButton() {
  const { setCategory } = useCategoriesContext();
  const { setSearch } = useSearchContext();

  const handleReset = () => {
    setCategory("");
    setSearch("");
  };

  return (
    <button
      className={styles.searchElement}
      type="button"
      onClick={handleReset}
    >
      Reset
    </button>
  );
}
