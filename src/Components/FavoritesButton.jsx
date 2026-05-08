import { useFavoritesContext } from "../State/FavoritesContext";
import styles from "../styles/NavBar.module.css";

export default function FavoritesButton() {
  const { showFavorites, setShowFavorites } = useFavoritesContext();

  return (
    <button
      className={`${styles.favoritesButton} ${
        showFavorites ? styles.favoritesButtonActive : ""
      }`}
      type="button"
      onClick={() => setShowFavorites((currentValue) => !currentValue)}
    >
      {showFavorites ? "Hide favorites" : "Show favorites"}
    </button>
  );
}
