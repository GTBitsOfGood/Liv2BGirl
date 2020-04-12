import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

export const getCommentsByThread = threadId => {
  return fetch(urls.baseUrl + urls.api.getCommentsByThread(), {
    method: "get",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      threadId,
    },
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
