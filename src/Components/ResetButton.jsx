import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";
import styles from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../State/MenuContext";

export default function ResetButton() {
  const { setCategory } = useCategoriesContext();
  const { setSearch } = useSearchContext();
  const navigate = useNavigate();
  const { toggleMenu } = useMenuContext();

  const handleReset = () => {
    setCategory("");
    setSearch("");
    navigate("/");
    toggleMenu();
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
