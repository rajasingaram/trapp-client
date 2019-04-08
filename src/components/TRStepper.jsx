import React, { Component } from "react";
import Stepper from "bs-stepper";
import { Consumer } from "../context";
import APIKey from "./APIKey";
import TeamSelection from "./TeamSelection";
import OwnerSelection from "./OwnerSelection";
import ReleaseSelection from "./ReleaseSelection";
import TrelloJsonEntry from "./TrelloJsonEntry";
import UploadConfirmation from "./UploadConfirmation";

export class TRStepper extends Component {
  currentStep = 1;

  componentDidMount() {
    this.stepper = new Stepper(this.stepperContainer, {
      linear: true,
      animation: true
    });

    this.stepper.to(this.currentStep);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onReset = dispatch => {
    dispatch({ type: "RESET" });
    this.stepper.reset();
  };

  render() {
    const stepHeader = (step, index) => {
      const target = `#test-l-${step.id}`;

      return (
        <React.Fragment key={target}>
          {index > 0 ? <div className="line" /> : ""}
          <div className="step" data-target={target}>
            <button className="step-trigger">
              <span className="bs-stepper-circle">{step.id}</span>
              <span className="bs-stepper-label">{step.text}</span>
            </button>
          </div>
        </React.Fragment>
      );
    };

    return (
      <Consumer>
        {store => {
          const { stateList, currentState, dispatch } = store;
          this.currentStep = currentState;

          return (
            <div
              id="stepper1"
              className="bs-stepper mt-3"
              ref={input => (this.stepperContainer = input)}>
              <div className="bs-stepper-header  rounded shadow-sm">
                {stateList.map(stepHeader)}
              </div>
              <div className="bs-stepper-content my-4 p-3  rounded shadow-sm ">
                <form onSubmit={this.onSubmit}>
                  <div id="test-l-1" className="content">
                    <APIKey onNext={() => this.stepper.next()} />
                  </div>

                  <div id="test-l-2" className="content">
                    <TeamSelection
                      onNextClick={() => this.stepper.next()}
                      onPreviousClick={() => this.stepper.previous()}
                      onResetClick={() => this.onReset(dispatch)}
                    />
                  </div>

                  <div id="test-l-3" className="content">
                    <OwnerSelection
                      onNextClick={() => this.stepper.next()}
                      onPreviousClick={() => this.stepper.previous()}
                      onResetClick={() => this.onReset(dispatch)}
                    />
                  </div>

                  <div id="test-l-4" className="content">
                    <ReleaseSelection
                      onNextClick={() => this.stepper.next()}
                      onPreviousClick={() => this.stepper.previous()}
                      onResetClick={() => this.onReset(dispatch)}
                    />
                  </div>

                  <div id="test-l-5" className="content">
                    <TrelloJsonEntry
                      onNextClick={() => this.stepper.next()}
                      onPreviousClick={() => this.stepper.previous()}
                      onResetClick={() => this.onReset(dispatch)}
                    />
                  </div>

                  <div id="test-l-6" className="content">
                    <UploadConfirmation
                      onNextClick={() => this.stepper.next()}
                      onPreviousClick={() => this.stepper.previous()}
                      onResetClick={() => this.onReset(dispatch)}
                    />
                  </div>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default TRStepper;
