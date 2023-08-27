import NavBar from "../components/NavBar";
import Head from "next/head";
import styles from "../pages/BuildCalculator.module.css";
import BuildCalculatorComponent from "../components/build_calculator/BuildCalculatorComponent";
import {useState, useEffect } from 'react'

export default function BuildCalculator() {
  const [calculatorData, setCalculatorData] = useState()
  const [isLoading, setIsLoading] = useState(true);

  const fetch_calculator_data = () => {
    const url = "http://127.0.0.1:5000//get_data_for_build_calculator"
    const response = fetch(url, { // update the url when pushed to prod
      method: "GET",
      mode: "cors",
      headers: {
        'Content-Type' : 'application/json',
      },
      
    }).then(response => response.json()
    ).then( response => {
      if (response['status']) { // check here if the response is valid
        setCalculatorData(response['calculator_data']);
        setIsLoading(false)
      } else {
        console.log('Champion/item data could not be fetched')
      }
    })
  }

  useEffect(() => {
    fetch_calculator_data()
  }, [])
  return (
    <div>
      <Head>
        <title>Build Calculator</title>
        <meta name="description" content="Build Calculator" />
      </Head>
      
      <div className={styles.background}>
        <NavBar/>
        <div className={styles.header_div}>
          <h1 className={styles.header_text}>Hextech Build Calculator</h1>
        </div>
        {isLoading ? 
          <img src="/teemo_loading_icon.gif" className={styles.loading_image}/> :
          <div className={styles.calculator_view}>
            <BuildCalculatorComponent calculator_data={calculatorData}/>
            <p className={styles.disclaimer}>
              Disclaimer: 
              Rift Watcher isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially 
              involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
              registered trademarks of Riot Games, Inc.
            </p>
          </div>
        }

      </div>
    </div>
);}