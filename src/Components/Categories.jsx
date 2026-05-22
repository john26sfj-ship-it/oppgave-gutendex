import { useCategoriesContext } from "../State/CategoriesContext";
import styles from "../styles/Header.module.css";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "../State/MenuContext";
import { usePageContext } from "../State/PageContext";

export default function Categories() {
  const { category, setCategory } = useCategoriesContext();
  const navigate = useNavigate();
  const { toggleMenu } = useMenuContext();
  const { setPage } = usePageContext();

  const handleChange = (event) => {
    // Empty string means "no category" and keeps the API topic param out.
    setCategory(event.target.value);
    setPage(1);
    navigate("/");
    // Category changes should leave the user back at the book grid.
    toggleMenu();
  };

  return (
    <select
      className={styles.searchElement}
      value={category}
      onChange={handleChange}
      id="categories-pulldown"
    >
      <option value="">No Category</option>
      <option value="Fiction">Fiction</option>
      <option value="Mystery">Mystery</option>
      <option value="Thriller">Thriller</option>
      <option value="Romance">Romance</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Morality">Morality</option>
      <option value="Society">Society</option>
      <option value="Power">Power</option>
      <option value="Justice">Justice</option>
      <option value="Adventure">Adventure</option>
      <option value="Tragedy">Tragedy</option>
      <option value="War">War</option>
      <option value="Philosophy">Philosophy</option>
    </select>
  );
}
