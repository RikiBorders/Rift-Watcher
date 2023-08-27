import styles from "./MessageBox.module.css"

export default function MessageBox(props: any) {
    // Valid message box types: [Info, Alert, Warning]

    const render_box = () => {
        let image_icon = '/warning_alt.png'
        if (props.type == 'Warning'){
            image_icon = '/warning_2_alt.png'
        } else if (props.type == 'Info') {
            image_icon = '/help_alt.png'
        }
        return(
            <div className={styles[props.type]}>
                <div className={styles.message_header_container}>
                    <img src={image_icon} className={styles.message_icon}/>
                    <p className={styles.message_text}>{props.message}</p>
                </div>
            </div>
        )
    }

    return(
        <div style={{margin: '5px', padding: 0, cursor: 'pointer'}}>
             {render_box()}
        </div>
    )
}