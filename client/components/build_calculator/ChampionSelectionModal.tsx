import styles from "./ChampionSelectionModal.module.css";
import ChampionComponent from "@/components/build_calculator/ChampionComponent"
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionSelectionModal = (props: any) => {
    const [championSelected, setChampionSelected] = useState(false)
    const [selectedChampion, setSelectedChampion] = useState({
        'icon_path': '',
        'name': '',
        'roles': [],
        'difficulty': 0,
        'damage_style': '',
        'health':{'flat': ''},
        'attackDamage': {'flat': ''}, 
        'attackSpeed': {'flat': ''}, 
        'armor': {'flat': ''},
        'magicResistance': {'flat': ''},
        'movespeed': {'flat': ''},
        'abilities': {
            'P': [],
            'Q': [{'name': '', 'icon': ''}],
            'W': [{'name': '', 'icon': ''}],
            'E': [{'name': '', 'icon': ''}],
            'R': [{'name': '', 'icon': ''}],
        }
    })
    const [championCards, setChampionCards] = useState<any>([]);
    const [champIndex, setChampIndex] = useState(0)

    const load_champion_cards = () => {
        let champ_cards: Array<any> = []
        for (const id in props.champ_data){
            const champion = props.champ_data[id]
            const champ_card = <ChampionComponent champ_data={champion} set_selected_champion={set_selected_champion}/>
            champ_cards.push(champ_card)
        }
        setChampionCards(champ_cards)
    }

    const set_selected_champion = (champ: any) => {
        setChampionSelected(true)
        setSelectedChampion(champ)
    }

    const render_champ_cards = () => {
        let champs1: Array<any> = [];
        let champs2: Array<any> = [];
        let limit = Math.min(championCards.length, champIndex+10)

        for (let i=champIndex; i < limit/2; i++){
            champs1.push(championCards[i])
        }
        for (let i=limit/2; i < limit; i++){
            champs2.push(championCards[i])
        }

        return(
            <div className={styles.champ_carousel}>
                <div className={styles.champ_row}>
                    {champs1.map((champion: any) => (
                        champion
                    ))}
                </div>
                <div className={styles.horizontal_spacer_large}/>
                <div className={styles.champ_row}>
                    {champs2.map((champion: any) => (
                        champion
                    ))}
                </div>
            </div>
        )
    }

    useEffect(() => {
        load_champion_cards()
    }, [])
    return (
        <div onClick={props.close_modal} className={styles.container}>
            <div onClick={(e) => {e.stopPropagation();}} className={styles.content_container}>

                <motion.button onClick={props.close_modal} className={styles.close_button}></motion.button>
                <h2 className={styles.header_text}>Currently Selected:</h2>
                    {championSelected ? 
                        <div className={styles.selected_champion_container}>
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
                                        <img src={selectedChampion.abilities.Q[0].icon} className={styles.ability_icon} />
                                        <p className={styles.champ_select_text}>{selectedChampion.abilities.Q[0].name}</p>
                                    </div>
                                    <div className={styles.ability_row}>
                                        <img src={selectedChampion.abilities.W[0].icon} className={styles.ability_icon} />
                                        <p className={styles.champ_select_text}>{selectedChampion.abilities.W[0].name}</p>
                                    </div>
                                    <div className={styles.ability_row}>
                                        <img src={selectedChampion.abilities.E[0].icon} className={styles.ability_icon} />
                                        <p className={styles.champ_select_text}>{selectedChampion.abilities.E[0].name}</p>
                                    </div>

                                </div>
                                <div className={styles.ultimate_info}>
                                    <div className={styles.ultimate_element}>
                                        <img src={selectedChampion.abilities.R[0].icon} className={styles.ult_icon} />
                                        <p className={styles.champ_select_text}>{selectedChampion.abilities.R[0].name}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className={styles.horizontal_spacer_medium}/>

                            <div className={styles.stats_container}>
                                <div className={styles.stat_row}>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>{selectedChampion.health.flat}</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>{selectedChampion.attackDamage.flat}</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>{selectedChampion.armor.flat}</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>{selectedChampion.attackSpeed.flat}</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>0</p>
                                    </div>
                                </div>
                                <div className={styles.stat_row}>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>0</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>0</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>{selectedChampion.magicResistance.flat}</p>
                                    </div>
                                    <div className={styles.stat_item}>
                                        <img 
                                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                            className={styles.stat_icon}
                                        />
                                        <p className={styles.stat_text}>{selectedChampion.movespeed.flat}</p>
                                    </div>
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

                    

                    {championCards.length == 0 ? 
                        <></>:
                        render_champ_cards()
                    }


            </div>
        </div>
    );
};

export default ChampionSelectionModal;