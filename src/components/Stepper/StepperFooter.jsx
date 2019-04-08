import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StepperFooter = props => {
  const {
    nextButtonDisabled,
    nextButtonText,
    previousButtonText,
    resetButtonText,
    onNextClick,
    onPreviousClick,
    onResetClick
  } = props;

  return (
    <div className="clearfix">
      <div className="float-left">
        <button
          className="btn btn-secondary mt-3"
          onClick={() => onPreviousClick()}>
          <FontAwesomeIcon icon="arrow-circle-left" />
          &nbsp; {previousButtonText}
        </button>
        &nbsp;
        <button
          className="btn btn-primary mt-3"
          disabled={nextButtonDisabled}
          onClick={() => onNextClick()}>
          <FontAwesomeIcon icon="arrow-circle-right" />
          &nbsp; {nextButtonText}
        </button>
      </div>
      <div className="float-right">
        <button
          className="btn btn-secondary mt-3 float-right"
          onClick={() => onResetClick()}>
          <FontAwesomeIcon icon="undo-alt" />
          &nbsp; {resetButtonText}
        </button>
      </div>
    </div>
  );
};

StepperFooter.propTypes = {
  nextButtonDisabled: PropTypes.bool.isRequired,
  nextButtonText: PropTypes.string,
  previousButtonText: PropTypes.string,
  resetButtonText: PropTypes.string,
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onResetClick: PropTypes.func
};

StepperFooter.defaultProps = {
  nextButtonDisabled: false,
  nextButtonText: "Next",
  previousButtonText: "Previous",
  resetButtonText: "Start Again",
  onNextClick: () => void 0,
  onPreviousClick: () => void 0,
  onResetClick: () => void 0
};

export default StepperFooter;
