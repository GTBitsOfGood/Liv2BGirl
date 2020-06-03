import fetch from "isomorphic-unfetch";
import Router from "next/router";
import cookie from "js-cookie";
import urls from "../../utils/urls";

export const signUp = ({
  invCode,
  username,
  email,
  password,
  avatar,
  avatarColor,
  age,
  grade,
  role,
  name,
  interests,
}) =>
  fetch(urls.baseUrl + urls.api.user.signUp(), {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      invCode,
      username,
      email,
      password,
      avatar,
      avatarColor,
      age,
      grade,
      role,
      name,
      interests,
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

export const verifyEmailUnused = email =>
  fetch(urls.baseUrl + urls.api.user.verifyEmailUnused(), {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
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
  fetch(urls.baseUrl + urls.api.user.login(), {
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
  fetch(urls.baseUrl + urls.api.user.followGroup(), {
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
  fetch(urls.baseUrl + urls.api.user.unfollowGroup(), {
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

export const getCurrentUser = cookies => {
  const conditionals = {};

  if (cookies != null) {
    conditionals.headers = {
      cookie: cookies,
    };
  }

  return fetch(urls.baseUrl + urls.api.user.getCurrentUser(), {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
    ...conditionals,
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
};

export const getUser = userId =>
  fetch(urls.baseUrl + urls.api.user.getUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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

export const addAskBookmark = (threadId, userId) =>
  fetch(urls.baseUrl + urls.api.user.addAskBookmark(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      threadId,
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

export const removeAskBookmark = (threadId, userId) =>
  fetch(urls.baseUrl + urls.api.user.removeAskBookmark(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      threadId,
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

export const getUserAskBookmarks = userId =>
  fetch(urls.baseUrl + urls.api.user.getUserAskBookmarks(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
