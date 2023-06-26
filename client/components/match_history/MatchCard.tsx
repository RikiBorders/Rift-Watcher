import React, { useState } from 'react';
import styles from "./MatchCard.module.css";

export default function MatchCard(props: any) {
    const [team1Stats, setTeam1Stats] = useState<any>([]);
    const [team2Stats, setTeam2Stats] = useState<any>([]);


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
                    {
                    props.match_data.queue_type == "Ranked Solo" || 
                    props.match_data.queue_type == "Ranked Flex" ?
                        <div className={styles.rank}>
                            {render_rank_icon()}
                            <p className={styles.meta_summoner_text}>
                                {props.match_data.target_summoner_info.rank}
                            </p>
                            <p className={styles.sub_header}>Avg Rank</p>
                        </div> :
                       <img className={styles.unranked_icon} src="/ranked_icons/unranked.png" />
                    }

                </div>
            </div>
        )
    }

    const get_team_data = () => {
        let team_1: Array<any> = [];
        let team_2: Array<any> = [];
        const stats: any = props.match_data.player_stats;
        for (const name in stats){
            const id = stats[name]['team_id'];
            if (id == 100){
                team_1.push(stats[name])
            } else{
                team_2.push(stats[name])
            }
        }
        setTeam1Stats(team_1);
        setTeam1Stats(team_2);
    }

    const render_team_stats = (team: Array<any>) => {

        return (
            <div className={styles.team_stats_container}>
                {
                    team.map((player_data: any) => (
                        <div className={styles.player_card_container}>
                            <h3 className={styles.player_name}>{player_data.name}</h3>
                            <p className={styles.player_card_text}></p>
                            <p className={styles.player_card_text}></p>
                            <p className={styles.player_card_text}></p>
                            <p className={styles.player_card_text}></p>
                            <p className={styles.player_card_text}></p>

                        </div>
                    ))
                }
            </div>
        )
    }

    const render_match_info = () => {
        const teams = get_team_data()
        return (
            <div className={styles.match_info_section}>
                <div className={styles.team_1_section}>
                    <div className={styles.team_header}>
                        <h4 className={styles.team_header_text}>Team 1</h4>
                        <h4 className={styles.team_header_text}>Average Rank</h4>
                        <h4 className={styles.team_header_text}>Total Gold</h4>
                        <h4 className={styles.team_header_text}>Turrets Destroyed</h4>
                        <h4 className={styles.team_header_text}>Dragons Taken</h4>
                        <h4 className={styles.team_header_text}>Barons Taken</h4>
                    </div>
                    <div className={styles.team_header_data}>
                        {render_team_stats(team1Stats)}
                        {render_team_stats(team2Stats)}

                    </div>
                </div>

                <div className={styles.losing_team_section}>
                    
                </div>
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
