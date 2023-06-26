import React, { use, useState, useEffect } from 'react';
import styles from "./MatchCard.module.css";

export default function MatchCard(props: any) {

    const toTitleCase = (string: string) => {
        return string.replace(
            /\w\S*/g,
            function(txt: string) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
    }

    const render_position_icon = () => {
        const position = (props.match_data.target_summoner_info.position).toLowerCase()
        let position_icon = (<></>)
        if (['bottom', 'support', 'jungle', 'middle', 'top'].includes(position)){
            position_icon = (<img className={styles.position_icon} src={`/position_icons/position-${position}.png`} />)
        }

        return position_icon
    }

    const render_rank_icon = () => {
        const rank = props.match_data.average_ranks.combined_avg.toLowerCase();
        let ranked_icon = (<></>)
        if (rank.includes("iron")) {
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-iron.png" />)
        } else if (rank.includes("bronze")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-bronze.png" />)
        } else if (rank.includes("silver")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-silver.png" />)
        } else if (rank.includes("gold")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-gold.png" />)
        } else if (rank.includes("platinum")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-platinum.png" />)
        } else if (rank.includes("diamond")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-diamond.png" />)
        } else if (rank.includes("master")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-master.png" />)
        } else if (rank.includes("grandmaster")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-grandmaster.png" />)
        } else if (rank.includes("challenger")){
          ranked_icon = (<img className={styles.ranked_icon} src="/ranked_icons/emblem-challenger.png" />)
        }
        return ranked_icon
    }

    const render_win = () => {
        if (props.match_data.target_summoner_info.win){
            return (
                <p className={styles.win_icon}>Victory</p>
            )
        } else {
            return (
                <p className={styles.loss_icon}>Defeat</p>
            )
        }

    }

    const render_meta_info = () => {
        console.log(props)
        return(
            <div style={{
                display: "flex",
                columnGap: "2vw",
                backgroundPosition: "center",
                backgroundImage: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${toTitleCase(props.match_data.target_summoner_info.champion)}_0.jpg`
            }}>
                <div className={styles.meta_summoner_info_section_left}>
                    <h2 className={styles.gamemode_text}>
                        {props.match_data.queue_type}
                    </h2>
                    <p className={styles.meta_summoner_text}>
                        {props.match_data.target_summoner_info.champion}
                    </p>
                    <p className={styles.meta_summoner_text}>
                        {toTitleCase(props.match_data.target_summoner_info.position)}
                    </p>
                    <p className={styles.match_length_text}>
                        {`${Math.round(props.match_data.match_length)} Minutes`}
                    </p>


                </div>

                <div className={styles.meta_summoner_info_section_right}>
                    {render_win()}
                    {render_position_icon()}
                    <div className={styles.rank}>
                        {render_rank_icon()}
                        <p className={styles.meta_summoner_text}>
                            {props.match_data.target_summoner_info.rank}
                        </p>
                        <p className={styles.sub_header}>Avg Rank</p>
                    </div>

                </div>
            </div>
        )
    }

    const render_match_info = () => {
        return (
            <div className={styles.match_info_section}>

            </div>

        )
    }

    return (
        <div className={styles.card_container}>
            {render_meta_info()}
            {render_match_info()}

        </div>
    )
}
