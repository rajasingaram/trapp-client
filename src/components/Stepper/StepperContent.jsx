import React from "react";
import PropTypes from "prop-types";
import StepperHeader from "./StepperHeader";
import StepperFooter from "./StepperFooter";

const StepperContent = props => {
  return (
    <React.Fragment>
      <StepperHeader headerText={props.headerText} />
      <div className="my-3">{props.children}</div>
      <StepperFooter
        nextButtonDisabled={props.isButtonDisabled}
        nextButtonText={props.nextButtonText}
        onNextClick={() => props.onNext()}
        previousButtonText={props.previousButtonText}
        onPreviousClick={() => props.onPrevious()}
        resetButtonText={props.resetButtonText}
        onResetClick={() => props.onReset()}
      />
    </React.Fragment>
  );
};

StepperContent.propTypes = {
  headerText: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onReset: PropTypes.func,
  nextButtonText: PropTypes.string,
  previousButtonText: PropTypes.string,
  resetButtonText: PropTypes.string
};

StepperContent.defaultProps = {
  isButtonDisabled: false,
  nextButtonText: "Next",
  previousButtonText: "Previous",
  resetButtonText: "Start Again"
};

export default StepperContent;
