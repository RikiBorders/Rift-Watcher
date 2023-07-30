import React, { useState, useEffect } from 'react';
import styles from "./BuildCalculatorComponent.module.css";
import ChampionSelectionModal from './ChampionSelectionModal';

export default function BuildCalculator(props: any) {
    const [showChampionSelectionModal, setChampionSelectionModal] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [targetChampionSelected, setTargetChampionSelected] = useState(false)
    const [targetChampion, setTargetChampion] = useState({
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
            <div className={styles.info_section}>
                <div className={styles.info_section_text}>
                    <p>
                        To add items to the build, drag items from the left pane to the center section.
                        Information regarding your current build will update in real-time on the right.
                    </p>
                
                </div>
            </div>

            {/* Modals go here */}
            {render_champion_select_modal()}
            

            <button 
                className={styles.champion_selection_button} 
                onClick={() => {open_modal()}}
            >
                Select Champion
            </button>
        </div>
    )
}
