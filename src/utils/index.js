import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";
const queryString = require("query-string");

export default {
  fetchMessages: (endpoint, additionalQueryParams) => {
    let params = {};
    Object.keys(additionalQueryParams).forEach((key, i) => {
      params[key] = additionalQueryParams[key];
    });
    return AsyncStorage.getItem(config.userIdKey).then(key => {
      params.toUser = key;
      let query = queryString.stringify(params);
      console.log(query);
      return fetch(`${config.baseUrl}${endpoint}?${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
    });
  },
  createMessages: additionalParams => {
    let params = {};
    Object.keys(additionalParams).forEach((key, i) => {
      params[key] = additionalParams[key];
    });
    return AsyncStorage.getItem(config.userIdKey).then(key => {
      params.fromUser = key;
      return fetch(`${config.baseUrl}api/message`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        body: JSON.stringify(params)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => {
          console.log(err);
          alert("Sorry: " + err.message);
        });
    });
  },

  sortMessagesByDate: arrayOfMessages => {
    console.log(arrayOfMessages);
    arrayOfMessages.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    return arrayOfMessages;
  }
};
