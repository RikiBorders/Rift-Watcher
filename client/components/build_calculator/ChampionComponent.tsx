import styles from "./ChampionComponent.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionComponent = (props: any) => {

    function map(mouse_pos: number, minA: number, maxA: number, minB: number, maxB: number) {
        return minB + ((mouse_pos - minA) * (maxB - minB)) / (maxA - minA);
    }

    function Card3D(card: any, event: any) {
        let card_content = card.querySelector('#championCard') as HTMLElement;
        if (card_content != null) {
            let imgRect = card.getBoundingClientRect();
            let width = imgRect.width;
            let height = imgRect.height;
            let mouseX = event.clientX - card.offsetLeft;
            let mouseY = event.clientY - card.offsetTop;
            let rotateY = map(mouseX, 0, width, -25, 25);     //this dictates horizontal tilt           
            let rotateX = map(mouseY, 0, height, 25, -25);    //this dictates vertical tilt
            let brightness = map(mouseY, 0, height, 1.5, 0.5);
            
            card_content!.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card_content!.style.filter = `brightness(${brightness})`;
        }
      }
      

    useEffect(() => {
        const card = document.getElementById('3dchampChard');
        card?.addEventListener('mousemove', (ev) => {
            Card3D(card, ev);
        });
        card?.addEventListener('mouseleave', (ev) => {
            let card_view = card.querySelector('#championCard') as HTMLElement;
            if (card_view != null){
                (card_view as HTMLElement).style.transform = 'rotateX(0deg) rotateY(0deg)';
                (card_view as HTMLElement).style.filter = 'brightness(1)';
            }
          })
    }, [])
    return (
        <div 
            className={styles.card3d}
            id="3dchampChard"
        >
            <div style={{
                backgroundImage: `url(${props.champ_data.splash_icon})`,
                backgroundRepeat: 'noRepeat',
                backgroundSize: '200px 400px',
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
                height: '400px',
                flexShrink: 0,
                // transition: ' all 500ms ease-out',
                }}
                id="championCard"
                onClick={()=>props.set_selected_champion(props.champ_data)}
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
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
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
            </div>
        </div>
    );
};

export default ChampionComponent;