import NavBar from "../../components/NavBar";
import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import styles from './[username].module.css';


export default function username() {
  const router = useRouter();
  const [summonerData, setSummonerData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const render_rank = (queue_type: string) => {
    if (summonerData && queue_type == 'soloduo'){
      return (
        <div>
          <h3 className={styles.rank_text}>{summonerData.summoner_account_data.solo_data.rank}</h3>
          <p className={styles.lp_number}>LP: {summonerData.summoner_account_data.solo_data.lp}</p>
        </div>

    )} 
    else if (summonerData && queue_type == 'flex') {
      return(
        <div>
          <h3 className={styles.rank_text}>{summonerData.summoner_account_data.flex_data.rank}</h3>
          <p className={styles.lp_number}>LP: {summonerData.summoner_account_data.flex_data.lp}</p>
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
            {!isLoading ? render_icon() : <img src="/loading_icon.gif" className={styles.loading_image}/>}
            <div className={styles.account_info_text}>
              <h1 className={styles.header_text}>{router.query.username}</h1>
              <h2 className={styles.account_info_region}>Region: {router.query.region}</h2>
            </div>
          </div>
          
          <div className={styles.rank_section}>
            <h3 className={styles.sub_header}>Solo/Duo Rank:</h3>
            {!isLoading ? render_rank('soloduo') : <img src="/loading_icon.gif" className={styles.loading_image}/>}
          </div>

          <div className={styles.rank_section}>
            <h3 className={styles.sub_header}>Flex Rank:</h3>
            {!isLoading ? render_rank('flex') : <img src="/loading_icon.gif" className={styles.loading_image}/>}
          </div>

        </div>
      </div>
    </div>
);}