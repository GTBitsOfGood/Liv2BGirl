import { authedGetRequest, authedPostRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const createCode = (cookies) =>
  authedGetRequest(urls.baseUrl + urls.api.invitationCode.createCode(), cookies)
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
  authedPostRequest(
    urls.baseUrl + urls.api.invitationCode.verifyCodeUnused(),
    {
      code,
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
