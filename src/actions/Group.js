import { authedPostRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const getGroup = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.group.getGroup(),
    {
      id,
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

export const createGroup = (cookies, name, description, category) =>
  authedPostRequest(
    urls.baseUrl + urls.api.group.createGroup(),
    {
      name,
      description,
      category,
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

export const deleteGroup = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.group.deleteGroup(),
    {
      id,
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

export const searchGroups = (cookies, { term, category }) =>
  authedPostRequest(
    urls.baseUrl + urls.api.group.searchGroups(),
    {
      term,
      category,
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
