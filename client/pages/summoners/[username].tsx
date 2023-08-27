import NavBar from "../../components/NavBar";
import SummonerInfo from "../../components/SummonerInfo";
import MatchHistory from "@/components/match_history/MatchHistory";
import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import styles from './[username].module.css';


export default function username() {
  const router = useRouter();
  const [summonerData, setSummonerData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

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
    if (summonerData && queue_type == 'soloduo'){
      return (
        <div className={styles.rank_render}>
          <div className={styles.rank_text}>
            <h3 className={styles.rank_title}>
              {summonerData.summoner_account_data.solo_data.rank[0]} {summonerData.summoner_account_data.solo_data.rank[1]}
            </h3>
            <p className={styles.lp_number}>LP: {summonerData.summoner_account_data.solo_data.lp}</p>
          </div>
        </div>

    )} 
    else if (summonerData && queue_type == 'flex') {
      return(
        <div className={styles.rank_render}>
          <div className={styles.rank_text}>
            <h3 className={styles.rank_title}>
              {summonerData.summoner_account_data.flex_data.rank[0]} {summonerData.summoner_account_data.flex_data.rank[1]}
            </h3>
            <p className={styles.lp_number}>LP: {summonerData.summoner_account_data.flex_data.lp}</p>
          
          </div>
        </div>
    )} else {
      return null;
    }
  }

  const render_icon = () => {
    if (summonerData){
      return (
        <img src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/"+summonerData.summoner_account_data.profileIcon+".jpg"} className={styles.profile_image}/>
    )}
  }

  const fetch_summoner_stats = () => {
    const searchTerm = router.query.username;
    const selectedRegion = router.query.region;
    const data = {username: searchTerm, region: selectedRegion};

    const response = fetch("http://127.0.0.1:5000/get_summoner", { // update the url when pushed to prod
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data)
      
    }).then(response => response.json()
    ).then( response => {

      if (response['status']) { // check here if the response is valid
        setSummonerData(response.summoner_data);
        setIsLoading(false);
      } else {
        console.log('Summoner info could not be fetched')
      }
    })
    
  }

  useEffect(() => {
    if (router.isReady){
      fetch_summoner_stats();
    }
  }, [router.isReady]);
  return (
    <div>
      <Head>
        <title>{router.query.username}'s Statistics</title>
        <meta name="description" content="Elevate Your Game With Rift Watcher" />
      </Head>

      <div className={styles.page_body}>
        <NavBar/>
        
        {isLoading ? 
          <img src="/teemo_loading_icon.gif" className={styles.loading_image}/> :
          <div style={{margin: 0, padding: 0}}>
            <SummonerInfo 
              router_query={router.query} 
              summonerData={summonerData} 
            />
            <MatchHistory 
              username={router.query.username} 
              region={router.query.region} 
            />
          </div>
        }
        <p className={styles.disclaimer}>
          Disclaimer: 
          Rift Watcher isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially 
          involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
          registered trademarks of Riot Games, Inc.
        </p>

      </div>
    </div>
);}