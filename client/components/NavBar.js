import React, { Component } from 'react';
import NextLink from 'next/link';
import styles from "./NavBar.module.css";

class NavBar extends Component {

  render(){

    return (
      <nav className={styles.nav}>
        <NextLink href="/home" className={styles.nav_link}>Home</NextLink>
        <NextLink href="/statistics" className={styles.nav_link}>Statistics</NextLink>
        <NextLink href="/about" className={styles.nav_link}>About</NextLink>
      </nav>
    );
  };
}

export default NavBar;