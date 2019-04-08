import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Result extends Component {
  render() {
    const { selectedItem, results } = this.props;
    let i = 1;
    const mapResultItem = item => {
      const isActive = selectedItem === item.ref;
      let styling =
        "list-group-item list-group-item-action" + (isActive ? " active" : "");

      console.log(selectedItem);

      return (
        <button
          type="button"
          className={styling}
          onClick={() => {
            this.props.onSelected(item);
          }}
          key={item.ref + i++}>
          {item.name}
          {isActive ? (
            <span className="d-inline-block ml-2">
              <FontAwesomeIcon icon="check-circle" />
            </span>
          ) : (
            ""
          )}
        </button>
      );
    };

    if (results) {
      if (results && results.length) {
        return (
          <div className="mt-4">
            <div className="list-group">{results.map(mapResultItem)}</div>
          </div>
        );
      } else {
        return (
          <div className="alert alert-dark mt-4" role="alert">
            Please do a search to select a team
          </div>
        );
      }
    }
    return;
  }
}

Result.propTypes = {
  type: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
  results: PropTypes.array,
  onSelected: PropTypes.func
};

Result.defaultProps = {
  type: "team",
  selectedItem: null,
  results: [],
  onSelected: () => {}
};

export default Result;
