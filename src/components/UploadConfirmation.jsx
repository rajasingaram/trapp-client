import React, { Component } from "react";
import PropTypes from "prop-types";
import StepperContent from "./Stepper/StepperContent";
import { Consumer } from "../context";
import { bulkInsertStories } from "../serverCall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorMessage from "./ErrorMessage";

export class UploadConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleActive: false,
      isUploadInprogress: false,
      response: null,
      error: null
    };
  }

  uploadUserStories = store => {
    const {
      apiKey,
      teamId: selectedTeam,
      ownerId: selectedOwner,
      releaseId: selectedRelease,
      trelloJson
    } = store;

    const message = {
      teamId: selectedTeam.ref,
      userId: selectedOwner.ref,
      releaseId: selectedRelease.ref,
      trelloJson: trelloJson,
      insertDescToAC: this.state.toggleActive
    };

    this.setState({
      isUploadInprogress: true,
      response: null,
      error: null
    });

    bulkInsertStories(message, apiKey)
      .then(res => res.data)
      .then(res =>
        this.setState({
          isUploadInprogress: false,
          response: res,
          error: null
        })
      )
      .catch(err => {
        console.error(err.response);
        this.setState({
          isUploadInprogress: false,
          response: null,
          error: JSON.stringify(err.response.data)
        });
      });
  };

  onToggle = () => {
    this.setState({ toggleActive: !this.state.toggleActive });
  };

  render = () => {
    return (
      <Consumer>
        {store => {
          const {
            teamId: selectedTeam,
            ownerId: selectedOwner,
            releaseId: selectedRelease
          } = store;
          const { onNextClick, onPreviousClick, onResetClick } = this.props;

          const buttonText = () => {
            if (this.state.isUploadInprogress) {
              return (
                <React.Fragment>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Loading...
                </React.Fragment>
              );
            } else {
              return "Import User Stories";
            }
          };

          const isButtonDisabled =
            this.state.isUploadInprogress || this.state.response !== null;
          return (
            <StepperContent
              headerText="Confirm Information and Upload User Stories"
              onNext={() => {
                this.uploadUserStories(store);
                onNextClick();
              }}
              nextButtonText={buttonText()}
              onPrevious={() => onPreviousClick()}
              onReset={() => onResetClick()}
              isButtonDisabled={isButtonDisabled}>
              {this.state.error ? (
                <ErrorMessage message="Error while importing stories into Rally. Please verify the JSON copied from Trello Board." />
              ) : this.state.response ? (
                this.displayResponse(this.state.response)
              ) : (
                this.displaySelectInfo(
                  selectedTeam,
                  selectedOwner,
                  selectedRelease
                )
              )}
            </StepperContent>
          );
        }}
      </Consumer>
    );
  };

  displayResponse = response => {
    return (
      <div className="alert alert-success" role="alert">
        <div className="row vertical-align">
          <div className="col-xs-1 text-center mx-2">
            <FontAwesomeIcon icon="check-circle" size="lg" />
          </div>
          <div class="col-xs-11 ml-2">
            <strong>Success:</strong> Imported the following stories into Rally.
          </div>
        </div>

        <div className="my-3 p-3">
          {response.createdStories && (
            <ul className="list-group">
              {response.createdStories.map(item =>
                this.displayUserStories("success", item)
              )}
            </ul>
          )}

          {response.errorStories && (
            <ul className="list-group">
              {response.errorStories.map(item =>
                this.displayUserStories("danger", item)
              )}
            </ul>
          )}
        </div>
      </div>
    );
  };

  displayUserStories = (status, userStory) => {
    return (
      <li
        className={"list-group-item list-group-item-" + status}
        key={userStory.userStoryId}>
        {userStory.userStoryId + " - " + userStory.name}
      </li>
    );
  };

  displaySelectInfo = (selectedTeam, selectedOwner, selectedRelease) => {
    return (
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

        <div className="row my-2">
          <div className="inline-block font-weight-bold mx-2">
            Add the trello card description to Acceptance Criteria :{" "}
          </div>
          <div className="inline-block mx-2">
            <input
              type="checkbox"
              checked={this.state.toggleActive}
              onChange={() => this.onToggle()}
            />
          </div>
        </div>
      </div>
    );
  };
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
