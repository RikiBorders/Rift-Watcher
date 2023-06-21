import NavBar from "../../components/NavBar";
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
        <img src={"http://ddragon.leagueoflegends.com/cdn/13.11.1/img/profileicon/"+summonerData.summoner_account_data.profileIcon+".png"} className={styles.profile_image}/>
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
        console.log(response)
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
        <title>{router.query.name}'s Statistics</title>
        <meta name="description" content="Elevate Your Game With Rift Watcher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page_body}>
        <NavBar/>

        <div className={styles.page_content}>
          <div className={styles.account_info}>

            <div className={styles.summoner_info}>
              {!isLoading ? render_icon() : <img src="/loading_icon.gif" className={styles.loading_image}/>}
              <div className={styles.account_info_text}>
                <h1 className={styles.header_text}>{router.query.username}</h1>
                <h2 className={styles.account_info_region}>Region: {router.query.region}</h2>
              </div>
            </div>

            <div className={styles.rank_section}>
              <div className={styles.rank}>
                <h3 className={styles.rank_label}>Solo/Duo Rank:</h3>
                <div className={styles.rank_data}>
                  {!isLoading ? 
                    render_rank_icon(summonerData.summoner_account_data.solo_data.rank[0]) : 
                    <></>
                  }
                  {!isLoading ? 
                    render_rank('soloduo') : 
                    <img src="/loading_icon.gif" className={styles.loading_image}/>
                  }
                  <h3 className={styles.rank_label}>{!isLoading ? `${summonerData.summoner_account_data.solo_winrate} % Winrate` : <></> }</h3>

                </div>
              </div>
            
              <div className={styles.rank}>
                <h3 className={styles.rank_label}>Flex Rank:</h3>
                <div className={styles.rank_data}>
                  {!isLoading ? 
                    render_rank_icon(summonerData.summoner_account_data.flex_data.rank[0]) : 
                    <></>
                  }
                  {!isLoading ? 
                    render_rank('flex') : 
                    <img src="/loading_icon.gif" className={styles.loading_image}/>
                  }
                  <h3 className={styles.rank_label}>{!isLoading ? `${summonerData.summoner_account_data.flex_winrate} % Winrate` : <></> }</h3>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);}