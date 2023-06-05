import Link from 'next/link';
import styles from "./NavBar.module.css";

const NavBar = ({}) => {

  return (
    <nav className={styles.nav}>

        <ul className={styles.nav_links}>
          <li className={styles.nav_item}>
            <Link href="/home" className={styles.nav_link}>Home</Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/statistics" className={styles.nav_link}>Statistics</Link>
          </li>
          <li className={styles.nav_item}>
            <Link href="/about" className={styles.nav_link}>About</Link>
          </li>
        </ul>

    </nav>
  );
};

export default NavBar;