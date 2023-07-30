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
    const [visibleChampionCards, setVisibleChampionCards] = useState<any>([]);
    const [champIndex, setChampIndex] = useState(0)
    const [showFilter, setShowFilter] = useState(false)
    const [filterRole, setFilterRole] = useState('')
    const [filterDifficulty, setFilterDifficulty] = useState('')
    const [filterDamageType, setFilterDamageType] = useState('')



    const load_champion_cards = (query: string) => {
        let champ_cards: Array<any> = []
        for (const id in props.champ_data){
            const champion = props.champ_data[id]

            let champ_name = champion.name.toLowerCase()
            if ((query == '' || (champ_name.substring(0, query.length) == query.toLowerCase()) && // name filter
                (filterRole == '' || champion.roles.includes(filterRole)) && // query matching for filters below
                (filterDifficulty == '' || filterDifficulty == champion.difficulty) &&
                (filterDamageType == '' || champion.damage_style) 
            )){
                const champ_card = <ChampionComponent champ_data={champion} set_selected_champion={set_selected_champion}/>
                champ_cards.push(champ_card)
            }
        }
        setChampionCards(champ_cards)
        setVisibleChampionCards(champ_cards)
    }
    

    const set_selected_champion = (champ: any) => {
        setChampionSelected(true)
        setSelectedChampion(champ)
    }

    const update_champ_index = (operation: number) => {
        let new_index = 0
        
        if (operation){
            new_index = champIndex + 8
            if (new_index >= visibleChampionCards.length){
                new_index = new_index - visibleChampionCards.length
            }
        } else {
            new_index = champIndex - 8
            const card_count = visibleChampionCards.length
            if (new_index < 0){
                if (card_count+new_index < 0)
                    new_index = 0
                else 
                    new_index = card_count+new_index
            }
        }
        setChampIndex(new_index)
    }

    const render_champ_cards = () => {
        let champs1: Array<any> = [];
        let champs2: Array<any> = [];
        let limit = Math.min(visibleChampionCards.length, champIndex+8)

        for (let i=champIndex; i < champIndex+4; i++){
            champs1.push(visibleChampionCards[i])
        }
        for (let i=champIndex+4; i < limit; i++){
            champs2.push(visibleChampionCards[i])
        }

        return(
            <div className={styles.champ_carousel_container}>
                <motion.button 
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
                    className={styles.carousel_button_left} onClick={() => update_champ_index(0)}
                />
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
                <motion.button 
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
                    className={styles.carousel_button_right} onClick={() => update_champ_index(1)}
                />
            </div>
        )
    }

    const handleInputChange = (event: any) => {
        event.preventDefault();
        setChampIndex(0)
        load_champion_cards(event.target.value)
    }

    const show_filter = () => {
        if (showFilter){
            setShowFilter(false)
        } else {
            setShowFilter(true)
        }
    }

    const update_filter_role = (event: any) => {
        const selectedOption = event.target.value;
        setFilterRole(selectedOption)
    }

    const update_filter_difficulty = (event: any) => {
        const selectedOption = event.target.value;
        setFilterDifficulty(selectedOption)
    }

    const update_filter_damage_type = (event: any) => {
        const selectedOption = event.target.value;
        setFilterDamageType(selectedOption)
    }

    useEffect(() => {
        load_champion_cards('')
    }, [])
    return (
        <div onClick={props.close_modal} className={styles.container}>
            <div onClick={(e) => {e.stopPropagation();}} className={styles.content_container}>

                <motion.button onClick={props.close_modal} className={styles.close_button}></motion.button>
                <h2 className={styles.header_text}>Current Champion:</h2>
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
                        <div className={styles.unselected_champion}>
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

                    <div className={styles.champion_search_container}>
                        <div className={styles.search_bar_container}>
                            <div
                                style={{
                                    backgroundColor: '#131313',
                                    width: '52px',
                                    height: '52px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <motion.button onClick={show_filter} className={styles.filter_button}/>
                            </div>
                            <form className={styles.search_form}>
                                <input
                                    className={styles.search_input}
                                    type="text"
                                    placeholder='Champion Search'
                                    defaultValue=''
                                    onChange={handleInputChange}
                                />
                            </form>

                        </div>
                        {
                            showFilter ?
                            <div className={styles.filter_container}>
                                <div className={styles.filter_row}>
                                    <p className={styles.filter_text}>Role:</p>
                                    <select className={styles.filter_select} value={filterRole} onChange={update_filter_role}>
                                        <option key='Assassin' value='Assassin'>Assassin</option>
                                        <option key='Fighter' value='Fighter'>Fighter</option>
                                        <option key='Mage' value='Mage'>Mage</option>
                                        <option key='Marksman' value='Marksman'>Marksman</option>
                                        <option key='Tank' value='Tank'>Tank</option>
                                        <option key='Vanguard' value='Vanguard'>Vanguard</option>
                                    </select>
                                </div>
                                <div className={styles.filter_row}>
                                    <p className={styles.filter_text}>Difficulty:</p>
                                    <select className={styles.filter_select} value={filterDifficulty} onChange={update_filter_difficulty}>
                                        <option key='1' value='1'>1</option>
                                        <option key='2' value='2'>2</option>
                                        <option key='3' value='3'>3</option>

                                    </select>
                                </div>
                                <div className={styles.filter_row}>
                                    <p className={styles.filter_text}>Damage Type:</p>
                                    <select className={styles.filter_select} value={filterDamageType} onChange={update_filter_damage_type}>
                                        <option key='physical' value='physical'>Physical</option>
                                        <option key='magic' value='magic'>Magic</option>

                                    </select>
                                </div>

                            </div> :
                            <div className={styles.filter_margin}/>
                        }
                    </div>

                    {championCards.length == 0 ? 
                        <></>:
                        render_champ_cards()
                    }

            </div>
        </div>
    );
};

export default ChampionSelectionModal;