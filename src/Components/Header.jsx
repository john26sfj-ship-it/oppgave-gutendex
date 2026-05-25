import { useState } from "react";
import { useLocation } from "react-router-dom";
import Categories from "./Categories";
import FavoritesButton from "./FavoritesButton";
import NavButtons from "./NavButtons";
import PageButtons from "./PageButtons";
import ResetButton from "./ResetButton";
import SearchField from "./SearchField";
import { MenuContextProvider } from "../State/MenuContext";
import { useFavoritesContext } from "../State/FavoritesContext";
import styles from "../styles/Header.module.css";

const BOOKS_PER_PAGE = 32;

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { favoriteBooks, showFavorites } = useFavoritesContext();
  const isHomePage = location.pathname === "/";
  // Page buttons are only useful for the home grid. In favorites mode they
  // appear only when local favorites need more than one page.
  const shouldShowPageButtons =
    isHomePage && (!showFavorites || favoriteBooks.length > BOOKS_PER_PAGE);

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
        {shouldShowPageButtons && (
          <PageButtons
            isFavoritesMode={showFavorites}
            totalFavorites={favoriteBooks.length}
          />
        )}
      </MenuContextProvider>
    </header>
  );
}
