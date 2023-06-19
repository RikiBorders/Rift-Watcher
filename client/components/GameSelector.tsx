import React, { use, useState } from 'react';
import styles from "./GameSelector.module.css";

export default function GameSelector({currentGame, selectGame}: {currentGame: string, selectGame: (game: string) => void}) {
    const [current, setCurrent] = useState(currentGame)

    const HandleSelectGame = (gamemode: string) => {
        if (gamemode == "LOL"){
            selectGame("LOL")
            setCurrent("LOL")
        } 
        else if (gamemode == "TFT") {
            selectGame("TFT")
            setCurrent("TFT")
        }
    } 


    return (
        <div>
            <button 
                className={
                    current == "LOL" ? 
                    styles.game_button_selected : 
                    styles.game_button
                } 
                onClick={() => {HandleSelectGame("LOL")}}
            >
                League of Legends
            </button>

            <button
                className={
                    current == "TFT" ? 
                    styles.game_button_selected : 
                    styles.game_button
                } 
                onClick={() => {HandleSelectGame("TFT")}}
            >
                Teamfight Tactics
            </button>
        </div>
    )
}