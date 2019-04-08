import React, { Component } from "react";
import PropTypes from "prop-types";
import StepperContent from "./Stepper/StepperContent";
import { Consumer } from "../context";
import { searchUsers } from "../serverCall";
import Result from "./Search/Result";

class OwnerSelection extends Component {
  doUserSearch = async (searchTerm, apiKey, dispatch) => {
    return searchUsers(searchTerm, apiKey)
      .then(res => res.data)
      .then(res => {
        dispatch({ type: "UPDATE_USERS", payload: res });
      });
  };

  onOwnerSelection = (owner, dispatch) => {
    dispatch({ type: "SELECT_OWNER", payload: owner });
  };

  render() {
    return (
      <Consumer>
        {store => {
          const {
            dispatch,
            ownerId: selectedOwner,
            teamId: selectedTeam
          } = store;
          const { onNextClick, onPreviousClick, onResetClick } = this.props;
          const teamMembers = selectedTeam ? selectedTeam.members : [];
          const isOwnerNotSelected = !(selectedOwner && selectedOwner.ref);

          return (
            <StepperContent
              headerText="Select Owner for User Stories"
              onNext={() => onNextClick()}
              onPrevious={() => onPreviousClick()}
              onReset={() => onResetClick()}
              isButtonDisabled={isOwnerNotSelected}>
              <Result
                results={teamMembers}
                selectedItem={isOwnerNotSelected ? "" : selectedOwner.ref}
                onSelected={item => this.onOwnerSelection(item, dispatch)}
              />
            </StepperContent>
          );
        }}
      </Consumer>
    );
  }
}

OwnerSelection.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onResetClick: PropTypes.func
};

OwnerSelection.defaultPropTypes = {
  onNextClick: () => void 0,
  onPreviousClick: () => void 0,
  onResetClick: () => void 0
};

export default OwnerSelection;
