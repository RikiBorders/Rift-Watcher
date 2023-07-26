import React, { useState, useEffect } from 'react';
import styles from "./BuildCalculatorComponent.module.css";
import ChampionSelectionModal from './ChampionSelectionModal';

export default function BuildCalculator(props: any) {
    const [showChampionSelectionModal, setChampionSelectionModal] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    
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
                <ChampionSelectionModal close_modal={close_modal} champ_data={champ_data}/>
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
