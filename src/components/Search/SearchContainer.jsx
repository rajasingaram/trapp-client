import React, { Component } from "react";
import PropTypes from "prop-types";
import Search from "./Search";
import Result from "./Result";

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      isSearchProgress: false,
      results: null
    };
  }

  render() {
    return (
      <div className="search-container my-3">
        <Search type={this.props.type} />

        <Result type={this.props.type} />
      </div>
    );
  }
}

SearchContainer.propTypes = {
  type: PropTypes.string.isRequired
};

SearchContainer.defaultProps = {
  type: "team"
};

export default SearchContainer;
