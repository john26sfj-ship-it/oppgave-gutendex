import { useCategoriesContext } from "../State/CategoriesContext";
import { useSearchContext } from "../State/SearchContext";
import styles from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../State/MenuContext";
import { usePageContext } from "../State/PageContext";

export default function ResetButton() {
  const { setCategory } = useCategoriesContext();
  const { setSearch } = useSearchContext();
  const navigate = useNavigate();
  const { toggleMenu } = useMenuContext();
  const { setPage } = usePageContext();

  const handleReset = () => {
    // Clearing both filters gives the default Gutendex book list.
    setCategory("");
    setSearch("");
    setPage(1);
    navigate("/");
    // Reset is a menu action on small screens, so close the menu after it runs.
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
