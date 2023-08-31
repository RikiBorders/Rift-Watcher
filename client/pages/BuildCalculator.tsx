import NavBar from "../components/NavBar";
import Head from "next/head";
import Image from 'next/image'
import styles from "../pages/BuildCalculator.module.css";
import BuildCalculatorComponent from "../components/build_calculator/BuildCalculatorComponent";
import MessageBox from "../components/MessageBox"
import {useState, useEffect } from 'react'

export default function BuildCalculator() {
  const [calculatorData, setCalculatorData] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [showWarningMessage, setShowWarningMessage] = useState(false)

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
        setShowWarningMessage(true)
      }
    })
  }

  const close_msg = () => {
    setShowWarningMessage(false)
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
        {showWarningMessage ?
        <div onClick={close_msg}>
          <MessageBox type='Alert' message='Champion/item data could not be fetched'/>
        </div> : <></>
        }
        {isLoading ? 
          <Image src="/teemo_loading_icon.gif" className={styles.loading_image} alt="" height="90" width="90"/> :
          <div className={styles.calculator_view}>
            <BuildCalculatorComponent calculator_data={calculatorData}/>
            <p className={styles.disclaimer}>
              Disclaimer: 
              Rift Watcher isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions of Riot Games or anyone officially 
              involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or 
              registered trademarks of Riot Games, Inc.
            </p>
          </div>
        }

      </div>
    </div>
);}