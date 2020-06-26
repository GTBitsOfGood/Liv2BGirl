import { authedGetRequest, authedPostRequest } from "../utils/requests";
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.signUp(),
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.verifyEmailUnused(),
    {
      email,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.generateUsernames(),
    {
      description,
      thing,
      number,
      count,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.login(),
    {
      email,
      password,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.followGroup(),
    {
      groupId,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.unfollowGroup(),
    {
      groupId,
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
  authedGetRequest(urls.baseUrl + urls.api.user.getCurrentUser(), cookies)
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.getUser(),
    {
      userId,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.addAskBookmark(),
    {
      threadId,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.removeAskBookmark(),
    {
      threadId,
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
  authedGetRequest(urls.baseUrl + urls.api.user.getUserAskBookmarks(), cookies)
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.addGroupBookmark(),
    {
      threadId,
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
  authedPostRequest(
    urls.baseUrl + urls.api.user.removeGroupBookmark(),
    {
      threadId,
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
  authedGetRequest(
    urls.baseUrl + urls.api.user.getUserGroupBookmarks(),
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
