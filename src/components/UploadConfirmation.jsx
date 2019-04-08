import React, { Component } from "react";
import PropTypes from "prop-types";
import StepperContent from "./Stepper/StepperContent";
import { Consumer } from "../context";

export class UploadConfirmation extends Component {
  static propTypes = {};

  uploadUserStories = store => {
    console.log("test upload", store);
  };

  render() {
    return (
      <Consumer>
        {store => {
          const {
            teamId: selectedTeam,
            ownerId: selectedOwner,
            releaseId: selectedRelease
          } = store;
          const { onNextClick, onPreviousClick, onResetClick } = this.props;

          return (
            <StepperContent
              headerText="Confirm Information and Upload User Stories"
              onNext={() => {
                this.uploadUserStories(store);
                onNextClick();
              }}
              nextButtonText="Import User Stories"
              onPrevious={() => onPreviousClick()}
              onReset={() => onResetClick()}
              isButtonDisabled={false}>
              <div className="my-3 p-3">
                <div className="row my-2">
                  <div className="inline-block font-weight-bold mx-2">
                    Selected Team:{" "}
                  </div>
                  <div className="inline-block mx-2">
                    {selectedTeam ? selectedTeam.name : "(Not Selected)"}
                  </div>
                </div>
                <div className="row my-2">
                  <div className="inline-block font-weight-bold mx-2">
                    Selected Owner:{" "}
                  </div>
                  <div className="inline-block mx-2">
                    {selectedOwner ? selectedOwner.name : "(Not Selected)"}
                  </div>
                </div>
                <div className="row my-2">
                  <div className="inline-block font-weight-bold mx-2">
                    Selected Release:{" "}
                  </div>
                  <div className="inline-block mx-2">
                    {selectedRelease ? selectedRelease.name : "(Not Selected)"}
                  </div>
                </div>
              </div>
            </StepperContent>
          );
        }}
      </Consumer>
    );
  }
}

UploadConfirmation.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onResetClick: PropTypes.func
};

UploadConfirmation.defaultPropTypes = {
  onNextClick: () => void 0,
  onPreviousClick: () => void 0,
  onResetClick: () => void 0
};

export default UploadConfirmation;
