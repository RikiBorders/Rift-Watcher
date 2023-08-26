import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from "./Carousel.module.css";
import ItemComponent from './ItemComponent'

export default function Carousel(props: any) {
  const [current, setCurrent] = useState(0);
  const [itemLists, setItemLists] = useState<any>([]) 

  const nextSlide = () => {
    setCurrent(current === itemLists.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? itemLists.length - 1 : current - 1);
  };

  const jump_to_index = (index: number) => {
    setCurrent(index)
  }
  const load_item_lists = () => {
    // create the item list components that will be displayed to the user.
    // The actual rendering of these lists is delegated to the carousel component
    let health_items: Array<any> = [];
    let attackDamage_items: Array<any> = [];
    let abilityPower_items: Array<any> = [];
    let attackSpeed_items: Array<any> = [];
    let armor_items: Array<any> = [];
    let magicResist_items: Array<any> = [];
    let criticalChance_items: Array<any> = [];
    let abilityHaste_items: Array<any> = [];
    let nonboots_movement: Array<any> = [];
    let boots: Array<any> = [];

    let item_list: Array<any> = [];
    let category_to_list_map: any = {
      'Health': health_items,
      'Damage': attackDamage_items,
      'SpellDamage': abilityPower_items,
      'AttackSpeed': attackSpeed_items,
      'Armor': armor_items,
      'SpellBlock': magicResist_items,
      'CriticalStrike': criticalChance_items,
      'AbilityHaste': abilityHaste_items,
      'NonbootsMovement': nonboots_movement,
      'Boots': boots
    }

    props.items.forEach((item: any) => {
        const categories = item.categories
        const available = item.availability

        if (categories && available) {
          categories.forEach((category: string) => {
            if (category && available){
              const itemList = category_to_list_map[category]
              if (itemList && !itemList.includes(item.name)){
                itemList.push(item)
              }
            }
          })
        }
    })
    let movement_items = category_to_list_map['NonbootsMovement'].concat(category_to_list_map['Boots'])
    
    item_list.push(
        <div className={styles.carousel_list_view}>
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodshealthscalingicon.png',
            category_to_list_map['Health']
          )}
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsarmoricon.png',
            category_to_list_map['Armor']
          )}
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmagicresicon.png',
            category_to_list_map['SpellBlock']
          )}
        </div>
    )
    item_list.push(
        <div className={styles.carousel_list_view}>
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackdamageicon.png',
            category_to_list_map['Damage']
          )}
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsabilitypowericon.png',
            category_to_list_map['SpellDamage']
          )}
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodscdrscalingicon.png',
            category_to_list_map['AbilityHaste']
          )}
        </div>
    )
    item_list.push(
        <div className={styles.carousel_list_view}>
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsattackspeedicon.png',
            category_to_list_map['AttackSpeed']
          )}
          {render_item_section(
            'https://raw.communitydragon.org/pbe/game/assets/ux/floatingtext/criticon.png',
            category_to_list_map['CriticalStrike']
          )}
          {render_item_section(
            'https://raw.communitydragon.org/latest/game/assets/perks/statmods/statmodsmovementspeedicon.png',
            movement_items
          )}
        </div>
    )
    setItemLists(item_list)
  }

  const render_item_section = (icon: string, item_list: any) => {
    return(
      <div className={styles.item_section}>
        <div className={styles.item_section_title}>
            <img 
                src={icon} 
                className={styles.item_section_icon}
            />
            <div className={styles.horizontal_spacer_large} />
        </div>
        {render_item_table(item_list)}
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
                            <ItemComponent item={item} add_item={props.add_item}/>
                        )
                    })}
                </div>
            )
        })}
    </div>
    )
  }

  useEffect(() => {
    load_item_lists()
  }, [])
  return (
    <div className={styles.slider}>
      <div className={styles.vertical_spacer} />
      <h1 className={styles.carousel_header}>Item List</h1>
      <div className={styles.button_div}>
        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.page_button} onClick={prevSlide} src='/arrow_left.png'/>
        <motion.img 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
          className={styles.radio_button} 
          onClick={() => {jump_to_index(0)}} 
          src={current == 0 ? '/radio_button_selected.png' : '/radio_button.png'}
        />
        <motion.img 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
          className={styles.radio_button} 
          onClick={() => {jump_to_index(1)}} 
          src={current == 1 ? '/radio_button_selected.png' : '/radio_button.png'}
        />
        <motion.img 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
          className={styles.radio_button} 
          onClick={() => {jump_to_index(2)}} 
          src={current == 2 ? '/radio_button_selected.png' : '/radio_button.png'}
        />
        <motion.img 
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} 
          className={styles.page_button} 
          onClick={nextSlide} 
          src='/arrow_right.png'
        />
      </div>
      <div className={styles.vertical_spacer_small} />
      <div className={styles.content_div}>
        {itemLists.map((item_list: any, index: number) => {
          if (index === current){
            return (
              item_list
            );}
        })}
      </div>
    </div>
  );
};
