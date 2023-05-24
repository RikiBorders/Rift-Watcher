import React, { useState } from 'react';
import Link from 'next/link';
import styles from "./NavBar.module.css";

const NavBar = ({}) => {

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>

        <div className={styles.nav_link_wrapper}>
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
        </div>

      </nav>
    </div>
  );
};

export default NavBar;