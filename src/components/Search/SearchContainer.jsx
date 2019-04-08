import React, { Component } from "react";
import PropTypes from "prop-types";
import Search from "./Search";
import Result from "./Result";
import ErrorMessage from "../ErrorMessage";

class SearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      isSearchProgress: false,
      results: props.results || [],
      error: null
    };
  }

  search = searchTerm => {
    this.setState({
      query: searchTerm,
      isSearchProgress: true,
      error: null
    });

    this.props
      .doSearch(searchTerm)
      .then(res => {
        this.setState({
          isSearchProgress: false,
          results: res,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          isSearchProgress: false,
          results: [],
          error: error
        });
      });
  };

  render() {
    return (
      <div className="search-container my-3">
        <Search
          type={this.props.type}
          searchTerm={this.state.query}
          isSearchProgress={this.state.isSearchProgress}
          doSearch={searchTerm => this.search(searchTerm)}
        />
        {this.state.error ? (
          <ErrorMessage
            message="Error while searching for the given team name. Try a different search term."
            className="mt-3"
          />
        ) : this.state.results.length ? (
          <Result
            key={"results" + this.key}
            type={this.props.type}
            selectedItem={this.props.selectedItem}
            results={this.state.results}
            onSelected={selectedItem => this.props.onItemSelected(selectedItem)}
          />
        ) : (
          <ErrorMessage
            message="No team found. Try a different search term."
            className="mt-3"
          />
        )}
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
