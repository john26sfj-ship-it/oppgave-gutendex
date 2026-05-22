import styles from "../styles/Header.module.css";
import { Link } from "react-router-dom";
import { useMenuContext } from "../State/MenuContext";

export default function NavButtons() {
  const { toggleMenu } = useMenuContext();

  return (
    <>
      <Link className={styles.navButton} to="/" onClick={toggleMenu}>
        Home
      </Link>
      <Link className={styles.navButton} to="/about" onClick={toggleMenu}>
        About
      </Link>
    </>
  );
}
