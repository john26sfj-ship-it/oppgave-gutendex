import { useState } from "react";
import Categories from "./Categories";
import FavoritesButton from "./FavoritesButton";
import NavButtons from "./NavButtons";
import PageButtons from "./PageButtons";
import ResetButton from "./ResetButton";
import SearchField from "./SearchField";
import { MenuContextProvider } from "../State/MenuContext";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <h1>GutenDex</h1>
        <button className={styles.menuButton} type="button" onClick={toggleMenu}>
          {isOpen ? "X" : "☰"}
        </button>
      </div>
      <MenuContextProvider toggleMenu={toggleMenu}>
        <div
          className={`${styles.menuContent} ${isOpen ? styles.menuOpen : ""}`}
        >
          <div className={styles.searchContainer}>
            <Categories />
            <SearchField />
            <ResetButton />
          </div>
          <div className={styles.navButtons}>
            <FavoritesButton />
            <NavButtons />
          </div>
        </div>
        <PageButtons />
      </MenuContextProvider>
    </header>
  );
}
