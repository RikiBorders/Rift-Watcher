import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { motion } from "framer-motion";
import RegionDropdown from "../components/RegionSelectDropdown"
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  
    let state = {
      searchTerm: '',
      selectedRegion: 'NA',
      placeholder: 'Summoner, Champion, etc',
      redirect: false
    };
    const router = useRouter();
  
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    state.searchTerm = searchTerm;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const searchTerm = state.searchTerm;
    const selectedRegion = state.selectedRegion;
    const data = {username: searchTerm, region: selectedRegion};
    const response = 1;
    
    // const response = fetch("http://127.0.0.1:5000/get_summoner", { // update the url when pushed to prod
    //   method: "POST",
    //   mode: "cors",
    //   headers: {
    //     'Content-Type' : 'application/json',
    //   },
    //   body: JSON.stringify(data)
    // })

    if (response) { // check here if the response is valid
      console.log(response);
      router.push("/summoners/"+searchTerm);
    }
  }

  const HandleGetRegion = (region) => {
    const selectedRegion = region;
    state.selectedRegion = selectedRegion;
  }

  return (
    <div className={styles.search_bar_container}>
      
      <div className={styles.search_bar}>

        <div className={styles.input_div}>
          <h3 className={styles.search_header}>Region</h3>
          <RegionDropdown getRegion={HandleGetRegion}/>
        </div>


        <div className={styles.input_div}>
          <h3 className={styles.search_header}>Summoner Name</h3>
          <form className={styles.search_form} onSubmit={handleFormSubmit}>
            <input
              className={styles.search_input}
              type="text"
              placeholder={state.placeholder}
              defaultValue={state.searchTerm}
              onChange={handleInputChange}
              size="40"
            />
            <motion.button type="submit" className={styles.search_button}/>
          </form>

        </div>
      </div>

    </div>
  );
}
