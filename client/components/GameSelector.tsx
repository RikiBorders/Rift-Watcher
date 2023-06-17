import React, { use, useState } from 'react';
import styles from "./GameSelector.module.css";
export default function GameSelector({currentGame, selectGame}: {currentGame: string, selectGame: (game: string) => void}) {
    const [current, setCurrent] = useState(currentGame)
    return (
        <div>
            <button className={styles.game_button_selected} onClick={() => {selectGame("LOL")}}>League of Legends</button>
            <button className={styles.game_button} onClick={() => {selectGame("TFT")}}>Teamfight Tactics</button>
        </div>
    )
}