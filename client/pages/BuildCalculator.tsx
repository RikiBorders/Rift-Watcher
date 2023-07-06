import NavBar from "../components/NavBar";
import Head from "next/head";
import styles from "../pages/BuildCalculator.module.css";
import BuildCalculatorComponent from "../components/build_calculator/BuildCalculatorComponent";


export default function Statistics() {
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