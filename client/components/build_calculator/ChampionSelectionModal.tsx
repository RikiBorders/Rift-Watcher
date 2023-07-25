import styles from "./ChampionSelectionModal.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionSelectionModal = ({close_modal}: any, champion_data: any) => {

    const [selectedChampion, setSelectedChampion] = useState()


    return (
        <div onClick={close_modal} className={styles.container}>
            <div onClick={(e) => {e.stopPropagation();}} className={styles.content_container}>

            <motion.button onClick={close_modal} className={styles.close_button}></motion.button>
            <h2 className={styles.header_text}>Currently Selected:</h2>
            <div className={styles.selected_champion}>

            </div>

            </div>
        </div>
    );
};

export default ChampionSelectionModal;