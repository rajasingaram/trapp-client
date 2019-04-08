import React, { Component } from "react";
import { Context, reducer, initialState } from "./store";

export class Provider extends Component {
  state = {
    ...initialState,
    currentState: localStorage.getItem("rallyApiKey") ? 2 : 1,
    apiKey: localStorage.getItem("rallyApiKey"),
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
