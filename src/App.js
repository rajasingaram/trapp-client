import React, { Component } from "react";
import Header from "./components/Header";
import Search from "./components/Search/SearchContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div role="main" className="container">
          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              Step 1: Enter Your API Key
            </h6>
            <div className="my-3">
              <input
                type="text"
                placeholder="Enter your Rally API Key"
                className="form-control"
                aria-label="Rally API Key"
              />
              <button className="btn btn-primary mt-3">
                <FontAwesomeIcon icon="arrow-circle-right" />
                &nbsp; Next
              </button>
            </div>
          </div>

          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              Step 2: Select Your Team
            </h6>

            <Search type="team" />

            <button className="btn btn-primary mt-3">
              <FontAwesomeIcon icon="arrow-circle-right" />
              &nbsp; Next
            </button>
          </div>

          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              Step 3: Select Owner for User Stories
            </h6>

            <Search type="owner" />

            <div className="my-3">
              <button className="btn btn-primary mt-3">
                <FontAwesomeIcon icon="arrow-circle-right" />
                &nbsp; Next
              </button>
            </div>
          </div>

          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              Step 4: Select Release for User Stories
            </h6>

            <Search type="release" />

            <div className="my-3">
              <button className="btn btn-primary mt-3">
                <FontAwesomeIcon icon="arrow-circle-right" />
                &nbsp; Next
              </button>
            </div>
          </div>

          <div className="my-3 p-3 bg-white rounded shadow-sm">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              Step 5: Enter Trello JSON Data
            </h6>
            <div className="my-3">
              <textarea
                type=""
                placeholder="Enter JSON Data from Trello"
                className="form-control"
                rows="10"
                aria-label="Rally API Key"
              />

              <button className="btn btn-primary mt-3">
                <FontAwesomeIcon icon="plus-circle" />
                &nbsp; Import User Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
