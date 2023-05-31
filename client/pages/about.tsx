import NavBar from "../components/NavBar";
import styles from "../pages/about.module.css";
import { motion } from "framer-motion";

export default function About() {
    return (
      <body className={styles.page_body}>
        <div className={styles.background}>
          <NavBar/>
          <div>
            <motion.div className={styles.info_section}>
              <h1 className={styles.section_header}>What is Rift Watcher?</h1>
              <p className={styles.description}>
                Rift Watcher is a League of Legends (LoL) statistics/tracking application. 
                With your LoL summoner name, Rift Watcher displays your current & historical game data. 
                This data includes metrics such as your win rates, best champions, and various other data points that are 
                relevant to your ranked journey. Rift Watcher can also be used to track your ranked
                progress in the form of our 'Journey' feature, which can be used to log each individual game, tracking
                lp gains and other personalized statistics.
              </p>
            </motion.div>

            <motion.div className={styles.info_section}>
              <h1 className={styles.section_header}>How can Rift Watcher Help You?</h1>
              <p className={styles.description}>
              Rift Watcher is a powerful tool intended to help you climb League of Legends' ranked ladder. 
              Rift Watcher provides both current and historical game data to help you analyze your strengths and 
              weaknesses as a player. In addition, we also provide personalized analytics to help you identify patterns 
              in your gameplay. When you sign-up for an account, you gain access to our 
              personalized tracking feature: <i>Journeys</i>. Journeys is a feature of Rift Watcher that allows you 
              to personalize your improvement plan by working as a personal coach whose suggestions are driven by real data.
              </p>
            </motion.div>

            <motion.div className={styles.info_section}>
              <h1 className={styles.section_header}>How do we Collect our Data?</h1>
              <p className={styles.description}>
              We collect all of our data from the Riot API by interfacing directly with the official Riot Games Developer API Portal. 
              We process the data we gather from the Riot Games API using a series of formulas (whose details are available for you to see and read about) to generate meaningful 
              graphs and statistics. 
              </p>
            </motion.div>

            <motion.div className={styles.info_section}>
              <h1 className={styles.section_header}>Why did We Create Rift Watcher?</h1>
              <p className={styles.description}>
              Rift Watcher is an independent, passion project created by passionate League players.
              Frustrated with the lack of clarity of how other LoL stat-tracking apps calculate 
              their statistics, and lack of intuitive interfaces, we decided to build a platform 
              for League players, by League players. Thus, we decided to create a new tool with a clear goal in mind: 
              <b>transparency</b> & <b>simplicity</b>. 

              </p>
            </motion.div>

            <motion.div className={styles.info_section}>
              <h1 className={styles.section_header}>The Rift Watcher Team</h1>
              <p className={styles.description}>
                Our team is currently made-up of two people. We are responsible for both the development of the Rift Watcher
                website and tooling, as well as the conception of the algorithms we use to analyze your performance and gameplay patterns. All of 
                our content is original, and thoughtfully crafted to bring you the best experience possible.
              </p>
            </motion.div>

          </div>

          <p className={styles.disclaimer}>
          Disclaimer: 
          Rift Watcher isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially 
          involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
          registered trademarks of Riot Games, Inc.
          </p>

        </div>
      </body>
  );}
  
  
