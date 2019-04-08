import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../context";
import StepperContent from "./Stepper/StepperContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class TrelloJsonEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trelloJson: "",
      error: null
    };
  }

  handleInputChange = () => {
    this.setState({
      trelloJson: this.trelloJsonControl.value,
      error: null
    });
  };

  saveTrelloJson = (dispatch, onNextClick) => {
    let jsonStr = this.trelloJsonControl.value;

    if (this.isJsonString(jsonStr)) {
      dispatch({ type: "UPDATE_JSON", payload: jsonStr });
      onNextClick();
    } else {
      this.setState({
        error: "Please enter a valid JSON String"
      });
    }
  };

  isJsonString = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  exportTrelloJsonInstructions = () => {
    return (
      <div className="alert alert-info" role="alert">
        <div className="text-uppercase font-weight-bold">
          <FontAwesomeIcon icon="info-circle" size="lg" className="mr-3" />
          How to Export Trello Board as JSON?
        </div>

        <div className="mt-3">
          <ul>
            <li>
              Open your Trello Board. Example&nbsp;
              <a
                className="link font-italic font-weight-bold"
                href="https://trello.com/b/GegkmZjO/rma-example-pip-board-v2"
                rel="noopener noreferrer"
                target="_blank">
                Sample Trello Board
              </a>
              &nbsp;to be used for this export function.
            </li>
            <li>
              Click on the "<span className="font-italic">Show Menu</span>" link
              on the top right corner of your window.
            </li>
            <li>
              Click on the "<span className="font-italic">More</span>" link in
              the first section of the right popup-pane.
            </li>
            <li>
              Click on the "
              <span className="font-italic">Print and Export</span>" link in the
              second section of the right popup-pane.
            </li>
            <li>
              Click on the "<span className="font-italic">Export as JSON</span>"
              link in the modal popup on the right popup-pane.
            </li>
            <li>The window will be reloaded to show the JSON data.</li>
            <li>Copy the entire JSON and paste it to the below textbox.</li>
          </ul>
        </div>
        <p className="font-italic">
          NOTE: Do not format the JSON copied from the Trello Window.
        </p>
      </div>
    );
  };

  render() {
    return (
      <Consumer>
        {store => {
          const { dispatch } = store;
          const { trelloJson, error } = this.state;
          const { onNextClick, onPreviousClick, onResetClick } = this.props;
          const isTrelloJsonEntered =
            trelloJson === null || trelloJson.trim().length === 0;

          return (
            <StepperContent
              headerText="Enter Trello JSON Data"
              onNext={() => this.saveTrelloJson(dispatch, onNextClick)}
              onPrevious={() => onPreviousClick()}
              onReset={() => onResetClick()}
              isButtonDisabled={isTrelloJsonEntered}>
              {this.exportTrelloJsonInstructions()}

              <textarea
                placeholder="Enter JSON Data from Trello"
                className={"form-control" + (error ? " is-invalid" : "")}
                rows="10"
                ref={input => (this.trelloJsonControl = input)}
                onChange={this.handleInputChange}
                aria-label="Trello JSON"
              />
              {error && <div className="invalid-feedback">{error}</div>}
            </StepperContent>
          );
        }}
      </Consumer>
    );
  }
}

TrelloJsonEntry.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  onResetClick: PropTypes.func
};

TrelloJsonEntry.defaultPropTypes = {
  onNextClick: () => void 0,
  onPreviousClick: () => void 0,
  onResetClick: () => void 0
};

export default TrelloJsonEntry;
