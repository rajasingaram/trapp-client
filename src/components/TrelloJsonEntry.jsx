import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../context";
import StepperContent from "./Stepper/StepperContent";

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
