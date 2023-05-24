import React, { Component } from 'react';

class RegionDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      options: ["NA", "JP"]
    };
  }

  handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    this.setState({ selectedOption });
    // Pass the selected option to a callback function
    this.props.onOptionChange(selectedOption);
  }

  render() {
    const { defaultOption } = this.props;
    const { selectedOption } = this.state;
    const options = [
      { value: 'NA', label: 'North America' },
      { value: 'EUW', label: 'EU West' },
      { value: 'EUE', label: 'EU Nordice & East' },
      { value: 'JP', label: 'Japan' },
      { value: 'KR', label: 'Korea' }
    ];
    console.log(1337)
    console.log(options)

    return (
      <select value={selectedOption} onChange={this.handleOptionChange}>
        <option value="">{defaultOption}</option>
        {options && options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  }
}

export default RegionDropdown;