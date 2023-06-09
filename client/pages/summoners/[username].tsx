import NavBar from "../../components/NavBar";
import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import styles from './[username].module.css';


export default function username() {
  const router = useRouter();
  const [summonerData, setSummonerData] = useState(null);

  const render_rank = (queue_type: string) => {
    console.log(summonerData)
    if (summonerData && queue_type == 'soloduo'){
      return (
        <div>
          <h3 className={styles.sub_header}>{summonerData.summoner_data.solo_data.rank}</h3>
          <p className={styles.description}>LP: {summonerData.summoner_data.solo_data.lp}</p>
        </div>

    )} 
    else if (summonerData && queue_type == 'flex') {
      return(
        <div>
          <h3 className={styles.sub_header}>{summonerData.summoner_data.flex_data.rank}</h3>
          <p className={styles.description}>LP: {summonerData.summoner_data.flex_data.lp}</p>
        </div>
    )} else {
      return null;
    }
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
          <img className={styles.profile_image}/>
          <h1 className={styles.header_text}>{router.query.username}</h1>
          
          <div className={styles.rank_section}>
            <h3 className={styles.sub_header}>Solo/Duo Rank:</h3>
            {summonerData ? render_rank('soloduo') : <p>Loading...</p>}
          </div>

          <div className={styles.rank_section}>
            <h3 className={styles.sub_header}>Flex Rank:</h3>
            {summonerData ? render_rank('flex') : <p>Loading...</p>}
          </div>

        </div>
      </div>
    </div>
);}