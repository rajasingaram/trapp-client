import Axios from "axios";

const serverUrl = "https://5c9f5f3c-f925-43b8-8102-d8e834a9160a.mock.pstmn.io";
// const serverUrl = "http://10.80.100.90:8080/";

export const searchTeams = (searchTerm, apiKey) => {
  const teamsUrl = `${serverUrl}/teams/${searchTerm}`;

  return Axios.get(teamsUrl, {
    headers: {
      "Content-Type": "application/json",
      apiKey: apiKey
    }
  });
};

export const searchUsers = (searchTerm, apiKey) => {
  const ownerUrl = `${serverUrl}/users?displayName=${searchTerm}`;

  return Axios.get(ownerUrl, {
    headers: {
      "Content-Type": "application/json",
      apiKey: apiKey
    }
  });
};

export const bulkInsertStories = (message, apiKey) => {
  const bulkInsertUrl = `${serverUrl}/userstories/bulkInsert`;

  return Axios.post(bulkInsertUrl, JSON.stringify(message), {
    headers: {
      "Content-Type": "application/json",
      apiKey: apiKey
    },
    cache: "no-cache",
    redirect: "follow",
    referrer: "no-referrer"
  });
};
