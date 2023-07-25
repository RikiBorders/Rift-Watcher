import styles from "./ChampionSelectionModal.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionSelectionModal = ({close_modal}: any, champ_data: any) => {
    const [championSelected, setChampionSelected] = useState(false)
    const [selectedChampion, setSelectedChampion] = useState({
        'icon_path': '',
        'name': '',
        'roles': [],
        'difficulty': 0,
        'damage_style': '',


    })
    useEffect(() => {
        console.log(champ_data)
    }, [])
    return (
        <div onClick={close_modal} className={styles.container}>
            <div onClick={(e) => {e.stopPropagation();}} className={styles.content_container}>

            <motion.button onClick={close_modal} className={styles.close_button}></motion.button>
            <h2 className={styles.header_text}>Currently Selected:</h2>
            <div className={styles.selected_champion}>

            </div>
                {championSelected ? 
                    <div className={styles.selected_champion}>
                        <img 
                            src={selectedChampion.icon_path}
                            className={styles.selected_champ_icon}
                        />
                        <div className={styles.meta_champ_info}>
                            <p className={styles.champ_select_text}>{selectedChampion.name}</p>
                            <p className={styles.champ_select_text}>Role: {selectedChampion.roles}</p>
                            <p className={styles.champ_select_text}>Difficulty: {selectedChampion.difficulty}</p>
                            <p className={styles.champ_select_text}>Damage Style: {selectedChampion.damage_style}</p>
                        </div>

                        <div className={styles.ability_info}>
                            <div className={styles.ability_row}>
                                <div className={styles.blank_ability_icon} />
                                <p className={styles.champ_select_text}>Ability 1</p>
                            </div>
                            <div className={styles.ability_row}>
                                <div className={styles.blank_ability_icon} />
                                <p className={styles.champ_select_text}>Ability 2</p>
                            </div>
                            <div className={styles.ability_row}>
                                <div className={styles.blank_ability_icon} />
                                <p className={styles.champ_select_text}>Ability 3</p>
                            </div>

                        </div>
                        <div className={styles.ultimate_info}>
                            <div className={styles.ultimate_element}>
                                <div className={styles.blank_ult_icon} />
                                <p className={styles.champ_select_text}>Ultimate Ability</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={styles.selected_champion}>
                        <img 
                            src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png' 
                            className={styles.selected_champ_icon}
                        />
                        <div className={styles.meta_champ_info}>
                            <p className={styles.champ_select_text}>No champion selected</p>
                            <p className={styles.champ_select_text}>Role: N/a</p>
                            <p className={styles.champ_select_text}>Difficulty: N/a</p>
                            <p className={styles.champ_select_text}>Damage Style: N/a</p>
                        </div>

                        <div className={styles.ability_info}>
                            <div className={styles.ability_row}>
                                <div className={styles.blank_ability_icon} />
                                <p className={styles.champ_select_text}>Ability 1</p>
                            </div>
                            <div className={styles.ability_row}>
                                <div className={styles.blank_ability_icon} />
                                <p className={styles.champ_select_text}>Ability 2</p>
                            </div>
                            <div className={styles.ability_row}>
                                <div className={styles.blank_ability_icon} />
                                <p className={styles.champ_select_text}>Ability 3</p>
                            </div>

                        </div>
                        <div className={styles.ultimate_info}>
                            <div className={styles.ultimate_element}>
                                <div className={styles.blank_ult_icon} />
                                <p className={styles.champ_select_text}>Ultimate Ability</p>
                            </div>
                        </div>
                    
                    </div>
                }
            </div>
        </div>
    );
};

export default ChampionSelectionModal;