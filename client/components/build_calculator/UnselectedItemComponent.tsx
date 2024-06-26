import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import styles from "./ItemComponent.module.css";

export default function ItemComponent() {
    const myRef = useRef<any>(null);
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipCords, setTooltipCords] = useState([0,0])

    const render_tooltip = () => {
        if (showTooltip){
            return (
                <></>
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
                    src="/item_frame.png"
                    className={styles.item_img} 
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.15 }}
                    onMouseEnter={(event) => handleHover(event, true)}
                    onMouseLeave={(event) => handleHover(event, false)}
                />
            </div>
            {render_tooltip()}
        </motion.div>
    )
}