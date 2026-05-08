import { useEffect, useState } from "react";
import { useCategoriesContext } from "../State/CategoriesContext";
import styles from "../styles/NavBar.module.css";
export default function Categories() {
  const { category, setCategory } = useCategoriesContext();

  const handleChange = (event) => {
    setCategory(event.target.value);
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
