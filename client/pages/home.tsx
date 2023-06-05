import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Head from "next/head";
import styles from "../pages/home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="About Rift Watcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page_body}>
        <NavBar/>
        <div>
          <h1 className={styles.header}>Take Your League Journey to the Next Level.</h1>
          <SearchBar/>
        </div>
      </div>
    </div>
);}