import React, { Component } from "react";
import PropTypes from "prop-types";
import StepperContent from "./Stepper/StepperContent";
import { Consumer } from "../context";
import SearchContainer from "./Search/SearchContainer";
import { searchTeams } from "../serverCall";

class TeamSelection extends Component {
  doTeamSearch = async (searchTerm, apiKey, dispatch) => {
    return searchTeams(searchTerm, apiKey)
      .then(res => res.data)
      .then(res => {
        dispatch({ type: "UPDATE_TEAMS", payload: res });
        return res;
      });
  };

  onTeamSelection = (team, dispatch) => {
    dispatch({ type: "SELECT_TEAM", payload: team });
  };

  render() {
    return (
      <Consumer>
        {store => {
          const { teamId: selectedTeam, dispatch } = store;
          const { onNextClick, onPreviousClick, onResetClick } = this.props;
          const isTeamNotSelected = !(selectedTeam && selectedTeam.ref);

          return (
            <StepperContent
              headerText="Select Your Team"
              onNext={() => onNextClick()}
              onPrevious={() => onPreviousClick()}
              onReset={() => onResetClick()}
              isButtonDisabled={isTeamNotSelected}>
              <SearchContainer
                key="team-search"
                selectedItem={isTeamNotSelected ? "" : selectedTeam.ref}
                doSearch={searchTerm =>
                  this.doTeamSearch(searchTerm, store.apiKey, store.dispatch)
                }
                onItemSelected={team => this.onTeamSelection(team, dispatch)}
              />
            </StepperContent>
          );
        }}
      </Consumer>
    );
  }
}

TeamSelection.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onResetClick: PropTypes.func
};

TeamSelection.defaultPropTypes = {
  onNextClick: () => void 0,
  onPreviousClick: () => void 0,
  onResetClick: () => void 0
};

export default TeamSelection;
