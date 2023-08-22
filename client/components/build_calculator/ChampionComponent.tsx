import styles from "./ChampionComponent.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from 'react';

const ChampionComponent = (props: any) => {
    const myRef = useRef<any>(null);

    function map(mouse_pos: number, minA: number, maxA: number, minB: number, maxB: number) {
        return minB + ((mouse_pos - minA) * (maxB - minB)) / (maxA - minA);
    }


    function Card3D(event: any) {
        // adapted from https://codepen.io/nelsonr/pen/WNQaZPb
        let card = myRef.current
        let card_content = card.querySelector('span');
        if (card_content != null) {
            let card_bounding = card.getBoundingClientRect();
            
            let width = card_bounding.width;
            let height = card_bounding.height;
            let mouseX = event.clientX - card_bounding.left;
            let mouseY = event.clientY - card_bounding.top;
            let rotateY = map(mouseX, 0, width, -25, 25);     //this dictates horizontal tilt           
            let rotateX = map(mouseY, 0, height, 25, -25);    //this dictates vertical tilt
            let brightness = map(mouseY, 0, height, 1.5, 0.8);
            
            card_content!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card_content!.style.filter = `brightness(${brightness})`;
        }
      }
      
      function handleExit() {
        let card = myRef.current
        let card_view = card.querySelector('span');
        if (card_view != null){
            (card_view as HTMLElement).style.transform = 'rotateX(0deg) rotateY(0deg)';
            (card_view as HTMLElement).style.filter = 'brightness(1)';
        }
      }

    useEffect(() => {
    }, [])
    return (
        <div 
            ref={myRef}
            className='card3d'
            id="card3d"
            onMouseMove={(event) => {Card3D(event)}}
            onMouseLeave={() => {handleExit()}}

            style={{
                margin: '4px',
                transform: 'scale(1)',
                perspective: '600px',
                cursor: 'pointer'

            }}
        >
            <motion.span style={{
                backgroundImage: `url(${props.champ_data.splash_icon})`,
                backgroundRepeat: 'noRepeat',
                backgroundSize: '200px 400px',
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
                height: '400px',
                flexShrink: 0,
                transition: ' all 100ms ease-out',
                }}
                id="championCard"
                onClick={()=>props.set_selected_champion(props.champ_data)}
                whileTap={{ scale: 0.97 }}
            >
                <p className={styles.card_text}>{props.champ_data.name}</p>
                <div className={styles.card_footer}>
                    <div className={styles.health_row}>
                        <img 
                            src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                            className={styles.stat_icon}
                        />
                        <p className={styles.stat_text}>{props.champ_data.health.flat}</p>
                    </div>
                    <div className={styles.bottom_stats}>
                        <div className={styles.statistic_column}>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{props.champ_data.attackDamage.flat}</p>
                            </div>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{props.champ_data.armor.flat}</p>
                            </div>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{props.champ_data.attackSpeed.flat}</p>
                            </div>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>0</p>
                            </div>
                        </div>

                        <div className={styles.statistic_column}>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>0</p>
                            </div>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{props.champ_data.magicResistance.flat}</p>
                            </div>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>0</p>
                            </div>
                            <div className={styles.statistic_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{props.champ_data.movespeed.flat}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.span>
        </div>
    );
};

export default ChampionComponent;