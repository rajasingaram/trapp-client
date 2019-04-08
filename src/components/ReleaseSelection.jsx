import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../context";
import Result from "./Search/Result";
import StepperContent from "./Stepper/StepperContent";

export class ReleaseSelection extends Component {
  onReleaseSelection = (release, dispatch) => {
    dispatch({ type: "SELECT_RELEASE", payload: release });
  };

  render() {
    return (
      <Consumer>
        {store => {
          const {
            dispatch,
            releaseId: selectedRelease,
            teamId: selectedTeam
          } = store;
          const { onNextClick, onPreviousClick, onResetClick } = this.props;
          const releaseList = selectedTeam ? selectedTeam.releases : [];
          const isReleaseNotSelected = !(
            selectedRelease && selectedRelease.ref
          );

          return (
            <StepperContent
              headerText="Select Owner for User Stories"
              onNext={() => onNextClick()}
              onPrevious={() => onPreviousClick()}
              onReset={() => onResetClick()}
              isButtonDisabled={isReleaseNotSelected}>
              <Result
                results={releaseList}
                selectedItem={isReleaseNotSelected ? "" : selectedRelease.ref}
                onSelected={item => this.onReleaseSelection(item, dispatch)}
              />
            </StepperContent>
          );
        }}
      </Consumer>
    );
  }
}

ReleaseSelection.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onResetClick: PropTypes.func
};

ReleaseSelection.defaultPropTypes = {
  onNextClick: () => void 0,
  onPreviousClick: () => void 0,
  onResetClick: () => void 0
};

export default ReleaseSelection;
