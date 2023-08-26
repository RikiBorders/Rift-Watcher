import React, { useState, useEffect } from 'react';
import styles from './CostBreakdownItemCard.module.css'
import { motion } from "framer-motion";

export default function CostBreakdownItemCard(props: any) {
    const [showDropdown, setShowDropdown] = useState(false)
    const [tooltipCords, setTooltipCords] = useState([0,0])

    const handleClick = () => {
        if (showDropdown){
            setShowDropdown(false);
        } else {
            setShowDropdown(true);
        }
    }

    const render_dropdown = () => {
        if (showDropdown){
            return (
                <></>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return(
        <div className={(props.index+1)%2 == 0 ? styles.cost_item_row_1 : styles.cost_item_row_2}>
            <div className={styles.cost_item_content}>
                <motion.img className={styles.item_cost_img} src={props.item_data.icon_path} />
                <h2 className={styles.item_cost_name}>{props.item_data.name}</h2>
                <div className={styles.content_right}>
                    <p className={styles.item_cost_text}>{props.item_data.price}</p>
                    <img src='/gold_icon.png' className={styles.gold_icon}/>
                    <img src='/arrow_down.png' onClick={() => {handleClick()}} className={styles.dropdown_arrow}/>
                </div>
            </div>
            {render_dropdown()}
        </div>
    )
}