import React, { use, useState, useEffect } from 'react';
import styles from "./MessageBox.module.css"


export default function MessageBox(props: any) {
    // Valid message box types: [Info, Alert, Warning]

    const render_box = () => {
        const box_style = `styles.${props.type}`
        const box_header = props.type
        return(
            <div className={box_style}>
                <img/>
                <h1>{props.type}</h1>
                <p className={styles.message_text}>{props.message}</p>
            </div>
        )
    }

    return(
        <div style={{margin: 0, padding: 0}}>
            {render_box()}
        </div>
    )
}