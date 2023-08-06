import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from "./ItemComponent.module.css";

export default function ItemComponent(props: any) {
    const [showTooltip, setShowTooltip] = useState(false)

    const render_tooltip = () => {
        if (showTooltip){
            return (
                <div className={styles.tooltip_container}>

                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    return (
        <motion.div className={styles.item_container}>
            <div>
                <motion.img 
                    src={props.item.icon_path} 
                    className={styles.item_img} 
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.15 }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                />
                <p className={styles.item_text}>{props.item.name}</p>
            </div>
            {render_tooltip()}
        </motion.div>
    )
}