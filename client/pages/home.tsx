import { useState } from "react";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import GameSelector from "@/components/GameSelector";
import Head from "next/head";
import Image from "next/image";
import styles from "../pages/home.module.css";

export default function Home() {
  const [currentGame, setCurrentGame] = useState<string>("LOL")

  const selectGame = (game: string) => {
    setCurrentGame(game)
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Elevate Your Game With Rift Watcher" />
      </Head>

      <div className={styles.page_body}>
        <NavBar/>
        
          <div className={styles.home_content}>
            <Image className={styles.logo} src="/logo.png" alt="" width="650" height="180"/>
            <h2 className={styles.sub_header}>Take Your League Journey to the Next Level.</h2>
            <GameSelector currentGame={currentGame} selectGame={selectGame}/>
            <SearchBar currentGame={currentGame}/>
          </div>


          <p className={styles.disclaimer}>
            Disclaimer: 
            Rift Watcher isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially 
            involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
            registered trademarks of Riot Games, Inc.
          </p>
      </div>
    </div>
);}