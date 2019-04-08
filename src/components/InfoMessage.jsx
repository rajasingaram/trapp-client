import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoMessage = props => {
  return (
    <div className={"alert alert-warning " + props.className} role="alert">
      <div className="row vertical-align">
        <div className="col-xs-1 text-center mx-2">
          <FontAwesomeIcon icon="info-circle" size="lg" />
        </div>
        <div className="col-xs-11 ml-2">
          <strong>Info:</strong> {props.message}
        </div>
      </div>
    </div>
  );
};

InfoMessage.propTypes = {
  message: PropTypes.string
};

export default InfoMessage;
