import { authedFetch } from "../utils/requests";
import urls from "../../utils/urls";

export const signUp = (
  cookies,
  {
    invCode,
    email,
    username,
    password,
    avatar,
    avatarColor,
    age,
    grade,
    role,
    name,
    interests,
  }
) =>
  authedFetch(
    urls.baseUrl + urls.api.user.signUp(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invCode,
        email,
        username,
        password,
        avatar,
        avatarColor,
        age,
        grade,
        role,
        name,
        interests,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const verifyEmailUnused = (cookies, email) =>
  authedFetch(
    urls.baseUrl + urls.api.user.verifyEmailUnused(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const generateUsernames = (cookies, description, thing, number, count) =>
  authedFetch(
    urls.baseUrl + urls.api.user.generateUsernames(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        thing,
        number,
        count,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const login = (cookies, email, password) =>
  authedFetch(
    urls.baseUrl + urls.api.user.login(),
    {
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
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const followGroup = (cookies, groupId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.followGroup(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const unfollowGroup = (cookies, groupId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.unfollowGroup(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const getCurrentUser = (cookies) =>
  authedFetch(
    urls.baseUrl + urls.api.user.getCurrentUser(),
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const getUser = (cookies, userId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.getUser(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const addAskBookmark = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.addAskBookmark(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const removeAskBookmark = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.removeAskBookmark(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const getUserAskBookmarks = (cookies) =>
  authedFetch(
    urls.baseUrl + urls.api.user.getUserAskBookmarks(),
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const addGroupBookmark = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.addGroupBookmark(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const removeGroupBookmark = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.user.removeGroupBookmark(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        threadId,
      }),
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const getUserGroupBookmarks = (cookies) =>
  authedFetch(
    urls.baseUrl + urls.api.user.getUserGroupBookmarks(),
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
    },
    cookies
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
