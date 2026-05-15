import styles from "../styles/NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavButtons() {
  return (
    <>
      <Link to="/">
        <button className={styles.navButton}>Home</button>
      </Link>
      <Link to="/about">
        <button className={styles.navButton}>About</button>
      </Link>
    </>
  );
}
