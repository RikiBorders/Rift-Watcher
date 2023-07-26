import styles from "./ChampionComponent.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionComponent = (props: any) => {
    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <div className={styles.champ_card_container}>
            <h2>{props.champ_data.name}</h2>
        </div>
    );
};

export default ChampionComponent;