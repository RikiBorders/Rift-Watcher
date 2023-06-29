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
              application designed to help players unlock their full potential. 
              Using your LoL summoner name, Rift Watcher displays 
              current & historical game data, as well as detailed gameplay analytics
              in the form of graphs, tables, and other viusalization methods.
            </p>
          
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
  
  
