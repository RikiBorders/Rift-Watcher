import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./[username].module.css";
import Head from "next/head";
import Image from "next/image"
import NavBar from "../../components/NavBar";
import MessageBox from "../../components/MessageBox"
import TacticianInfo from "@/components/tft_components/TacticianInfo";

// Need to fix do better typing for data, use interfaces later.
export default function Username() {
  const Router = useRouter();
  const [summonerData, setSummonerData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWarningMessage, setShowWarningMessage] = useState(false)

  const fetch_summoner_stats = () => {
    const searchTerm = Router.query.username;
    const selectedRegion = Router.query.region;
    const data = { username: searchTerm, region: selectedRegion };

    const response = fetch("http://127.0.0.1:5000/get_tft_summoner", {
      // update the url when pushed to prod
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response["status"]) {
          // check here if the response is valid
          setSummonerData(response.summoner_data);
          setIsLoading(false);
        } else {
          setShowWarningMessage(true)
        }
      });
  };

  const close_msg = () => {
    setShowWarningMessage(false)
  }

  useEffect(() => {
    if (Router.isReady) {
      fetch_summoner_stats();
    }
  }, [Router.isReady]);

  return (
    <div>
      <Head>
        <title>{Router.query.username}&apos;s Statistics</title>
        <meta
          name="description"
          content="Elevate Your Game With Rift Watcher"
        />
      </Head>

      <div className={styles.page_body}>
        <NavBar />

        {isLoading ? (
          <Image src="/teemo_loading_icon.gif" className={styles.loading_image}  alt="" height="90" width="90"/>
          ) : (
            <div>
              <TacticianInfo
                summonerName={Router.query.username}
                profileIcon={summonerData.summoner_info.profileIcon}
                rankedData={summonerData.summoner_info.tft_data}
              />
            </div>
        )}

        {showWarningMessage ?
          <div onClick={close_msg}>
            <MessageBox type='Alert' message='Summoner info could not be fetched'/>
          </div> : <></>
        }
      </div>
    </div>
  );
}
