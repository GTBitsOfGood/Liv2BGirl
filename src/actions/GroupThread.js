import { authedPostRequest, authedGetRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const getGroupThreads = (cookies, groupId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.groupThread.getGroupThreads(),
    {
      groupId,
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

export const getReportedThreads = (cookies) =>
  authedGetRequest(
    urls.baseUrl + urls.api.askMeThread.getReportedThreads(),
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

export const getThread = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.groupThread.getThread(),
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

export const searchThreads = (cookies, term, groupId) =>
  authedPostRequest(
    urls.baseUrl + urls.api.groupThread.searchThreads(),
    {
      term,
      groupId,
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

export const createThread = (cookies, groupId, title, content) =>
  authedPostRequest(
    urls.baseUrl + urls.api.groupThread.createThread(),
    {
      groupId,
      title,
      content,
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

export const deleteThread = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.groupThread.deleteThread(),
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

export const reportThread = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.groupThread.reportThread(),
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
