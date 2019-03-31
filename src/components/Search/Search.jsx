import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      isSearchProgress: false
    };
  }

  onClick = e => {
    this.setState({ isSearchProgress: true });
  };

  render() {
    const { isSearchProgress } = this.state;
    const { type } = this.props;

    return (
      <div className="input-group input-group-lg">
        <input
          type="search"
          placeholder={"Search for a " + type}
          className="form-control"
          aria-label="Search through Rally"
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
              onClick={this.onClick}>
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
  type: PropTypes.string.isRequired
};

export default Search;
