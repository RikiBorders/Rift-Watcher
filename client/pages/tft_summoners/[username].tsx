import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./[username].module.css";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import TacticianInfo from "@/components/tft_components/TacticianInfo";

// Need to fix do better typing for data, use interfaces later.
export default function username() {
  const router = useRouter();
  const [summonerData, setSummonerData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const fetch_summoner_stats = () => {
    const searchTerm = router.query.username;
    const selectedRegion = router.query.region;
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
          console.log(response.summoner_data);
          setSummonerData(response.summoner_data);
          setIsLoading(false);
        } else {
          console.log("Summoner info could not be fetched");
        }
      });
  };

  useEffect(() => {
    if (router.isReady) {
      fetch_summoner_stats();
    }
  }, [router.isReady]);

  return (
    <div>
      <Head>
        <title>{router.query.username}'s Statistics</title>
        <meta
          name="description"
          content="Elevate Your Game With Rift Watcher"
        />
      </Head>

      <div className={styles.page_body}>
        <NavBar />

        {isLoading ? (
          <img src="/teemo_loading_icon.gif" className={styles.loading_image} />
        ) : (
          <div>
            <TacticianInfo
              summonerName={router.query.username}
              profileIcon={summonerData.summoner_info.profileIcon}
              rankedData={summonerData.summoner_info.tft_data}
            />
          </div>
        )}
      </div>
    </div>
  );
}
