import React from "react";
import PropTypes from "prop-types";

const StepperHeader = props => {
  return (
    <h4 className="border-bottom border-gray pb-2 mb-0">{props.headerText}</h4>
  );
};

StepperHeader.propTypes = {
  headerText: PropTypes.string.isRequired
};

StepperHeader.defaultProps = {
  headerText: "Step Header Text"
};

export default StepperHeader;
