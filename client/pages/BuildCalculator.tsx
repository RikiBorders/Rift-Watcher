import NavBar from "../components/NavBar";
import Head from "next/head";
import styles from "../pages/BuildCalculator.module.css";
import BuildCalculatorComponent from "../components/build_calculator/BuildCalculatorComponent";
import {useState, useEffect } from 'react'

export default function BuildCalculator() {
  const [calculatorData, setCalculatorData] = useState()

  const fetch_calculator_data = () => {
    const url = "http://127.0.0.1:5000//get_data_for_build_calculator"
    console.log('run')
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
        console.log(response['calculator_data'])
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
        <h1 className={styles.header_text}>Build Calculator</h1>
        <BuildCalculatorComponent/>

      </div>
    </div>
);}