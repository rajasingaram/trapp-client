import React, { Component } from "react";
import PropTypes from "prop-types";

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ""
    };
  }

  onClick = item => {
    console.log(item);
    this.setState({
      selected: item.ref
    });
  };

  render() {
    const { result } = this.props;
    const { selectedItem } = this.state;
    let i = 1;
    const mapResultItem = item => {
      let styling =
        "list-group-item list-group-item-action" +
        (selectedItem === item.ref ? " active" : "");

      return (
        <li
          className={styling}
          onClick={() => this.onClick(item)}
          key={item.ref + i++}>
          {item.name}
        </li>
      );
    };

    return (
      <div className="mt-5">
        <ul className="list-group">{result.map(mapResultItem)}</ul>
      </div>
    );
  }
}

Result.propTypes = {
  type: PropTypes.string.isRequired,
  result: PropTypes.array
};

Result.defaultProps = {
  type: "team",
  result: [
    { ref: "/project/projectId1", name: "RMA.Bits&Giggles" },
    { ref: "/project/projectId1", name: "RMA.CharlieBrown" },
    { ref: "/project/projectId1", name: "RMA.Everest" }
  ]
};

export default Result;
