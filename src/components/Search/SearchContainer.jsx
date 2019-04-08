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
      results: props.results || []
    };
  }

  search = searchTerm => {
    this.setState({
      query: searchTerm,
      isSearchProgress: true
    });

    try {
      this.props.doSearch(searchTerm).then(res => {
        this.setState({
          isSearchProgress: false,
          results: res
        });
      });
    } catch (e) {
      this.setState({
        isSearchProgress: false,
        results: []
      });
    }
  };

  render() {
    console.log(this.state.results);
    return (
      <div className="search-container my-3">
        <Search
          type={this.props.type}
          searchTerm={this.state.query}
          isSearchProgress={this.state.isSearchProgress}
          doSearch={searchTerm => this.search(searchTerm)}
        />

        <Result
          key={"results" + this.key}
          type={this.props.type}
          selectedItem={this.props.selectedItem}
          results={this.state.results}
          onSelected={selectedItem => this.props.onItemSelected(selectedItem)}
        />
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
