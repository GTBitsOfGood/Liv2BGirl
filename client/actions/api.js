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
        throw new Error(json.message);
      }

      return json.payload;
    });

export const followGroup = (groupId, userId) =>
  fetch(urls.baseUrl + urls.api.followGroup(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
      userId,
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

export const unfollowGroup = (groupId, userId) =>
  fetch(urls.baseUrl + urls.api.unfollowGroup(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
      userId,
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

export const signOut = () => {
  cookie.remove("token");

  return Router.push({
    pathname: "/",
  });
};

export const createThread = (groupId, title, content, tags = []) => {
  fetch(urls.baseUrl + urls.api.createThread(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
      title,
      tags,
      content,
    }),
  })
    .then(response => {
      response.json();
      console.log(response);
    })
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }
      return json.payload;
    });
};
