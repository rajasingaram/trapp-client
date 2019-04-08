import React from "react";

export const initialState = {
  currentState: 1,
  stateList: [
    {
      id: 1,
      text: "Rally API Key"
    },
    {
      id: 2,
      text: "Team"
    },
    {
      id: 3,
      text: "Owner"
    },
    {
      id: 4,
      text: "Release"
    },
    {
      id: 5,
      text: "Trello JSON"
    },
    {
      id: 6,
      text: "Upload Stories"
    }
  ],
  apiKey: null,
  teamId: null,
  ownerId: null,
  releaseId: null,
  trelloJson: null,
  teams: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "RESET":
      localStorage.removeItem("rallyApiKey", action.payload);
      return initialState;

    case "UPDATE_APIKEY":
      localStorage.setItem("rallyApiKey", action.payload);
      return {
        ...initialState,
        apiKey: action.payload
      };

    case "UPDATE_TEAMS":
      return {
        ...state,
        teams: action.payload
      };

    case "SELECT_TEAM":
      return {
        ...state,
        teamId: action.payload,
        ownerId: null,
        releaseId: null
      };

    case "SELECT_OWNER":
      return {
        ...state,
        ownerId: action.payload
      };

    case "SELECT_RELEASE":
      return {
        ...state,
        releaseId: action.payload
      };

    case "UPDATE_JSON":
      return {
        ...state,
        trelloJson: action.payload
      };
    default:
      return state;
  }
};

export const Context = React.createContext();
