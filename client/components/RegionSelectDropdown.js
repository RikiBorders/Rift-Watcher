import React, { Component } from 'react';
import styles from "./RegionSelectDropdown.module.css"

class RegionDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "NA"
    };
  }

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    this.setState({ selectedOption });
    this.props.getRegion(selectedOption);
  }

  render() {
    const { selectedOption } = this.state;
    const options = [
      { value: 'BR', label: 'Brazil' },
      { value: 'EUN', label: 'EU Nordic & East' },
      { value: 'EUW', label: 'EU West' },
      { value: 'JP', label: 'Japan' },
      { value: 'KR', label: 'Korea' },
      { value: 'LA1', label: 'Latin America North' },
      { value: 'LA2', label: 'Latin America South' },
      { value: 'NA', label: 'North America' },
      { value: 'OC', label: 'Oceania' },
      { value: 'RU', label: 'Russia' },
      { value: 'TR', label: 'Turkey' },
    ];

    return (
      <select className={styles.select} value={selectedOption} onChange={this.handleOptionChange}>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  }
}

export default RegionDropdown;