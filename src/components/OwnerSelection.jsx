import React, { Component } from "react";
import PropTypes from "prop-types";
import StepperContent from "./Stepper/StepperContent";
import { Consumer } from "../context";
import Axios from "axios";
import Result from "./Search/Result";

class OwnerSelection extends Component {
  doUserSearch = async (searchTerm, apiKey, dispatch) => {
    const ownerUrl = `https://5c9f5f3c-f925-43b8-8102-d8e834a9160a.mock.pstmn.io/users?displayName=${searchTerm}`;

    const response = await Axios.get(ownerUrl, {
      headers: {
        "Content-Type": "application/json",
        apiKey: apiKey
      }
    });

    // Call Dispatch to add the new users to list.
    dispatch({ type: "UPDATE_USERS", payload: response.data });

    return response.data;
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
