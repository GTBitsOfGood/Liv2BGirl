import fetch from "isomorphic-unfetch";
import { authedFetch } from "../utils/requests";
import urls from "../../utils/urls";

export const createComment = (parentId, content) =>
  fetch(urls.baseUrl + urls.api.comments.createComment(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentId,
      content,
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

export const getCommentsByThread = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.comments.getCommentsByThread(),
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
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const getCommentsByAskMeThread = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.comments.getCommentsByAskMeThread(),
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
    .then(response => response.json())
    .then(json => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
