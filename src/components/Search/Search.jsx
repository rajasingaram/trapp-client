import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: this.props.searchTerm
    };
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.onClick(event);
    }
  };

  onClick = e => {
    const searchTerm = this.searchControl.value;
    if (searchTerm.trim()) {
      this.setState({ query: searchTerm });
      this.props.doSearch(searchTerm);
    }

    e.preventDefault();
  };

  render() {
    const { isSearchProgress, type } = this.props;

    return (
      <div className="input-group">
        <input
          type="search"
          placeholder={"Search for a " + type}
          className="form-control"
          aria-label="Search through Rally"
          ref={input => (this.searchControl = input)}
          onKeyPress={this.handleKeyPress}
        />
        <div className="input-group-append">
          {isSearchProgress ? (
            <button className="btn btn-primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              &nbsp;Loading...
            </button>
          ) : (
            <button
              className="btn btn-primary btn-search"
              onClick={() => this.onClick(this.props.doSearch)}>
              <FontAwesomeIcon icon="search" />
              &nbsp; Search
            </button>
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  type: PropTypes.string.isRequired,
  isSearchProgress: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default Search;
