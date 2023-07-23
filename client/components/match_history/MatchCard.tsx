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
    const [cardStyle, setCardStyle] = useState(styles.card_container)
    const [matchInfoPane, setMatchInfoPane] = useState(styles.match_info_container_hidden)
    const [arrowOpenStyle, setOpenArrowStyle] = useState(styles.arrow_visible)
    const [arrowCloseStyle, setCloseArrowStyle] = useState(styles.arrow_hidden)


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

    const render_matchups = () => {
        const matchups = props.match_data.matchup_info
        return(
            <div className={styles.matchup_container}>
                {matchups.map((matchup: any) => (
                    <div className={styles.matchup_row}>
                        <div className={styles.matchup_row_player}>
                            <img src={matchup[0]['champ_icon']} className={styles.overview_champ_icon} />
                            <p className={styles.overview_summoner_name}>{matchup[0]['name']}</p>
                        </div>
                        {render_position_icon_for_overview(matchup[0]['position'])}
                        <div className={styles.matchup_row_player}>
                            <img src={matchup[1]['champ_icon']} className={styles.overview_champ_icon} />
                            <p className={styles.overview_summoner_name}>{matchup[1]['name']}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const render_position_icon = () => {
        let position = (props.match_data.target_summoner_info.position).toLowerCase()
        if (position == 'utility'){position = 'support'}
        let position_icon = (<></>)
        if (['bottom', 'support', 'jungle', 'middle', 'top'].includes(position)){
            position_icon = (<img className={styles.position_icon} src={`/position_icons/position-${position}.png`} />)
        }

        return position_icon
    }

    const render_position_icon_for_overview = (pos: string) => {
        let position = pos.toLowerCase()
        if (position == 'utility'){position = 'support'}
        let position_icon = (<></>)
        if (['bottom', 'support', 'jungle', 'middle', 'top'].includes(position)){
            position_icon = (<img className={styles.overview_position_icon} src={`/position_icons/position-${position}.png`} />)
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
                alignSelf: "center",
                columnGap: "20px",
                marginBottom: 0,

            }}>
                <div className={styles.meta_summoner_info_section_left}>
                    <h2 className={styles.gamemode_text}>
                        {props.match_data.queue_type}
                    </h2>
                    <img 
                        src={props.match_data.target_summoner_info.champion_img_link} 
                        className={styles.champion_image}
                    />
                    <p className={styles.meta_summoner_text}>
                        {props.match_data.target_summoner_info.champion}
                    </p>

                    <div className={styles.rune_container}>
                        <img 
                            src={props.match_data.target_summoner_info.runes[0] } 
                            className={styles.rune_image}
                        />
                        <img 
                            src={props.match_data.target_summoner_info.runes[1] } 
                            className={styles.secondary_rune_image}
                        />
                    </div>

                    <div className={styles.summoner_spell_container}>
                        <img 
                            src={props.match_data.target_summoner_info.summoner_spells[0] } 
                            className={styles.summoner_spell_image}
                        />
                        <img 
                            src={props.match_data.target_summoner_info.summoner_spells[1] } 
                            className={styles.summoner_spell_image}
                        />
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
                            <p className={styles.meta_summoner_rank}>Unranked</p>
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
            const team_id = stats[name]['team_id'];
            if (team_id == 100){
                team_1.push({...stats[name]});
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

    const render_items_for_table = (player_data: any) => {
        let trinket = <></>
        let items: Array<any> = []

        player_data.items.map((item: any, i: number) => {
            if (item.name == "Oracle Lens" || 
                item.name == "Stealth Ward" || 
                item.name == "Farsight Alteration"){
                trinket = <img className={styles.team_stats_trinket} src={item.icon_path} />
            } else if (item.tier == 'mythic') {
                items.push(<img className={styles.team_stats_mythic_item} src={item.icon_path} />)
            } else {
                items.push(<img className={styles.team_stats_item} src={item.icon_path} />)
            }
        })

        if (items.length != 6){
            for (let i =0; i <= 6 - items.length; i++) {
                items.push(<img src='/item_frame.png' className={styles.team_stats_item}/>);
             }
        }

        return (
            <div className={styles.item_row}>
                {
                    items.map((item: any) => (
                        item
                    ))
                }
                {trinket}
                
            </div>
        )
    }
    

    const render_team_stats = (team: Array<any>) => {

        return (
            <div className={styles.team_stats_container}>

                <table style={{width: '100%'}}>
                    <tr className={styles.player_section_row}>
                        <th className={styles.player_section_header_text}>Name</th>
                        <th className={styles.player_section_header_text}>KDA</th>
                        <th className={styles.player_section_header_text}>CS</th>
                        <th className={styles.player_section_header_text}>Damage</th>
                        <th className={styles.player_section_header_text}>Vision</th>
                        <th className={styles.player_section_header_text}>Build Info</th>
                    </tr>
                    {
                        team.map((player_data: any, i: number) => (
                            <tr className={styles.player_section_row}>
                                <td className={styles.player_name} key={`${player_data.name}`+`${i}`}>
                                    <img src={player_data.champ_icon} className={styles.team_stats_champ_icon} />
                                    {player_data.name}
                                </td>
                                <td className={styles.player_card_text} key={`${player_data.kills}`+`${i}`}>
                                    {`${player_data.kills}/${player_data.deaths}/${player_data.assists}`}
                                </td>
                                <td className={styles.player_card_text} key={`${player_data.total_cs}`+`${i}`}>{player_data.total_cs}</td>
                                <td className={styles.player_card_text} key={`${player_data.total_damage_dealt}`+`${i}`}>{num_to_string(player_data.total_damage_dealt)}</td>
                                <td className={styles.player_card_text} key={`${player_data.vision_score_pm}`+`${i}`}>
                                    {`${player_data.per_minute_stats.vision_score_pm}/pm`}
                                </td>
                                <td className={styles.player_card_text}>
                                    {render_items_for_table(player_data)}
                                </td>
                            </tr>
                    ))}
                </table>

            </div>
        )
    }

    const render_match_info = () => {

        return (
            <div className={matchInfoPane}>
                <div className={styles.team_1_section}>
                    <div className={styles.team_header}>
                        <h4 className={styles.blue_team_header_text}>Blue Team</h4>
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
                </div>

                <div className={styles.losing_team_section}>
                    <div className={styles.team_header}>
                        <h4 className={styles.red_team_header_text}>Red Team</h4>
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
                <div className={styles.small_vertical_spacer}/>
                <img src='/arrow_up.png' className={arrowCloseStyle} onClick={show_match_info}/>

            </div>
        )
    }

    const render_items = () => {
        let trinket = <></>
        let items: Array<any> = []

        props.match_data.target_summoner_info.items.map((item: any, i: number) => {
            if (item.name == "Oracle Lens" || 
                item.name == "Stealth Ward" || 
                item.name == "Farsight Alteration") {
                trinket = <img className={styles.trinket_icon} src={item.icon_path} />
            } else {
                items.push(<img className={styles.item_icon} src={item.icon_path} />)
            }
            
        })

        if (items.length != 6){
            for (let i =0; i <= 6 - items.length; i++) {
                items.push(<img src='/item_frame.png' className={styles.item_icon_blank}/>);
             }
        }

        return (
            <div className={styles.item_section}>
                <div className={styles.item_container}>
                    {
                        items.map((item: any) => (
                            item
                        ))
                    }
                </div>
                {trinket}
            </div>
        )

    }

    const render_overview = () => {
        return (
            <div className={styles.overview_container}>
                <div className={styles.overview_stats_container}>
                    <div className={styles.overview_stats_section}>

                        <p className={styles.kda_text}>
                            {props.match_data.target_summoner_info.kills_assists_deaths['0']}
                            /
                            {props.match_data.target_summoner_info.kills_assists_deaths['2']}
                            /
                            {props.match_data.target_summoner_info.kills_assists_deaths['1']}
                        </p>
                        <div className={styles.kd_kda_section}>
                            <div className={styles.overview_sub_section}>
                                <p className={
                                    props.match_data.target_summoner_info.kda >= 3 ? styles.overview_text_green : 
                                    props.match_data.target_summoner_info.kda <= 0.7 ? styles.overview_text_red:
                                    styles.overview_text
                                }>
                                    {props.match_data.target_summoner_info.kda}
                                </p>
                                <p className={styles.sub_header}>KDA</p>
                            </div>
                            <div className={styles.overview_sub_section}>
                                <p className={
                                    props.match_data.target_summoner_info.kd >= 2 ? styles.overview_text_green : 
                                    props.match_data.target_summoner_info.kd <= 0.5 ? styles.overview_text_red:
                                    styles.overview_text
                                }>
                                    {props.match_data.target_summoner_info.kd}
                                </p>
                                <p className={styles.sub_header}>KD</p> 

                            </div>
                        </div>
                        <div className={styles.vertical_divider}/>
                    </div>

                    <div className={styles.overview_stats_section}>
                        <div className={styles.cs_cspm_section}>
                                <p className={styles.overview_text}>{props.match_data.target_summoner_info.cs}</p>
                                <p className={styles.overview_text}>({props.match_data.target_summoner_info.cs_pm})</p>
                        </div>
                        <p className={styles.sub_header}>CS</p>  
                        <div className={styles.vertical_divider}/>
                    </div>

                    <div className={styles.overview_stats_section}>
                        <div className={styles.vision_section}>

                            <div className={styles.overview_sub_section}>
                                <p className={styles.overview_text}>
                                    {props.match_data.target_summoner_info.wards_placed} /
                                    {props.match_data.target_summoner_info.wards_destroyed} /
                                    {props.match_data.target_summoner_info.control_wards_placed} (
                                    {props.match_data.target_summoner_info.vision_score})
                                </p>
                                <p className={styles.sub_header}>Vision</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.overview_items_section}>
                    <p className={styles.overview_text}>Items</p>
                    <div className={styles.small_vertical_spacer}/>
                    {render_items()}
                </div>
            </div>
        )
    }

    const show_match_info = () => {
        if (cardStyle == styles.card_container){
            setCardStyle(styles.card_container_expanded)
            setMatchInfoPane(styles.match_info_container_visible)
            setOpenArrowStyle(styles.arrow_hidden)
            setCloseArrowStyle(styles.arrow_visible)

        } else {
            setCardStyle(styles.card_container)
            setMatchInfoPane(styles.match_info_container_hidden)
            setOpenArrowStyle(styles.arrow_visible)
            setCloseArrowStyle(styles.arrow_hidden)
        }
    }

    useEffect(() => {
        get_team_data()
    }, []);
    return (
        <div className={cardStyle}>
            <div className={styles.card_info_container}>
                {render_meta_info()}
                <div className={styles.horizontal_spacer} />
                {render_overview()}
                {render_matchups()}
            </div>
            <img src='/arrow_down.png' className={arrowOpenStyle} onClick={show_match_info}/>
            {render_match_info()}
        </div>
    )
}
