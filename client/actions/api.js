import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

export const helloWorld = () =>
  fetch(urls.baseUrl + urls.api.example(), {
    method: "get",
    mode: "no-cors",
    credentials: "include"
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const signUp = (username, password, email, role, name) =>
  fetch(urls.baseUrl + urls.api.signUp(), {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password,
      name,
      role,
      username
    })
  })
    .then(response => {
      console.log("Response:");
      console.log(response);
      response.json();
    })
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }
      console.log("JSON Payload:");
      console.log(json.payload);
      return json.payload;
    });
