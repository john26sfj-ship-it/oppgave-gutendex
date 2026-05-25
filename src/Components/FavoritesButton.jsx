import { useLocation, useNavigate } from "react-router-dom";
import { useFavoritesContext } from "../State/FavoritesContext";
import { usePageContext } from "../State/PageContext";
import styles from "../styles/Header.module.css";
import { useState } from "react";

export default function FavoritesButton() {
  const { showFavorites, setShowFavorites } = useFavoritesContext();
  const { setPage } = usePageContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [returnPath, setReturnPath] = useState(null);

  return (
    <button
      className={`${styles.favoritesButton} ${
        showFavorites ? styles.favoritesButtonActive : ""
      }`}
      type="button"
      onClick={() => {
        if (!showFavorites) {
          // Remember where the user came from before showing favorites.
          setReturnPath(location.pathname);
          setPage(1);
          setShowFavorites(true);
          navigate("/");
        } else {
          // Go back to the page the user was on before entering favorites.
          setShowFavorites(false);
          navigate(returnPath || "/");
        }
      }}
    >
      {showFavorites ? "Hide favorites" : "Show favorites"}
    </button>
  );
}
