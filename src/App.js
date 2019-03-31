import React, { Component } from "react";
import Header from "./components/Header";
import "bootswatch/dist/sandstone/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container" />
      </div>
    );
  }
}

export default App;
