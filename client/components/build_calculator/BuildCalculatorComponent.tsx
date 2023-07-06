import React, { useState, useEffect } from 'react';
import styles from "./BuildCalculatorComponent.module.css";

export default function BuildCalculator(props: any) {

    useEffect(() => {
    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.info_section}>
                <div className={styles.info_section_text}>
                    <p>
                        To add items to the build, drag items from the left pane to the center section.
                        Information regarding your current build will update in real-time on the right.
                    </p>
                
                </div>
            </div>

            <div className={styles.build_section}>
                <div className={styles.search}>

                </div>

                <div className={styles.current_build}>

                </div>

                <div className={styles.build_data}>

                </div>
            </div>

        </div>
    )
}
