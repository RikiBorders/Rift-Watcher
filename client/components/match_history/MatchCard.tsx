import React, { useState, useEffect } from 'react';
import styles from "./MatchCard.module.css";

export default function MatchCard(props: any) {
    const [team1Stats, setTeam1Stats] = useState<any>({
        total_kills: 0,
        total_gold: 0,
        turrets_destroyed: 0,
        dragons_taken: 0,
        barons_taken: 0,
    });
    const [team1Players, setTeam1Players] = useState<any>([]);
    const [team2Stats, setTeam2Stats] = useState<any>({
        total_kills: 0,
        total_gold: 0,
        turrets_destroyed: 0,
        dragons_taken: 0,
        barons_taken: 0,
    });
    const [team2Players, setTeam2Players] = useState<any>([]);

    const num_to_string = (num: number) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

                    <div className={styles.button_div}>
                        <button className={styles.player_stats_btn}>Player Stats</button>
                        <button className={styles.player_stats_btn}>Match Stats</button>
                    </div>

                </div>

                <div className={styles.meta_summoner_info_section_right}>
                    {render_win()}
                    {render_position_icon()}
                    {
                    props.match_data.queue_type == "Ranked Solo" || 
                    props.match_data.queue_type == "Ranked Flex" ?
                        <div className={styles.rank}>
                            {render_rank_icon()}
                            <p className={styles.meta_summoner_rank}>
                                {props.match_data.average_ranks.combined_avg}
                            </p>
                            <p className={styles.sub_header}>Avg Rank</p>
                        </div> :
                        <div className={styles.rank}>
                            <img className={styles.unranked_icon} src="/ranked_icons/unranked.png" />
                            <p className={styles.sub_header}>Unranked<br/>Gamemode</p>
                        </div>
                    }

                </div>
            </div>
        )
    }

    const get_team_data = () => {
        // Split players into their respective teams, while
        // calculating team-specific stats
        let team_1: Array<any> = [];
        let team_2: Array<any> = [];
        const stats: any = props.match_data.player_stats;
        let new_team1_stats: any = {
            total_kills: 0,
            total_gold: 0,
            turrets_destroyed: 0,
            dragons_taken: 0,
            barons_taken: 0,
        }
        let new_team2_stats: any = {
            total_kills: 0,
            total_gold: 0,
            turrets_destroyed: 0,
            dragons_taken: 0,
            barons_taken: 0,
        }

        for (const name in stats){
            const id = stats[name]['team_id'];
            if (id == 100){
                team_1.push(stats[name]);
                new_team1_stats.total_kills += stats[name].kills;
                new_team1_stats.total_gold += stats[name].total_gold_earned;
                new_team1_stats.turrets_destroyed += stats[name].turrets_destroyed;
                new_team1_stats.dragons_taken += stats[name].dragons_taken;
                new_team1_stats.barons_taken += stats[name].barons_taken;

                
            } else {
                team_2.push(stats[name]);
                new_team2_stats.total_kills += stats[name].kills;
                new_team2_stats.total_gold += stats[name].total_gold_earned;
                new_team2_stats.turrets_destroyed += stats[name].turrets_destroyed;
                new_team2_stats.dragons_taken += stats[name].dragons_taken;
                new_team2_stats.barons_taken += stats[name].barons_taken;
            }
        }

        new_team1_stats.total_gold = num_to_string(new_team1_stats.total_gold)
        new_team2_stats.total_gold = num_to_string(new_team2_stats.total_gold)

        setTeam1Players(team_1);
        setTeam2Players(team_2);
        setTeam1Stats(new_team1_stats);
        setTeam2Stats(new_team2_stats);

    }

    const render_team_stats = (team: Array<any>) => {

        return (
            <div className={styles.team_stats_container}>

                <table style={{width: '100%'}}>
                    <tr>
                        <th className={styles.player_section_header_text}>Name</th>
                        <th className={styles.player_section_header_text}>KDA</th>
                        <th className={styles.player_section_header_text}>CS</th>
                        <th className={styles.player_section_header_text}>Damage</th>
                        <th className={styles.player_section_header_text}>Vision</th>
                        <th className={styles.player_section_header_text}>Build Info</th>
                    </tr>
                    {
                        team.map((player_data: any, i: number) => (
                            <tr>
                                <td className={styles.player_name} key={`${player_data.name}`+`${i}`}>{player_data.name}</td>
                                <td className={styles.player_card_text} key={`${player_data.kills}`+`${i}`}>
                                    {`${player_data.kills}/${player_data.deaths}/${player_data.assists}`}
                                </td>
                                <td className={styles.player_card_text} key={`${player_data.total_cs}`+`${i}`}>{player_data.total_cs}</td>
                                <td className={styles.player_card_text} key={`${player_data.total_damage_dealt}`+`${i}`}>{player_data.total_damage_dealt}</td>
                                <td className={styles.player_card_text} key={`${player_data.vision_score_pm}`+`${i}`}>
                                    {`${player_data.per_minute_stats.vision_score_pm} p/m`}
                                </td>
                                <td className={styles.player_card_text}>build info soon</td>
                            </tr>
                    ))}
                </table>

            </div>
        )
    }

    const render_match_info = () => {

        return (
            <div>
                <div className={styles.team_1_section}>
                    <div className={styles.team_header}>
                        <h4 className={styles.team_header_text}>Team 1</h4>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Average Rank</h4>
                            <p className={styles.team_stat_text}>{props.match_data.average_ranks.team_1_avg}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Total Gold</h4>
                            <p className={styles.team_stat_text}>{team1Stats.total_gold}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Turrets Destroyed</h4>
                            <p className={styles.team_stat_text}>{team1Stats.turrets_destroyed}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Dragons Taken</h4>
                            <p className={styles.team_stat_text}>{team1Stats.dragons_taken}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Barons Taken</h4>
                            <p className={styles.team_stat_text}>{team1Stats.barons_taken}</p>
                        </div>

                    </div>

                    <div className={styles.team_header_data}>
                        {render_team_stats(team1Players)}
                    </div>

                    <div style={{marginBottom: '5vh'}}></div>

                    <div className={styles.team_header}>
                        <h4 className={styles.team_header_text}>Team 2</h4>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Average Rank</h4>
                            <p className={styles.team_stat_text}>{props.match_data.average_ranks.team_2_avg}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Total Gold</h4>
                            <p className={styles.team_stat_text}>{team2Stats.total_gold}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Turrets Destroyed</h4>
                            <p className={styles.team_stat_text}>{team2Stats.turrets_destroyed}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Dragons Taken</h4>
                            <p className={styles.team_stat_text}>{team2Stats.dragons_taken}</p>
                        </div>
                        <div className={styles.header_column}>
                            <h4 className={styles.team_header_text}>Barons Taken</h4>
                            <p className={styles.team_stat_text}>{team2Stats.barons_taken}</p>
                        </div>

                    </div>
                    <div className={styles.team_header_data}>
                        {render_team_stats(team2Players)}
                    </div>
                </div>

                <div className={styles.losing_team_section}>
                    
                </div>
            </div>
        )
    }

    useEffect(() => {
        get_team_data()
    }, [])
    return (
        <div className={styles.card_container}>
            {render_meta_info()}
            {render_match_info()}
        </div>
    )
}
