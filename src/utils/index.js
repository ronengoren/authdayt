import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";
const queryString = require("query-string");

export default {
  fetchMessages: additionalQueryParams => {
    let params = {};
    Object.keys(additionalQueryParams).forEach((key, i) => {
      params[key] = additionalQueryParams[key];
    });
    return AsyncStorage.getItem(config.userIdKey).then(key => {
      params.toUser = key;
      let query = queryString.stringify(params);
      console.log(query);
      return fetch(`${config.baseUrl}/message?${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
    });
  }
};
