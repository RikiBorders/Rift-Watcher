import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import styles from "./ItemComponent.module.css";

export default function ItemComponent(props: any) {
    const myRef = useRef<any>(null);
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipCords, setTooltipCords] = useState([0,0])

    const render_tooltip = () => {
        if (showTooltip){
            return (
                <div style={{
                    position: 'absolute',
                    left: `${tooltipCords[0]}px`,
                    right: `${tooltipCords[1]}px`,
                    zIndex: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    width: '200px',
                    height: '350px',
                }}>
                    <div className={styles.tootlip_header}>
                        <img src={props.item.icon_path} className={styles.tooltip_item_img} />
                        <h3 className={styles.tooltip_header_text}>{props.item.name}</h3>
                    </div>
                    <p className={styles.tooltip_stat_text}>test stat</p>
                </div>
            )
        } else {
            return (
                <></>
            )
        }
    }

    const handleHover = (event: any, visible: boolean) => {
        setShowTooltip(visible)
        let item_bounding = myRef.current.getBoundingClientRect()
        let mouseX = item_bounding.left;
        let mouseY = item_bounding.top;
        setTooltipCords([mouseX, mouseY])
    }

    return (
        <motion.div className={styles.item_container} ref={myRef}>
            <div className={styles.item_content}>
                <motion.img 
                    src={props.item.icon_path} 
                    className={styles.item_img} 
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.15 }}
                    onMouseEnter={(event) => handleHover(event, true)}
                    onMouseLeave={(event) => handleHover(event, false)}
                />
                <p className={styles.item_text}>{props.item.name}</p>
            </div>
            {render_tooltip()}
        </motion.div>
    )
}