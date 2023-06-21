import React, { use, useState, useEffect } from 'react';
import styles from "./MatchHistory.module.css";

export default function MatchHistory(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [matchData, setMatchData] = useState([]);

    const fetch_match_data = () => {
        const searchTerm = props.username;
        const selectedRegion = props.region;
        const data = {username: searchTerm, region: selectedRegion};
    
        const response = fetch("http://127.0.0.1:5000/get_match_data", { // update the url when pushed to prod
          method: "POST",
          mode: "cors",
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify(data)
          
        }).then(response => response.json()
        ).then( response => {
    
          if (response['status']) { // check here if the response is valid
            setMatchData(response);
            console.log(response)
            setIsLoading(false);
          } else {
            console.log('Match Data could not be fetched')
          }
        })
        
      }

    useEffect(() => {
        console.log('fetching...')

        fetch_match_data()
    })
    return (
        <div className={styles.container}>
            <h1 className={styles.header_text}>Match History</h1>
            {
                isLoading ? 
                <img src="/loading_icon.gif" className={styles.loading_image}/> :
                <p>Loaded</p>
            }
        </div>
    )
}