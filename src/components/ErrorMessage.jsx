import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = props => {
  return (
    <div className={"alert alert-danger " + props.className} role="alert">
      <div className="row vertical-align">
        <div className="col-xs-1 text-center mx-2">
          <FontAwesomeIcon icon="exclamation-triangle" size="lg" />
        </div>
        <div className="col-xs-11 ml-2">
          <strong>Error:</strong> {props.message}
        </div>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
