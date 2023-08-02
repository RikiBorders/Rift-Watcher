import React, { useState, useEffect } from 'react';
import styles from "./BuildCalculatorComponent.module.css";
import ChampionSelectionModal from './ChampionSelectionModal';

export default function BuildCalculator(props: any) {
    const [showChampionSelectionModal, setChampionSelectionModal] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [targetChampionSelected, setTargetChampionSelected] = useState(false)
    const [targetChampion, setTargetChampion] = useState({
        'icon_path': '',
        'splash_icon': '/default_champ_splash.png',
        'name': '',
        'roles': [],
        'difficulty': 0,
        'damage_style': '',
        'health':{'flat': '0'},
        'attackDamage': {'flat': '0'}, 
        'attackSpeed': {'flat': '0'}, 
        'armor': {'flat': '0'},
        'magicResistance': {'flat': '0'},
        'movespeed': {'flat': '0'},
        'abilities': {
            'P': [],
            'Q': [{'name': '', 'icon': ''}],
            'W': [{'name': '', 'icon': ''}],
            'E': [{'name': '', 'icon': ''}],
            'R': [{'name': '', 'icon': ''}],
        }
    })
    const [buildStats, setBuildStats] = useState({
        'health': '0',
        'attackDamage': '0',
        'attackSpeed': '0',
        'armor': '0',
        'magicResistance': '0',
        'movespeed': '0',
        'criticalChance': ''
    });
    
    
    const open_modal = () => {
        setChampionSelectionModal(true);
        toggleScroll();
    }
  
    const close_modal = () => {
      setChampionSelectionModal(false);
      toggleScroll();
    }
  
    const toggleScroll = () => {
      setScrollEnabled(!scrollEnabled);
    };

    const process_base_stats_name = () => {
        let name = targetChampion.name
        if (name[name.length-1] == 's'){
            return name+"'"
        } else if (name != '') {
            return name+"'s"  
        }
    }

    const render_champion_base_stats = () => {
        return (
            <div className={styles.base_stats_container}>
                <h2 className={styles.base_stats_header}>{process_base_stats_name()}</h2>
                <h2 className={styles.base_stats_header}>Base Stats</h2>
                <div className={styles.base_stats}>
                    <div className={styles.health_row}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                className={styles.stat_icon}
                            />
                            <p className={styles.stat_text}>{targetChampion.health.flat}</p>
                    </div>  
                    <div className={styles.base_stats_2}>
                        <div className={styles.stat_column}>                    
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{targetChampion.attackDamage.flat}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{targetChampion.armor.flat}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{targetChampion.attackSpeed.flat}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>0</p>
                            </div>
                        </div>
                        <div className={styles.stat_column}>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>0</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{targetChampion.magicResistance.flat}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>0</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{targetChampion.movespeed.flat}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const render_champion_build_stats = () => {
        return (
            <div className={styles.base_stats_container}>
                <div className={styles.base_stats}>
                    <div className={styles.health_row}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                className={styles.stat_icon}
                            />
                            <p className={styles.stat_text}></p>
                    </div>  
                    <div className={styles.base_stats_2}>
                        <div className={styles.stat_column}>                    
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                        </div>
                        <div className={styles.stat_column}>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )  
    }

    const render_selected_champion = () => {
        return(
            <div className={styles.selected_champion_container}>
                <img className={styles.selected_champion_portrait} src={targetChampion.splash_icon} />
                <button 
                    className={styles.champion_selection_button} 
                    onClick={() => {open_modal()}}
                >
                    Select Champion
                </button>
            </div>
        )
    }

    const render_item_list = () => {
        // Add each
        let health_items: Array<any> = [];
        let attackDamage_items: Array<any> = [];
        let abilityPower_items: Array<any> = [];
        let attackSpeed_items: Array<any> = [];
        let armor_items: Array<any> = [];
        let magicResist_items: Array<any> = [];
        let criticalChance_items: Array<any> = [];
        let abilityHaste_items: Array<any> = [];
        let movement_items: Array<any> = [];

        let row: Array<any> = [];        
        props.calculator_data.items.forEach((item: any) => {
            console.log(item)
        })

        return(
            <div className={styles.item_list_container}>
                <h2 className={styles.build_stats_subheader}>Items</h2>

                <div className={styles.item_section}>
                    <div className={styles.item_section_title}>
                        <img 
                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                            className={styles.item_section_icon}
                        />
                        <div className={styles.horizontal_spacer_large} />
                    </div>
                    <div className={styles.item_list}>
                        {health_items.map((item: any) => (
                            <div className={styles.item_container}>
                                <img src={item.icon} className={styles.item_img} />
                                <p className={styles.item_text}>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>




            </div>
        )
    }

    const render_build_stats = () => {
        return(
            <div className={styles.build_stats_section_container}>
                <div className={styles.build_stats_title}>
                    <h1 className={styles.build_stats_header}>Stats</h1>
                    <p className={styles.build_stats_subheader}> (including items)</p>
                </div>
                <div className={styles.build_stats_container}>
                    {render_champion_build_stats()}
                </div>
            </div>
        )
    }

    useEffect(() => {
    }, [])
    const render_champion_select_modal = () => {
        let champ_data = props.calculator_data.champions
        if (showChampionSelectionModal) {
            return (
                <ChampionSelectionModal 
                    close_modal={close_modal} 
                    set_target={setTargetChampion} 
                    set_target_selected={setTargetChampionSelected}
                    champ_data={champ_data}
                    target={targetChampion}
                    target_selected={targetChampionSelected}
                />
            )
        } else {
            return(<></>)
        }
    }
    useEffect(() => {
    }, [])
    return (
        <div className={styles.container}>
            {/* Modals go here */}
            {render_champion_select_modal()}

            <div className={styles.calculator_row}>
                {render_champion_base_stats()}
                {render_selected_champion()}
                {render_build_stats()}
            </div>
            <div className={styles.calculator_row}>
                {render_item_list()}
            </div>

        </div>
    )
}
