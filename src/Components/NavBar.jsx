import Categories from "./Categories";
import ResetButton from "./ResetButton";
import SearchField from "./SearchField";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <nav>
      <h1>GutenDex</h1>
      <div className={styles.searchContainer}>
        <Categories />
        <SearchField />
        <ResetButton />
      </div>
    </nav>
  );
}
