import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import { useMenuContext } from "../State/MenuContext";

export default function NavButtons() {
  const { toggleMenu } = useMenuContext();

  return (
    <>
      <Link to="/">
        <button className={styles.navButton} onClick={toggleMenu}>
          Home
        </button>
      </Link>
      <Link to="/about">
        <button className={styles.navButton} onClick={toggleMenu}>
          About
        </button>
      </Link>
    </>
  );
}
