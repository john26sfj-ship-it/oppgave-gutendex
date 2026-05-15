import { useLocation, useNavigate } from "react-router-dom";
import { useFavoritesContext } from "../State/FavoritesContext";
import styles from "../styles/Header.module.css";
import { useState } from "react";

export default function FavoritesButton() {
  const { showFavorites, setShowFavorites } = useFavoritesContext();
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
          setReturnPath(location.pathname);
          setShowFavorites(true);
          navigate("/");
        } else {
          setShowFavorites(false);
          navigate(returnPath || "/");
        }
      }}
    >
      {showFavorites ? "Hide favorites" : "Show favorites"}
    </button>
  );
}
