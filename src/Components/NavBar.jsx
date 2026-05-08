import Categories from "./Categories";
import ResetButton from "./ResetButton";
import SearchField from "./SearchField";
import styles from "../styles/NavBar.module.css";
import PageButtons from "./PageButtons";

export default function NavBar() {
  return (
    <nav>
      <h1>GutenDex</h1>
      <div className={styles.searchContainer}>
        <Categories />
        <SearchField />
        <ResetButton />
      </div>
      <PageButtons />
    </nav>
  );
}
