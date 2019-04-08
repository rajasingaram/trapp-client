import React, { Component } from "react";
import PropTypes from "prop-types";
import StepperContent from "./Stepper/StepperContent";
import { Consumer } from "../context";
import Axios from "axios";

export class UploadConfirmation extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      trelloJson: trelloJson
    };

    this.setState({
      isUploadInprogress: true,
      response: null,
      error: null
    });

    const ownerUrl = `https://5c9f5f3c-f925-43b8-8102-d8e834a9160a.mock.pstmn.io/userstories/bulkInsert`;
    Axios.post(ownerUrl, JSON.stringify(message), {
      headers: {
        "Content-Type": "application/json",
        apiKey: apiKey
      },
      cache: "no-cache",
      redirect: "follow",
      referrer: "no-referrer"
    })
      .catch(err =>
        this.setState({
          isUploadInprogress: false,
          response: null,
          error: err
        })
      )
      .then(res => res.data)
      .then(res =>
        this.setState({
          isUploadInprogress: false,
          response: res,
          error: null
        })
      );
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
              isButtonDisabled={this.state.isUploadInprogress}>
              {this.state.error
                ? this.displayErrorMessage(this.state.error)
                : this.state.response
                ? this.displayResponse(this.state.response)
                : this.displaySelectInfo(
                    selectedTeam,
                    selectedOwner,
                    selectedRelease
                  )}
            </StepperContent>
          );
        }}
      </Consumer>
    );
  };

  displayErrorMessage = error => {
    return (
      <div class="alert alert-danger" role="alert">
        {error}
      </div>
    );
  };

  displayResponse = response => {
    return (
      <div className="my-3 p-3">
        {response.createdStories && (
          <ul class="list-group">
            {response.createdStories.map(item =>
              this.displayUserStories("success", item)
            )}
          </ul>
        )}

        {response.errorStories && (
          <ul class="list-group">
            {response.errorStories.map(item =>
              this.displayUserStories("danger", item)
            )}
          </ul>
        )}
      </div>
    );
  };

  displayUserStories = (status, userStory) => {
    return (
      <li class={"list-group-item list-group-item-" + status}>
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
