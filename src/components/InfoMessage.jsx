import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoMessage = props => {
  return (
    <div className={"alert alert-warning " + props.className} role="alert">
      <div class="row vertical-align">
        <div class="col-xs-1 text-center mx-2">
          <FontAwesomeIcon icon="info-circle" size="lg" />
        </div>
        <div class="col-xs-11 ml-2">
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
