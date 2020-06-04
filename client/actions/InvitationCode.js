import fetch from "isomorphic-unfetch";
import urls from "../../utils/urls";

export const createCode = () =>
  fetch(urls.baseUrl + urls.api.invitationCode.createCode(), {
    method: "GET",
    mode: "same-origin",
    credentials: "include",
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

export const verifyCodeUnused = code =>
  fetch(urls.baseUrl + urls.api.invitationCode.verifyCodeUnused(), {
    method: "POST",
    mode: "same-origin",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
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
