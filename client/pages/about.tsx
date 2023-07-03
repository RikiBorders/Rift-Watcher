import NavBar from "../components/NavBar";
import Modal from "../components/Modal";
import styles from "../pages/about.module.css";
import { motion } from "framer-motion";
import {useState} from 'react'
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
              We have observed that many stat-tracking websites show players too much 
              extraneous data that cannot necessarily be applied to improve gameplay. Moreover,
              the algorithms & formulas used to calculate these statistics often times do not come with explanations. 
              We tackle these challenges by providing only the statistics that matter, while offering explanations to go 
              alongside them. This way you know exactly what you're looking at, and why you are looking at it. We believe
              the more transparency our data has, the easier your climb  will be.
            </p>
          
          </motion.div>

          <motion.div className={styles.info_section}>
            <h1 className={styles.info_section_header}>How We Collect Our Data</h1>

            <p className={styles.info_section_text}>
              All of our data comes directly from the Official Riot games API. Using the information
              provided by Riot, we use a variety of formulas to extrapolate useful information such as 
              immediate and seasonal winrate, or average visionscore per game. Moreover, we construct personalized 
              user profiles that showcase a player's strengths and weaknesses. We only use your data to visualize League 
              of Legends statistics, and your data will never leave our domain. Furthermore, we do not share nor publicize 
              your data in any form without consent.
              <br/><br/>
              We create our graphs using a combined theoretical approach that considers both game statistics and game theory
              concepts. League of Legends and mobile games in general are a part of a category of video games that can be 
              explained through the academic field of game theory. As a result, there is no single right way to analyze 
              League of Legends data. Rather, there are different ways of interpreting the data that can yield different 
              insights about various aspects of the game. 
              <br/><br/>
              For example, game theory can be applied to a player's early game statistics (such as creep score per minute) 
              to identify how individual outcomes lead to differenct long term decisions in the late-game. On the other hand, 
              someone interested in how a team plays overall might apply game theory to the same data set in such a way that 
              emphasizes how team compositions and team decisions lead to game success (or failure).
              

            </p>
          
          </motion.div>

          <motion.div className={styles.info_section}>
            <h1 className={styles.info_section_header}>How Rift Watcher Can Help You</h1>

            <p className={styles.info_section_text}>
              Rift Watcher is a powerful tool intended to help you climb the League of Legends ranked ladder. 
              Rift Watcher identifies your strengths and weaknesses as a player using your current and historical 
              game data. We also provide personalized analytics to help you identify patterns in your gameplay
              over the span of a single match, 20 games, or even an entire season. By providing analytics on
              each player's trends over long periods of time, we're able to provide some clarity on what areas a player
              both struggles and exceeds in. By providing clarity, we hope that each player can break any barrier that may be holding them
              back from their new peak rank.
              <br/><br/>
              Rift Watcher is in active development—we hope to publish a roadmap and list of current and upcoming 
              features in a coming update.
            </p>
          
          </motion.div>

          <div className={styles.greeting_section}>
            <img src="/league_champs_bg.jpg" className={styles.bg_img}/>
          </div>

          <motion.div className={styles.contributor_section}>
            <h1 className={styles.info_section_header}>Our Team</h1>

              <div className={styles.contributors}>
                <div className={styles.contributor_card}>
                  <h2 className={styles.contributor_header}>Riki</h2>
                  <p className={styles.contributor_text}><b>Website Developer and Rift-Watcher founder</b></p>
                  <p className={styles.contributor_text}>
                    Responsible for the technical development and direction of Rift-Watcher. 
                    Software Engineer and avid Yasuo enjoyer -  when I'm not coding 
                    I'm either playing a game or spending time with my cat.
                  </p>
                </div>

                <div className={styles.contributor_card}>
                  <h2 className={styles.contributor_header}>Marv</h2>
                  <p className={styles.contributor_text}><b>Statistical Consultant</b></p>
                  <p className={styles.contributor_text}>
                  Responsible for identifying and representing useful LoL data. 22-year-old student of physics and geosciences from NYC. I am interested 
                  in how games can be represented statistically and can be found playing 
                  Jhin and/or Bard.
                  </p>

                </div>
              </div>

          </motion.div>
          
          <p className={styles.disclaimer}>
            Disclaimer: 
            Rift Watcher isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially 
            involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
            registered trademarks of Riot Games, Inc.
          </p>

        </div>
      </div>
    </div>
  );}
  
  
