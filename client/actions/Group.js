import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

export const getGroup = groupId =>
  fetch(urls.baseUrl + urls.api.getGroup(), {
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
