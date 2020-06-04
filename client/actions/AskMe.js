import fetch from "isomorphic-unfetch";
import { authedFetch } from "../utils/requests";
import urls from "../../utils/urls";

export const getAskThreads = cookies =>
  authedFetch(
    urls.baseUrl + urls.api.askMe.getAskThreads(),
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
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

export const getThread = (cookies, threadId) =>
  authedFetch(
    urls.baseUrl + urls.api.askMe.getThread(),
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

export const searchThreads = (cookies, terms) =>
  authedFetch(
    urls.baseUrl + urls.api.askMe.searchThreads(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        terms,
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

export const createThread = (title, content, visibility) =>
  fetch(urls.baseUrl + urls.api.askMe.createThread(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      visibility,
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

export const deleteThread = threadId =>
  fetch(urls.baseUrl + urls.api.askMe.deleteThread(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      threadId,
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

export const getUserQuestions = cookies =>
  authedFetch(
    urls.baseUrl + urls.api.askMe.getUserQuestions(),
    {
      method: "GET",
      mode: "same-origin",
      credentials: "include",
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
