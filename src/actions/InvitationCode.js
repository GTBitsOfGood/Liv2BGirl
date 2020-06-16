import { authedFetch } from "../utils/requests";
import urls from "../../utils/urls";

export const createCode = (cookies) =>
  authedFetch(
    urls.baseUrl + urls.api.invitationCode.createCode(),
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

export const verifyCodeUnused = (cookies, code) =>
  authedFetch(
    urls.baseUrl + urls.api.invitationCode.verifyCodeUnused(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
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
