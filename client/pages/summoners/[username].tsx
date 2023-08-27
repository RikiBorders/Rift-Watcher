import NavBar from "../../components/NavBar";
import SummonerInfo from "../../components/SummonerInfo";
import MatchHistory from "@/components/match_history/MatchHistory";
import MessageBox from "../../components/MessageBox"
import Head from "next/head";
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';
import styles from './[username].module.css';


export default function username() {
  const router = useRouter();
  const [summonerData, setSummonerData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWarningMessage, setShowWarningMessage] = useState(false)

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
        setShowWarningMessage(true)
      }
    })
    
  }

  const close_msg = () => {
    setShowWarningMessage(false)
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

        {showWarningMessage ?
          <div onClick={close_msg}>
            <MessageBox type='Alert' message='Summoner info could not be fetched'/>
          </div> : <></>
        }
        
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