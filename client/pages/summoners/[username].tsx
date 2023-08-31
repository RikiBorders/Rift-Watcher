import NavBar from "../../components/NavBar";
import SummonerInfo from "../../components/SummonerInfo";
import MatchHistory from "@/components/match_history/MatchHistory";
import MessageBox from "../../components/MessageBox"
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import styles from './[username].module.css';


export default function username() {
  const Router = useRouter();
  const [summonerData, setSummonerData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWarningMessage, setShowWarningMessage] = useState(false)


  const render_rank_icon = (summoner_rank: string) => {
    const rank = summoner_rank.toLowerCase();
    let ranked_icon = (<></>)
    if (rank.includes("iron")) {
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-iron.png" alt="iron ranked emblem" fill/>)
    } else if (rank.includes("bronze")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-bronze.png" alt="bronze ranked emblem" fill/>)
    } else if (rank.includes("silver")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-silver.png" alt="silver ranked emblem" fill/>)
    } else if (rank.includes("gold")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-gold.png" alt="gold ranked emblem" fill/>)
    } else if (rank.includes("platinum")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-platinum.png" alt="platinum ranked emblem" fill/>)
    } else if (rank.includes("diamond")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-diamond.png" alt="diamond ranked emblem" fill/>)
    } else if (rank.includes("master")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-master.png" alt="master ranked emblem" />)
    } else if (rank.includes("grandmaster")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-grandmaster.png" alt="grand master ranked emblem" fill/>)
    } else if (rank.includes("challenger")){
      ranked_icon = (<Image className={styles.ranked_icon} src="/ranked_icons/emblem-challenger.png" alt="challenger ranked emblem" fill/>)
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
        <Image 
          src={"https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/"+summonerData.summoner_account_data.profileIcon+".jpg"} 
          className={styles.profile_image}
          alt="profile icon"
          fill
        />
    )}
  }

  const fetch_summoner_stats = () => {
    const searchTerm = Router.query.username;
    const selectedRegion = Router.query.region;
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
        setShowWarningMessage(true)
      }
    })
    
  }

  const close_msg = () => {
    setShowWarningMessage(false)
  }

  useEffect(() => {
    if (Router.isReady){
      fetch_summoner_stats();
    }
  }, [Router.isReady]);
  return (
    <div>
      <Head>
        <title>{Router.query.username}'s Statistics</title>
        <meta name="description" content="Elevate Your Game With Rift Watcher" />
      </Head>

      <div className={styles.page_body}>
        <NavBar/>

        {showWarningMessage ?
          <div onClick={close_msg}>
            <MessageBox type='Alert' message='Summoner info could not be fetched'/>
          </div> : <></>
        }
        
        {isLoading ? 
          <Image src="/teemo_loading_icon.gif" className={styles.loading_image} alt="" height="90" width="90"/> :
          <div style={{margin: 0, padding: 0}}>
            <SummonerInfo 
              router_query={Router.query} 
              summonerData={summonerData} 
            />
            <MatchHistory 
              username={Router.query.username} 
              region={Router.query.region} 
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