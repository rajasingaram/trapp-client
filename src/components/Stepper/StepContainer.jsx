import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchContainer from "../Search/SearchContainer";
import Result from "../Search/Result";
import { Consumer } from "../../context";
import StepperHeader from "./StepperHeader";
import StepperFooter from "./StepperFooter";

export class StepContainer extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const {
            selectedItem,
            isSelected,
            type,
            headerText,
            results
          } = this.props;

          return (
            <div className="">
              <StepperHeader headerText={headerText} />

              <div>
                {type === "team" ? (
                  <SearchContainer type="team" />
                ) : (
                  <Result
                    type={type}
                    selectedItem={selectedItem}
                    results={results}
                    onSelected={item => this.props.onItemSelected(item)}
                  />
                )}
              </div>
              <StepperFooter
                nextButtonDisabled={!isSelected()}
                onNextClick={() => this.props.onNext()}
                onPreviousClick={() => this.props.onPrevious()}
                onResetClick={() => this.props.onReset()}
              />
            </div>
          );
        }}
      </Consumer>
    );
  }
}

StepContainer.propTypes = {
  type: PropTypes.string.isRequired,
  headerText: PropTypes.string.isRequired,
  onNext: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func
};

export default StepContainer;
