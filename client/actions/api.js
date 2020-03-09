import fetch from "isomorphic-unfetch";
import Router from "next/router";
import cookie from "js-cookie";
import urls from "../../utils/urls";

export const signUp = ({
  username,
  email,
  password,
  avatar,
  avatarColor,
  age,
  grade,
  selectedTopics,
  role,
  name,
}) =>
  fetch(urls.baseUrl + urls.api.signUp(), {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      avatar,
      avatarColor,
      age,
      grade,
      selectedTopics,
      role,
      name,
    }),
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

export const login = (email, password) =>
  fetch(urls.baseUrl + urls.api.login(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        return json.message;
      }

      return json.payload;
    });

export const signOut = () => {
  cookie.remove("token");

  return Router.push({
    pathname: "/",
  });
};
