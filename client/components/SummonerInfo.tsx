import React, { useState, useEffect } from 'react';
import styles from "./SummonerInfo.module.css"

export default function SummonerInfo(props: any) {

    const render_rank_icon = (summoner_rank: string) => {
        const rank = summoner_rank.toLowerCase();
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


    const render_rank = (queue_type: string) => {
        if (props.summonerData && queue_type == 'soloduo'){
        return (
            <div className={styles.rank_render}>
                <div className={styles.rank_text}>
                    <h3 className={styles.rank_title}>
                        {props.summonerData.summoner_account_data.solo_data.rank[0]} {props.summonerData.summoner_account_data.solo_data.rank[1]}
                    </h3>
                    <p className={styles.lp_number}>LP: {props.summonerData.summoner_account_data.solo_data.lp}</p>
                </div>
            </div>

        )} 
        else if (props.summonerData && queue_type == 'flex') {
        return(
            <div className={styles.rank_render}>
                <div className={styles.rank_text}>
                    <h3 className={styles.rank_title}>
                        {props.summonerData.summoner_account_data.flex_data.rank[0]} {props.summonerData.summoner_account_data.flex_data.rank[1]}
                    </h3>
                    <p className={styles.lp_number}>LP: {props.summonerData.summoner_account_data.flex_data.lp}</p>
                
                </div>
            </div>
        )} else {
        return null;
        }
    }

    const render_icon = () => {
        console.log(props.summonerData)
        if (props.summonerData){
        return (
            <img src={"http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/"+props.summonerData.summoner_account_data.profileIcon+".png"} className={styles.profile_image}/>
        )}
    }

    return (
        <div className={styles.summoner_info_container}>
            <div className={styles.account_info}>

                <div className={styles.summoner_info}>
                {render_icon()}
                <div className={styles.account_info_text}>
                    <h1 className={styles.header_text}>{props.router_query.username}</h1>
                    <h2 className={styles.account_info_region}>Region: {props.router_query.region}</h2>
                </div>
                </div>

                <div className={styles.rank_section}>
                <div className={styles.rank}>
                    <h3 className={styles.rank_label}>Solo/Duo Rank:</h3>
                    <div className={styles.rank_data}>
                    {render_rank_icon(props.summonerData.summoner_account_data.solo_data.rank[0])}
                    {render_rank('soloduo')}
                    <h3 className={styles.rank_label}>{`${props.summonerData.summoner_account_data.solo_winrate} % Winrate`}</h3>

                    </div>
                </div>
                
                <div className={styles.rank}>
                    <h3 className={styles.rank_label}>Flex Rank:</h3>
                    <div className={styles.rank_data}>
                    {render_rank_icon(props.summonerData.summoner_account_data.flex_data.rank[0])}
                    {render_rank('flex')}
                    <h3 className={styles.rank_label}>{`${props.summonerData.summoner_account_data.flex_winrate} % Winrate`}</h3>


                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
