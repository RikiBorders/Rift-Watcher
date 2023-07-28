import styles from "./ChampionComponent.module.css";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';

const ChampionComponent = (props: any) => {
    useEffect(() => {
        console.log(props)
    }, [])
    return (
        <div style={{
            backgroundImage: `url(${props.champ_data.splash_icon})`,
            backgroundRepeat: 'noRepeat',
            backgroundSize: '200px 400px',
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            height: '400px',
            flexShrink: 0,
        }}
        onClick={()=>props.set_selected_champion(props.champ_data)}>
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
    );
};

export default ChampionComponent;