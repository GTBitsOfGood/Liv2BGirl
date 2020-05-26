import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

export const getGroupThreads = groupId =>
  fetch(urls.baseUrl + urls.api.threads.getGroupThreads(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      groupId,
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

export const getThread = threadId =>
  fetch(urls.baseUrl + urls.api.threads.getThread(), {
    method: "POST",
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

export const searchThreads = (terms, groupId) =>
  fetch(urls.baseUrl + urls.api.threads.searchThreads(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      terms,
      groupId,
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

export const createThread = (posterId, groupId, title, content) =>
  fetch(urls.baseUrl + urls.api.threads.createThread(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      posterId,
      groupId,
      title,
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

export const deleteThread = threadId =>
  fetch(urls.baseUrl + urls.api.threads.deleteThread(), {
    method: "POST",
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
