import React, { Component } from 'react';
import RegionDropdown from "../components/RegionSelectDropdown"
import { motion } from "framer-motion";
import styles from "./SearchBar.module.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      selectedRegion: 'NA',
      placeholder: 'Summoner, Champion, etc'
    };
  }


  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    const { selectedRegion } = this.state;
    // Perform search using the searchTerm
    // You can call a function or pass the search term to a parent component via props
    // For simplicity, let's just log the search term to the console
    const data = {username: searchTerm, region: selectedRegion}

    const response = fetch("http://127.0.0.1:5000/get_summoner", { // update the url when pushed to prod
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data)
    })


    if (response.ok){
      console.log("successfully sent [debug message, remove this before launch]")
    }
  }

  HandleGetRegion = (region) => {
    const selectedRegion = region;
    this.setState({ selectedRegion });
  }

  render() {
    const { searchTerm } = this.state;
    const { placeholder } = this.state;

    return (
      <div className={styles.search_bar_container}>
        <div className={styles.search_bar}>

          <div className={styles.input_div}>
            <h3 className={styles.search_header}>Region</h3>
            <RegionDropdown getRegion={this.HandleGetRegion}/>
          </div>


          <div className={styles.input_div}>
            <h3 className={styles.search_header}>Summoner Name</h3>
            <form className={styles.search_form} onSubmit={this.handleFormSubmit}>
              <input
                className={styles.search_input}
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={this.handleInputChange}
                size="40"
              />
              <motion.button type="submit" className={styles.search_button}/>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default SearchBar;