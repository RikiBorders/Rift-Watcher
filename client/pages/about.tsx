import NavBar from "../components/NavBar";
import Image from 'next/image'
import styles from "../pages/about.module.css";
import { motion } from "framer-motion";
import {useState} from "react"
import Head from "next/head";

export default function About() {
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  
  const open_modal = (identifier: number) => {
    if (identifier == 1){
      setShowLearnMoreModal(true);
      toggleScroll();
    }
    else if (identifier == 2){
      setShowLearnMoreModal(true);
      toggleScroll();
    }
  }

  const close_modal = () => {
    setShowLearnMoreModal(false);
    toggleScroll();
  }

  const toggleScroll = () => {
    setScrollEnabled(!scrollEnabled);
  };

  return (
    <div>
      <Head>
        <title>About</title>
        <meta name="description" content="About Rift Watcher" />
      </Head>
      
      <div className={scrollEnabled ? styles.page_body : styles.disabled_scroll}>
        <NavBar/>

        <div className={styles.background}>


          <motion.div className={styles.greeting_section}>
            <h1 className={styles.greeting_text}>What is Rift Watcher?</h1>
            <video className={styles.about_video} loop autoPlay muted>
              <source src="/about_video.mp4" type="video/mp4"/>
            </video>
          </motion.div>

          <motion.div className={styles.info_section}>
            <h1 className={styles.info_section_header}>Statistics for Players, by Players</h1>

            <p className={styles.info_section_text}>
              Rift Watcher is a League of Legends (LoL) statistics-tracking 
              application designed to help players unlock their full potential on the Rift. 
              By entering your summoner name, Rift Watcher can provide a variety of relevant gameplay
              analytics such as gold income over time, KDA trends, champion performance insights, and
              much more. We aim to provide the most accurate and relevant data possible so you can focus 
              less on making sense of the data, and more on climbing the ranked ladder.
              <br/><br/>
              Rift Watcher also offers the Hextech Build Calculator, which provides players with an intuitive tool
              that makes it easy to theory-craft builds while taking champion statistics into account. The Hextech 
              Build Calculator allows users to add any item in League of Legends to their build, and see how these items 
              would interact with a champion&apos;s base statistics. The Hextech Build Calculator also offers insights into
              the cost of each build, saving players from the perils of mental math.
            </p>
          
          </motion.div>

          <motion.div className={styles.info_section}>
            <h1 className={styles.info_section_header}>How We Collect Our Data</h1>

            <p className={styles.info_section_text}>
              All of our data comes directly from the Official Riot games API. Using the information
              provided by Riot, we use a variety of formulas to extrapolate useful information such as 
              immediate and seasonal winrate, or average visionscore per game. Moreover, we construct personalized 
              user profiles that showcase a player&apos;s strengths and weaknesses. We only use your data to visualize League 
              of Legends statistics, and your data will never leave our domain. Furthermore, we do not share nor publicize 
              your data in any form without consent.
            </p>
          
          </motion.div>

          <motion.div className={styles.info_section}>
            <h1 className={styles.info_section_header}>How Rift Watcher Can Help You</h1>

            <p className={styles.info_section_text}>
              Rift Watcher is a powerful tool intended to help you climb the League of Legends ranked ladder. 
              Rift Watcher identifies your strengths and weaknesses as a player using your current and historical 
              game data. We also provide personalized analytics to help you identify patterns in your gameplay
              over the span of a single match, 20 games, or even an entire season. By providing analytics on
              each player&apos;s trends over long periods of time, we&apos;re able to provide some clarity on what areas a player
              both struggles and exceeds in. By providing clarity, we hope that each player can break any barrier that may be holding them
              back from their new peak rank.
              <br/><br/>
              Rift Watcher is in active development—we hope to publish a roadmap and list of current and upcoming 
              features in a coming update.
            </p>
          
          </motion.div>

          <div className={styles.greeting_section}>
            <Image src="/league_champs_bg.jpg" className={styles.bg_img} alt="" fill/>
          </div>

          <motion.div className={styles.contributor_section}>
            <h1 className={styles.info_section_header}>Contributors</h1>
            <p className={styles.info_section_text}>
              The development of Rift Watcher would not be possible without the hard work of
              many different groups of people. Special thanks to the folks over at Community Dragon
              for creating such a useful and convenient CDN, while also fostering a friendly, knowledgable
              community over on their Discord server. Below you will find a list of contributors who helped shape Rift
              Watcher in a variety of ways, and to whom I&apos;m grateful for (with the exception of myself lol).
            </p>

              <div className={styles.contributors}>
                <div className={styles.contributor_card}>
                  <h2 className={styles.contributor_header}>Riki</h2>
                  <p className={styles.contributor_text}><b>Rift-Watcher Developer</b></p>
                  <p className={styles.contributor_text}>
                    Responsible for the technical development and direction of Rift-Watcher.
                  </p>
                </div>

                <div className={styles.contributor_card}>
                  <h2 className={styles.contributor_header}>Marv</h2>
                  <p className={styles.contributor_text}><b>Statistical Consultant</b></p>
                  <p className={styles.contributor_text}>
                    Go-to person for deriving interesting statistics & figuring out ways to represent useful LoL data.
                  </p>
                </div>

                <div className={styles.contributor_card}>
                  <h2 className={styles.contributor_header}>Derek</h2>
                  <p className={styles.contributor_text}><b>Developer</b></p>
                  <p className={styles.contributor_text}>
                    Created the foundation for Rift-Watcher&apos;s TFT feature.
                  </p>
                </div>
              </div>

          </motion.div>
          
          <p className={styles.disclaimer}>
            Disclaimer: 
            Rift Watcher isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially 
            involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
            registered trademarks of Riot Games, Inc.
          </p>

        </div>
      </div>
    </div>
  );}
  
  
