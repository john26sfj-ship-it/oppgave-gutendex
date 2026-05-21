import Categories from "./Categories";
import ResetButton from "./ResetButton";
import SearchField from "./SearchField";
import styles from "../styles/Header.module.css";
import PageButtons from "./PageButtons";
import FavoritesButton from "./FavoritesButton";
import NavButtons from "./NavButtons";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1>GutenDex</h1>
        <button className={styles.menuButton} onClick={toggleMenu}>
          {isOpen ? "X" : "☰"}
        </button>
      </div>
      <div className={`${styles.menuContent} ${isOpen ? styles.menuOpen : ""}`}>
        <div className={styles.searchContainer}>
          <Categories />
          <SearchField />
          <ResetButton />
        </div>
        <div className={styles.navButtons}>
          <FavoritesButton />
          <NavButtons />
        </div>
        <PageButtons />
      </div>
    </header>
  );
}
