import React, { useState, useEffect } from 'react';
import styles from './CostBreakdownItemCard.module.css'
import { motion } from "framer-motion";
import Image from "next/image"

export default function CostBreakdownItemCard(props: any) {
    const [showDropdown, setShowDropdown] = useState(false)

    const handleClick = () => {
        if (showDropdown){
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }
    }

    const calculate_total_cost = (item: any) => {
        let cost = item.price
        item.subitems.forEach((sub_item: any) => {
            cost += calculate_total_cost(sub_item)
        })

        return cost
    }

    const render_dropdown = () => {
        if (showDropdown){
            return (
                <div className={styles.dropdown_container}>
                    <h3 className={styles.dropdown_header}>Item Components</h3>
                    <div className={styles.component_container}>
                        {render_dropdown_layer(props.item_data.subitems, 1)}
                    </div>
                </div>
            )
        } else {
            return (<></>)
        }
    }

    const render_dropdown_layer = (components: any, layer: number) => {
        if (components){
            const layer_indent = 20*layer
            return(
                components.map((sub_item: any, index: number) => {
                    return(
                        <div className={styles.dropdown_layer_item} key={sub_item.id}>
                            <div 
                                className={styles.sub_item_container} 
                                style={{marginLeft: `${layer_indent}px`, backgroundColor: '#0e0e0e9d'}}
                            >
                                <motion.img className={styles.subitem_img} src={sub_item.icon_path} />
                                <h4 className={styles.sub_item_header}>{sub_item.name}</h4>
                                <div className={styles.content_right}>
                                    <p className={styles.item_cost_text}>{calculate_total_cost(sub_item)}</p>
                                    <Image src='/gold_icon.png' className={styles.gold_icon} alt="" width="20" height="20"/>
                                </div>
                            </div>
                            {render_dropdown_layer(sub_item.subitems, layer+1)}
                        </div>
                    )
                })
            )
        } else {
            return(<></>)
        }
    }

    return(
        <div className={(props.index+1)%2 == 0 ? styles.cost_item_row_1 : styles.cost_item_row_2}>
            <div className={styles.cost_item_content}>
                <motion.img className={styles.item_cost_img} src={props.item_data.icon_path} />
                <h2 className={styles.item_cost_name}>{props.item_data.name}</h2>
                <div className={styles.content_right}>
                    <p className={styles.item_cost_text}>{calculate_total_cost(props.item_data)}</p>
                    <Image src='/gold_icon.png' className={styles.gold_icon} alt="" width="20" height="20"/>
                    {props.item_data.subitems.length > 0 ? 
                        <Image src='/arrow_down.png' 
                            onClick={() => {handleClick()}} 
                            className={styles.dropdown_arrow}
                            alt=""
                            width="20"
                            height="20"
                        /> :
                        <div style={{marginRight: '20px'}}/>
                    }
                </div>
            </div>
            {render_dropdown()}
        </div>
    )
}