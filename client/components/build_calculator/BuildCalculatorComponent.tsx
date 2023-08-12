import React, { useState, useEffect } from 'react';
import styles from "./BuildCalculatorComponent.module.css";
import ChampionSelectionModal from './ChampionSelectionModal';
import ItemComponent from './ItemComponent'
import SelectedItemComponent from './SelectedItemComponent'
import UnselectedItemComponent from './UnselectedItemComponent'

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
                                    <p className={styles.stat_text}>{attack_damage}</p>
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
                                    <p className={styles.stat_text}>{attack_speed}</p>
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
                                        src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
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
            console.log(item)
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
                                <p className={styles.stat_text}>{attack_damage}</p>
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
                                    src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
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

    const render_item_list = () => {
        let health_items: Array<any> = [];
        let attackDamage_items: Array<any> = [];
        let abilityPower_items: Array<any> = [];
        let attackSpeed_items: Array<any> = [];
        let armor_items: Array<any> = [];
        let magicResist_items: Array<any> = [];
        let criticalChance_items: Array<any> = [];
        let abilityHaste_items: Array<any> = [];
        let movement_items: Array<any> = [];

        props.calculator_data.items.forEach((item: any) => {
            const categories = item.categories
            const available = item.availability
            
            if (categories 
                && categories.includes('Health') 
                && available == true
                && !health_items.includes(item.name)
            ){
                health_items.push(item)
            }
            if (categories 
                && categories.includes('SpellBlock') 
                && available == true
                && !magicResist_items.includes(item.name)
            ){
                magicResist_items.push(item)
            }
            if (categories 
                && categories.includes('Damage') 
                && available == true
                && !attackDamage_items.includes(item.name)
            ){
                attackDamage_items.push(item)
            }
            if (categories 
                && categories.includes('SpellDamage') 
                && available == true
                && !abilityPower_items.includes(item.name)
            ){
                abilityPower_items.push(item)
            }
            if (categories 
                && categories.includes('AttackSpeed') 
                && available == true
                && !attackSpeed_items.includes(item.name)
            ){
                attackSpeed_items.push(item)
            }
            if (categories 
                && categories.includes('Armor') 
                && available == true
                && !armor_items.includes(item.name)
            ){
                armor_items.push(item)
            }
            if (categories 
                && categories.includes('CriticalStrike') 
                && available == true
                && !criticalChance_items.includes(item.name)
            ){
                criticalChance_items.push(item)
            }
            if (categories 
                && categories.includes('AbilityHaste') 
                && available == true
                && !abilityHaste_items.includes(item.name)
            ){
                abilityHaste_items.push(item)
            }
            if (categories 
                && (categories.includes('NonbootsMovement') 
                || categories.includes('Boots')) && available == true
                && !movement_items.includes(item.name)
            ){
                movement_items.push(item)
            }
        })

        return(
            <div className={styles.item_list_container}>
                <h2 className={styles.build_stats_subheader}>Items</h2>
                <div className={styles.invisible_spacer} />
                <div className={styles.item_lists}>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(health_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(armor_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.magicresist_fix.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(magicResist_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(attackDamage_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(abilityPower_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(abilityHaste_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(attackSpeed_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(criticalChance_items)}
                    </div>
                    <div className={styles.item_section}>
                        <div className={styles.item_section_title}>
                            <img 
                                src='https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png' 
                                className={styles.item_section_icon}
                            />
                            <div className={styles.horizontal_spacer_large} />
                        </div>
                        {render_item_table(movement_items)}
                    </div>

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
        if (build.length == 6){
            console.log('All build slots occuppied')
        } else {
            let new_build = [...build]
            new_build.push(item)
            setBuild(new_build)
        }
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

    const render_item_table = (item_list: Array<any>[any]) => {
        const row_size = 6;
        let count = 0;
        let list_rows: Array<any> = [[]]

        item_list.forEach((item: any) => {
            if (count == row_size ){
                count = 0
                list_rows.push([])
            }
            list_rows[list_rows.length-1].push(item)
            count += 1
        })

        return(
        <div className={styles.item_list}>
            {list_rows.map((row: any) => {
                return(
                    <div className={styles.item_row}>
                        {row.map((item: any) => {
                            return(
                                <ItemComponent item={item} add_item={add_item}/>
                            )
                        })}
                    </div>
                )
            })}
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
                item = <SelectedItemComponent item={build[i]}/>
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
                    {render_champion_base_stats()}
                    {render_selected_champion()}
                    {render_build_stats()}
                    {render_build()}
                </div>
            </div>
            <div className={styles.calculator_row}>
                {render_item_list()}
            </div>

        </div>
    )
}
