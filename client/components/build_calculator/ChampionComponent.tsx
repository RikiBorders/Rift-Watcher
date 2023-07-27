import styles from "./ChampionComponent.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionComponent = (props: any) => {
    useEffect(() => {
    }, [])
    return (
        <div style={{
            backgroundImage: `url(${props.champ_data.splash_icon})`,
            backgroundRepeat: 'noRepeat',
            backgroundSize: '200px 400px',
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            height: '400px',
            flexShrink: 0,
        }}
        onClick={()=>props.set_selected_champion(props.champ_data)}>
            <p className={styles.card_text}>{props.champ_data.name}</p>
        </div>
    );
};

export default ChampionComponent;