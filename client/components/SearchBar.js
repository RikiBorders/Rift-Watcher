import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };
  }

  handleInputChange = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    // Perform search using the searchTerm
    // You can call a function or pass the search term to a parent component via props
    // For simplicity, let's just log the search term to the console
    console.log('Search term:', searchTerm);
  }

  render() {
    const { searchTerm } = this.state;
    const { placeholder } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={this.handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;