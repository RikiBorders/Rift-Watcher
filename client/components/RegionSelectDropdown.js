import React, { Component } from 'react';

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
      { value: 'NA', label: 'North America' },
      { value: 'EUW', label: 'EU West' },
      { value: 'EUE', label: 'EU Nordic & East' },
      { value: 'JP', label: 'Japan' },
      { value: 'KR', label: 'Korea' }
    ];

    return (
      <select value={selectedOption} onChange={this.handleOptionChange}>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  }
}

export default RegionDropdown;