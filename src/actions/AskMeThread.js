import { authedGetRequest, authedPostRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const getAskThreads = (cookies) =>
  authedGetRequest(urls.baseUrl + urls.api.askMeThread.getAskThreads(), cookies)
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
  authedGetRequest(urls.baseUrl + urls.api.askMeThread.getReportedThreads(), cookies)
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
    urls.baseUrl + urls.api.askMeThread.getThread(),
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

export const searchThreads = (cookies, terms) =>
  authedPostRequest(
    urls.baseUrl + urls.api.askMeThread.searchThreads(),
    {
      terms,
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

export const createThread = (cookies, title, content, visibility) =>
  authedPostRequest(
    urls.baseUrl + urls.api.askMeThread.createThread(),
    {
      title,
      content,
      visibility,
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
    urls.baseUrl + urls.api.askMeThread.deleteThread(),
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
      urls.baseUrl + urls.api.askMeThread.reportThread(),
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

export const getUserQuestions = (cookies) =>
  authedGetRequest(
    urls.baseUrl + urls.api.askMeThread.getUserQuestions(),
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
