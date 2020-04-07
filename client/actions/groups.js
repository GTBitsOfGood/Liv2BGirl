import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

export const createGroup = (name, description, tags) => {
  fetch(urls.baseUrl + urls.api.createGroup(), {
    method: "post",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      tags,
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
};
