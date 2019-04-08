import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class APIKey extends Component {
  state = {
    localApiKey: "",
    error: null
  };

  onClick = (dispatch, e) => {
    let searchTerm = this.apiKeyControl.value;
    if (searchTerm.trim()) {
      dispatch({ type: "UPDATE_APIKEY", payload: this.apiKeyControl.value });
    } else {
      this.setState({
        error: "Please enter a valid string"
      });
    }
  };

  onEdit = (dispatch, e) => {
    dispatch({ type: "RESET" });
    this.setState({ localApiKey: "", error: null });
  };

  handleInputChange = () => {
    this.setState({
      localApiKey: this.apiKeyControl.value,
      error: null
    });
  };

  render() {
    const newLocal = (
      <div className="alert alert-warning" role="alert">
        <div className="text-uppercase font-weight-bold">
          How to retrieve API key from Rally?
        </div>

        <div className="mt-3">
          <ul>
            <li>
              Go to&nbsp;
              <a
                className="alert-link"
                href="https://rally1.rallydev.com/login/accounts/index.html#/keys"
                rel="noopener noreferrer"
                target="_blank">
                Rally API Keys
              </a>
              .
            </li>
            <li>Click the 'Create New API Key Button'</li>
            <li>Paste and submit your key below.</li>
          </ul>
        </div>
        <p className="font-italic">
          NOTE: More info on{" "}
          <a
            className="alert-link"
            href="https://comm.support.ca.com/kb/how-to-create-an-api-key-for-agile-central/kb000010814"
            rel="noopener noreferrer"
            target="_blank">
            how to create Rally API
          </a>
        </p>
      </div>
    );

    return (
      <Consumer>
        {value => {
          const { apiKey, dispatch } = value;
          const { localApiKey, error } = this.state;
          const disableButton =
            localApiKey === null || localApiKey.trim().length === 0;

          return (
            <div className="">
              <h6 className="border-bottom border-gray pb-2 mb-0">
                Enter Your Rally API Key
              </h6>
              <div className="my-3">
                {apiKey === null ? (
                  <React.Fragment>
                    {newLocal}
                    <p className="font-italic">
                      Generate a Rally API key so that this application can
                      create User Stories on your behalf.
                    </p>
                    <input
                      type="text"
                      placeholder="Enter your Rally API Key"
                      className={"form-control" + (error ? " is-invalid" : "")}
                      ref={input => (this.apiKeyControl = input)}
                      onChange={this.handleInputChange}
                      aria-label="Rally API Key"
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                    <button
                      className="btn btn-primary mt-3"
                      disabled={disableButton}
                      onClick={() => {
                        this.onClick(dispatch);
                        this.props.onNext();
                      }}>
                      <FontAwesomeIcon icon="arrow-circle-right" />
                      &nbsp; Next
                    </button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <div className="alert alert-dark clearfix" role="alert">
                      <span className="font-weight-bold">API Key: </span>
                      {apiKey}{" "}
                      <button
                        className="btn btn-outline-primary float-right"
                        onClick={() => this.onEdit(dispatch)}>
                        <FontAwesomeIcon icon="pen" />
                      </button>
                    </div>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => this.props.onNext()}>
                      <FontAwesomeIcon icon="arrow-circle-right" />
                      &nbsp; Next
                    </button>
                  </React.Fragment>
                )}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

APIKey.propTypes = {
  onNext: PropTypes.func.isRequired
};

export default APIKey;
