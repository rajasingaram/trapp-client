import React, { Component } from "react";
import Header from "./components/Header";
import { Provider } from "./context";
import TRStepper from "./components/TRStepper";

import "bootstrap/dist/css/bootstrap.min.css";
import "bs-stepper/dist/css/bs-stepper.min.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Header />
          <div role="main" className="container">
            <TRStepper />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
