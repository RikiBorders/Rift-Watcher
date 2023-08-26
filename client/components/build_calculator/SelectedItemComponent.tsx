import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import styles from "./SelectedItemComponent.module.css";

export default function SelectedItemComponent(props: any) {
    const myRef = useRef<any>(null);
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipCords, setTooltipCords] = useState([0,0])
    const [showActionMenu, setShowActionMenu] = useState(false)
    const [showMoreMenu, setShowMoreMenu] = useState(false)


    const render_tooltip = () => {
        const has_ad = Boolean(props.item.stats.attack_damage)
        const has_ap = Boolean(props.item.stats.ability_power)
        const has_as = Boolean(props.item.stats.attack_speed)
        const has_health = Boolean(props.item.stats.health)
        const has_armor = Boolean(props.item.stats.armor)
        const has_mr = Boolean(props.item.stats.magic_resist)
        const has_hp_regen = Boolean(props.item.stats.health_regen)
        const has_mana = Boolean(props.item.stats.mana)
        const has_mana_regen = Boolean(props.item.stats.mana_regen)
        const has_armor_pen = Boolean(props.item.stats.armor_pen)
        const has_lethality = Boolean(props.item.stats.lethality)
        const has_magic_pen = Boolean(props.item.stats.magic_pen)
        const has_movement = Boolean(props.item.stats.movement_speed)
        const has_lifesteal = Boolean(props.item.stats.lifesteal)
        const has_ability_haste = Boolean(props.item.stats.ability_haste)
        const has_critical_chance = Boolean(props.item.stats.critical_chance)

        if (showTooltip){
            return (
                <div style={{
                    position: 'absolute',
                    zIndex: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    width: '200px',
                    height: 'fit-content',
                }}>
                    <div className={styles.tootlip_header}>
                        <img src={props.item.icon_path} className={styles.tooltip_item_img} />
                        <h3 className={styles.tooltip_header_text}>{props.item.name}</h3>
                    </div>
                    <div className={styles.horizontal_spacer} />
                    <div className={styles.tooltip_item_stats}>
                        {has_ad ?
                            <div>
                                <div className={styles.stat_row}>
                                    <img 
                                        src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                        className={styles.tooltip_stat_icon}
                                    />
                                    <p className={styles.tooltip_stat_text}>{props.item.stats.attack_damage} </p>
                                    <p className={styles.tooltip_stat_text_label}>Attack Damage</p>
                                </div> 
                            </div>: <></>
                        }
                        {has_critical_chance ?
                            <div>
                                <div className={styles.stat_row}>
                                    <img 
                                        src='/stat_icons/crit_chance.png' 
                                        className={styles.tooltip_stat_icon}
                                    />
                                    <p className={styles.tooltip_stat_text}>{Math.round(props.item.stats.critical_chance * 100)}%</p>
                                    <p className={styles.tooltip_stat_text_label}>Critical Chance</p>
                                </div> 
                            </div>: <></>
                        }
                        {has_lifesteal ?
                            <div>
                                <div className={styles.stat_row}>
                                    <img 
                                        src='/stat_icons/life_steal.png' 
                                        className={styles.tooltip_stat_icon}
                                    />
                                    <p className={styles.tooltip_stat_text}>{Math.round(props.item.stats.lifesteal * 100)}%</p>
                                    <p className={styles.tooltip_stat_text_label}>Lifesteal</p>
                                </div> 
                            </div>: <></>
                        }
                        {has_armor_pen ?
                            <div>
                                <div className={styles.stat_row}>
                                    <img 
                                        src='/stat_icons/armor_pen.png' 
                                        className={styles.tooltip_stat_icon}
                                    />
                                    <p className={styles.tooltip_stat_text}>{Math.round(props.item.stats.armor_pen * 100)}% </p>
                                    <p className={styles.tooltip_stat_text_label}>Armor Penetration</p>
                                </div> 
                            </div>: <></>
                        }
                        {has_lethality ?
                            <div>
                                <div className={styles.stat_row}>
                                    <p className={styles.lethality_tooltip_stat_text}>+{props.item.stats.lethality} </p>
                                    <p className={styles.tooltip_stat_text_label}>Lethality</p>
                                </div> 
                            </div>: <></>
                        }
                        {has_ap ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.ability_power} </p>
                                <p className={styles.tooltip_stat_text_label}>Ability Power</p>
                            </div> : <></>
                        }
                        {has_magic_pen ?
                            <div>
                                <div className={styles.stat_row}>
                                    <img 
                                        src='/stat_icons/magic_pen.png' 
                                        className={styles.tooltip_stat_icon}
                                    />
                                    <p className={styles.tooltip_stat_text}>{props.item.stats.magic_pen} </p>
                                    <p className={styles.tooltip_stat_text_label}>Magic Penetration</p>
                                </div> 
                            </div>: <></>
                        }

                        {has_mana ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='/stat_icons/mana.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.mana} </p>
                                <p className={styles.tooltip_stat_text_label}>Mana</p>
                            </div> : <></>
                        }
                        {has_mana_regen ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='/stat_icons/mana_regen.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.mana_regen} </p>
                                <p className={styles.tooltip_stat_text_label}>Mana Regen</p>
                            </div> : <></>
                        }
                        {has_ability_haste ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.ability_haste} </p>
                                <p className={styles.tooltip_stat_text_label}>Ability Haste</p>
                            </div> : <></>
                        }
                        {has_as ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{Math.round(props.item.stats.attack_speed * 100)}% </p>
                                <p className={styles.tooltip_stat_text_label}>Attack Speed</p>
                            </div> : <></>
                        }
                        {has_health ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.health} </p>
                                <p className={styles.tooltip_stat_text_label}>Health</p>
                            </div> : <></>
                        }
                        {has_hp_regen ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='/stat_icons/hp_regen.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.health_regen} </p>
                                <p className={styles.tooltip_stat_text_label}>Health Regen</p>
                            </div> : <></>
                        }
                        {has_armor ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.armor} </p>
                                <p className={styles.tooltip_stat_text_label}>Armor</p>
                            </div> : <></>
                        }
                        {has_mr ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.magic_resist} </p>
                                <p className={styles.tooltip_stat_text_label}>Magic Resist</p>
                            </div> : <></>
                        }    
                        {has_movement ?
                            <div className={styles.stat_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                    className={styles.tooltip_stat_icon}
                                />
                                <p className={styles.tooltip_stat_text}>{props.item.stats.movement_speed} </p>
                                <p className={styles.tooltip_stat_text_label}>Movement Speed</p>
                            </div> : <></>
                        }                      
                    </div>
                    
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const handleHover = (event: any, mouse_entered: boolean) => {
        
        if (mouse_entered && !showActionMenu){
            setShowTooltip(true)
            let item_bounding = myRef.current.getBoundingClientRect()
            let mouseX = item_bounding.left;
            let mouseY = item_bounding.top;
            setTooltipCords([mouseX, mouseY])
        } else {
            setShowTooltip(false)
            setShowActionMenu(false)
        }
    }

    const handle_delete = () => {
        setShowTooltip(false)
        setShowActionMenu(false)
        props.delete_item(props.build_index)
    }

    const toggle_show_more_menu = () => {
        if (showMoreMenu){
            setShowMoreMenu(false)
        } else {
            setShowMoreMenu(true)
            setShowTooltip(false)
            setShowActionMenu(false)
        }
    }

    const toggle_action_menu = () => {
        if (showActionMenu){
            setShowTooltip(true)
            setShowActionMenu(false)
        } else {
            setShowTooltip(false)
            setShowActionMenu(true)
        }
    }

    const render_action_menu = () => {
        if (showActionMenu){
            return(
                <div className={styles.action_menu}>
                    <button className={styles.action_button} onClick={() => {toggle_show_more_menu()}}>More info</button>
                    <button className={styles.action_button} onClick={() => {handle_delete()}}>Remove</button>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const render_show_more_modal = () => {
        if (!showMoreMenu){
            return(<></>)
        }

        let description = props.item.description
        let first_half = props.item.description
        let second_half = ''

        let index = null
        index = description.indexOf('Mythic Passive')
        if (index){
            first_half = description.substring(0, index)
            second_half = description.substring(index, description.length)
            description = first_half+'<br/>'+second_half
        }
        return (
            <div className={styles.show_more_modal}>
                <img 
                    src="/close_icon.png" 
                    onClick={() => {toggle_show_more_menu()}} 
                    className={styles.close_modal_icon}
                />
                <div className={styles.show_more_header}>
                    <img src={props.item.icon_path} className={styles.show_more_item_img}/>
                    <h2 className={styles.modal_header}>{props.item.name}</h2>
                </div>

                <div className={styles.show_more_section}>
                    <h3 className={styles.section_header}>Passive & Active Effects</h3>
                    <p className={styles.description_text}>{first_half}</p>
                    {second_half ? 
                        <p className={styles.description_text}>{second_half}</p> :
                        <></>
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            <motion.div 
                className={styles.item_container} 
                ref={myRef}
                onMouseEnter={(event) => handleHover(event, true)}
                onMouseLeave={(event) => handleHover(event, false)}
            >
                <div className={styles.item_content}>
                    <motion.img 
                        src={props.item.icon_path} 
                        className={styles.item_img} 
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.15 }}
    
                        onClick={() => toggle_action_menu()}
                    />
                    <p className={styles.item_text}>{props.item.name}</p>
                </div>
                {render_action_menu()}
                {render_tooltip()}
            </motion.div>
            {render_show_more_modal()}
        </div>
    )
}