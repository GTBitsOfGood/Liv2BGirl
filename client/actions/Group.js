import { authedFetch } from "../utils/requests";
import urls from "../../utils/urls";

export const getGroup = (cookies, id) =>
  authedFetch(
    urls.baseUrl + urls.api.groups.getGroup(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
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

export const createGroup = (cookies, name, description, category) =>
  authedFetch(
    urls.baseUrl + urls.api.groups.createGroup(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        category,
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

export const deleteGroup = (cookies, id) =>
  authedFetch(
    urls.baseUrl + urls.api.groups.deleteGroup(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
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

export const searchGroups = (cookies, { term, category }) =>
  authedFetch(
    urls.baseUrl + urls.api.groups.searchGroups(),
    {
      method: "POST",
      mode: "same-origin",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        term,
        category,
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
