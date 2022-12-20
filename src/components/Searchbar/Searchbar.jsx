import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    query: '',
    name: '',
    page: 1,
  };
  handleQueryChange = e => {
    const { value } = e.currentTarget;
    this.setState({ name: value });
  };

  handleSubmit = e => {
    if (this.state.name.trim() === '') {
      toast.error('Enter data for request');
      return;
    }
    e.preventDefault();
    this.props.onSubmit(this.state);

    this.reset();
  };

  reset() {
    this.setState({ name: '' });
  }

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
