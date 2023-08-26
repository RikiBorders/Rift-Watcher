import React, { useState, useEffect, useRef } from 'react';
import styles from "./BuildCalculatorComponent.module.css";
import ChampionSelectionModal from './ChampionSelectionModal';
import ItemComponent from './ItemComponent'
import SelectedItemComponent from './SelectedItemComponent'
import UnselectedItemComponent from './UnselectedItemComponent'
import Carousel from './Carousel'
import CostBreakdownItemCard from './CostBreakdownItemCard'
import { motion } from "framer-motion";

export default function BuildCalculator(props: any) {
    const [showChampionSelectionModal, setChampionSelectionModal] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [targetChampionSelected, setTargetChampionSelected] = useState(false)
    const [itemSearchQuery, setItemSearchQuery] = useState('')
    const [championLevel, setChampionLevel] = useState(1)

    const [targetChampion, setTargetChampion] = useState({
        'icon_path': '',
        'splash_icon': '/default_champ_splash.png',
        'name': '',
        'roles': [],
        'difficulty': 0,
        'damage_style': '',
        'health':{'flat': 0, 'perLevel': 0},
        'healthRegen':{'flat': 0, 'perLevel': 0},
        'manaRegen':{'flat': 0, 'perLevel': 0},
        'attackDamage': {'flat': 0, 'perLevel': 0}, 
        'attackSpeed': {'flat': 0, 'perLevel': 0}, 
        'armor': {'flat': 0, 'perLevel': 0},
        'magicResistance': {'flat': 0, 'perLevel': 0},
        'movespeed': {'flat': 0, 'perLevel': 0},
        'abilities': {
            'P': [],
            'Q': [{'name': '', 'icon': ''}],
            'W': [{'name': '', 'icon': ''}],
            'E': [{'name': '', 'icon': ''}],
            'R': [{'name': '', 'icon': ''}],
        }
    })
    const [build, setBuild] = useState<any>([]) 
    const stateRef  = useRef<any>();
    stateRef.current = build;
    
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

        if (!targetChampion.name){
            return 'Default'
        }

        if (name[name.length-1] == 's'){
            return name+"'"
        } else if (name != '') {
            return name+"'s"  
        }
    }

    const update_level = (action: number) => {
        if (action == 1 && championLevel < 18){
            setChampionLevel(championLevel+1)
        } else if (action == 0 && championLevel > 1){
            setChampionLevel(championLevel-1)
        }
    }

    const render_champion_base_stats = () => {
        let health = targetChampion.health.flat + (targetChampion.health.perLevel*(championLevel-1))
        let attack_damage = targetChampion.attackDamage.flat + (targetChampion.attackDamage.perLevel*(championLevel-1))
        let armor = targetChampion.armor.flat
        let magic_resist = targetChampion.magicResistance.flat + (targetChampion.magicResistance.perLevel*(championLevel-1))
        let attack_speed = targetChampion.attackSpeed.flat + (targetChampion.attackSpeed.perLevel*(championLevel-1))
        let movement_speed = targetChampion.movespeed.flat + (targetChampion.movespeed.perLevel*(championLevel-1))
        let health_regen = targetChampion.healthRegen.flat + (targetChampion.healthRegen.perLevel*(championLevel-1))
        let mana_regen = targetChampion.manaRegen.flat + (targetChampion.manaRegen.perLevel*(championLevel-1))

        return (
            <div className={styles.vertical_aligned_div}>
                <div className={styles.base_stats_container}>
                    <h2 className={styles.base_stats_header}>{process_base_stats_name()}</h2>
                    <h2 className={styles.base_stats_header}>Base Stats</h2>
                    <div className={styles.base_stats}>
                        <div className={styles.health_row}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{health}</p>
                        </div>  
                        <div className={styles.base_stats_2}>
                            <div className={styles.stat_column}>                    
                                <div className={styles.stat_element}>
                                    <img 
                                        src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>{Math.round(attack_damage)}</p>
                                </div>
                                <div className={styles.stat_element}>
                                    <img 
                                        src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>{armor}</p>
                                </div>
                                <div className={styles.stat_element}>
                                    <img 
                                        src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>{Math.round(attack_speed*100)/100}</p>
                                </div>
                                <div className={styles.stat_element}>
                                    <img 
                                        src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>0</p>
                                </div>
                                <div className={styles.stat_element}>
                                    <img 
                                        src='stat_icons/hp_regen.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>{Math.round(health_regen*10)/10}</p>
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
                                        src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>{Math.round(magic_resist)}</p>
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
                                    <p className={styles.stat_text}>{movement_speed}</p>
                                </div>
                                <div className={styles.stat_element}>
                                    <img 
                                        src='stat_icons/mana_regen.png' 
                                        className={styles.stat_icon}
                                    />
                                    <p className={styles.stat_text}>{Math.round(mana_regen*10)/10}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const render_champion_build_stats = () => {
        let health = targetChampion.health.flat + (targetChampion.health.perLevel*(championLevel-1))
        let attack_damage = targetChampion.attackDamage.flat + (targetChampion.attackDamage.perLevel*(championLevel-1))
        let ability_power = 0
        let armor = targetChampion.armor.flat
        let magic_resist = targetChampion.magicResistance.flat + (targetChampion.magicResistance.perLevel*(championLevel-1))
        let attack_speed = targetChampion.attackSpeed.flat + (targetChampion.attackSpeed.perLevel*(championLevel-1))
        let ability_haste = 0
        let critical_chance = 0
        let movement_speed = targetChampion.movespeed.flat + (targetChampion.movespeed.perLevel*(championLevel-1))
        let health_regen = targetChampion.healthRegen.flat + (targetChampion.healthRegen.perLevel*(championLevel-1))
        let mana_regen = targetChampion.manaRegen.flat + (targetChampion.manaRegen.perLevel*(championLevel-1))

        build.forEach((item: any) => {
            health += item.stats.health
            attack_damage += item.stats.attack_damage
            ability_power += item.stats.ability_power
            armor += item.stats.armor
            magic_resist += item.stats.magic_resist
            attack_speed += item.stats.attack_speed
            ability_haste += item.stats.ability_haste
            critical_chance += item.stats.critical_chance
            movement_speed += item.stats.movement_speed
            health_regen += item.stats.health_regen
            mana_regen += item.stats.mana_regen

        })

        return (
            <div className={styles.base_stats_container}>
                <div className={styles.base_stats}>
                    <div className={styles.health_row}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                className={styles.stat_icon}
                            />
                            <p className={styles.stat_text}>{health}</p>
                    </div>  
                    <div className={styles.build_stats_2}>
                        <div className={styles.stat_column}>                    
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{Math.round(attack_damage)}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{armor}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{Math.round(attack_speed*100)/100} ({Math.round(attack_speed* 100)}%)</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{Math.round(critical_chance* 100)}%</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='stat_icons/hp_regen.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{Math.round(health_regen*10)/10}</p>
                            </div>
                        </div>
                        <div className={styles.stat_column}>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{ability_power}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{Math.round(magic_resist)}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{ability_haste}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{movement_speed}</p>
                            </div>
                            <div className={styles.stat_element}>
                                <img 
                                    src='stat_icons/mana_regen.png' 
                                    className={styles.stat_icon}
                                />
                                <p className={styles.stat_text}>{Math.round(mana_regen*10)/10}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.level_container}>
                    <p className={styles.build_stats_subheader}>Level: </p>
                    <p className={styles.champion_level_text}>{championLevel}</p>
                    <div className={styles.level_buttons}>
                        <motion.img 
                            className={styles.level_button} 
                            onClick={(() => update_level(1))}
                            src="up_arrow_button.png"
                            whileTap={{ scale: 0.8 }}
                        />
                        <motion.img 
                            className={styles.level_button} 
                            onClick={(() => update_level(0))}
                            src="down_arrow_button.png"
                            whileTap={{ scale: 0.8 }}
                        />
                    </div>
                </div>
            </div>
        )  
    }

    const render_selected_champion = () => {
        return(
            <div className={styles.vertical_aligned_div}>
                <div className={styles.selected_champion_container}>
                    <img className={styles.selected_champion_portrait} src={targetChampion.splash_icon} />
                    <button 
                        className={styles.champion_selection_button} 
                        onClick={() => {open_modal()}}
                    >
                        Select Champion
                    </button>
                </div>

            </div>
        )
    }

    const handleItemInputChange = (event: any) => {
        event.preventDefault();
        setItemSearchQuery(event.target.value)
    }

    const render_search_results = () => {
        let matched_items: Array<any> = []
        if (itemSearchQuery != ''){
            props.calculator_data.items.forEach((item: any) => {
                if (item.name.toLowerCase().substring(0, itemSearchQuery.length) == itemSearchQuery.toLowerCase() ||
                    (item.name.toLowerCase().includes(itemSearchQuery.toLowerCase()) && itemSearchQuery.length > 3)
                ){
                    matched_items.push(item)
                }
            })
        }
        matched_items.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        matched_items = matched_items.sort()

        return(
            <div className={styles.item_search_results}>
                {matched_items.map((item) => (
                    <ItemComponent item={item} add_item={add_item} />
                ))}
            </div>
        )
    }

    const add_item = (item: any) => {
        if (build.length >= 6){
            console.log('All build slots occuppied')
        } else {
            let new_build = [...stateRef.current]
            new_build.push(item)
            setBuild(new_build)
        }
    }

    const delete_item = (item_index: any) => {
        let new_build = [...build]
        new_build.splice(item_index, 1)
        setBuild(new_build)
    }

    const render_item_searchbar = () => {
        return (
            <div className={styles.item_searchbar_container}>
                <h2 className={styles.build_stats_subheader}>Item Search</h2>
                <form className={styles.search_form}>
                    <input
                        className={styles.search_input}
                        type="text"
                        placeholder='Enter item here'
                        defaultValue=''
                        onChange={handleItemInputChange}
                    />
                </form>
                {render_search_results()}
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

    const render_build = () => {
        const row_1 = []
        const row_2 = []

        for(let i=0; i < 6; i++){
            let item = <UnselectedItemComponent/>
            if (i < build.length){
                item = <SelectedItemComponent item={build[i]} delete_item={delete_item} build_index={i}/>
            }
            if (i < 3){
                row_1.push(item)
            } else {
                row_2.push(item)
            }
        }

        return(
            <div className={styles.build_container}>
                <div className={styles.build_items}>
                    <div className={styles.build_row}>
                        {
                            row_1.map((item_component: any) => (
                                item_component
                            ))
                        }
                    </div>
                    <div className={styles.small_invisible_spacer}/>
                    <div className={styles.build_row}>
                        {
                            row_2.map((item_component: any) => (
                                item_component
                            ))
                        }
                    </div>
                </div>
                <div className={styles.build_buttons}>
                    <button 
                        className={styles.reset_button}
                        onClick={() => setBuild([])}
                    >
                        Reset
                    </button>
                </div>
            </div>
        )
    }

    const render_cost_breakdown = () => {
        return (
            <div className={styles.cost_breakdown_container}>
                <h1 className={styles.base_stats_header}>Build Cost Breakdown</h1>
                <div className={styles.cost_breakdown_item_container}>
                        
                    <div className={styles.item_cost_container}>
                        {build.map((item_data: any, index: number) => {
                            return(
                                <CostBreakdownItemCard index={index} item_data={item_data} />
                            )
                        })}
                    </div>
                </div>
                <div className={styles.total_cost_info}>
                    <p className={styles.total_cost_text}>Total Build Cost: </p>
                    <div style={{marginLeft: '10px'}}/>
                    <img src='/gold_icon.png' className={styles.total_gold_icon}/>
                    <p className={styles.total_cost_text}>{calculate_total_cost()}</p>
                </div>
            </div>

        )
    }

    const calculate_total_cost = () => {
        let total_cost = 0; 
        build.forEach((item: any) => {
            total_cost += item.price
        })
        return total_cost
    }

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
                {render_item_searchbar()}
            </div>
            <div className={styles.calculator_row}>
                <div className={styles.build_info}>
                    <div style={{display: 'flex'}}>
                        {render_champion_base_stats()}
                        {render_selected_champion()}
                        {render_build_stats()}
                    </div>
                    {render_build()}
                    {render_cost_breakdown()}
                </div>
            </div>
            <div className={styles.calculator_row}>
                <Carousel items={props.calculator_data.items} add_item={add_item} />
            </div>

        </div>
    )
}
