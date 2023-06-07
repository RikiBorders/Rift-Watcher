import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Head from "next/head";
import styles from "../pages/home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Elevate Your Game With Rift Watcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page_body}>
        <NavBar/>
          <div className={styles.home_content}>
            <img className={styles.logo} src="/logo.png"/>
            <h2 className={styles.sub_header}>Take Your League Journey to the Next Level.</h2>
            <SearchBar/>
          </div>
      </div>
    </div>
);}