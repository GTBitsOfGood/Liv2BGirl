import { authedPostRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const createComment = (cookies, parentId, content, taggedUsers) =>
  authedPostRequest(
    urls.baseUrl + urls.api.comment.createComment(),
    {
      parentId,
      content,
      taggedUsers,
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

export const editComment = (cookies, id, content) =>
  authedPostRequest(
    urls.baseUrl + urls.api.comment.editComment(),
    {
      id,
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

export const deleteComment = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.comment.deleteComment(),
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

export const getCommentsByThread = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.comment.getCommentsByThread(),
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

export const getCommentsByAskMeThread = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.comment.getCommentsByAskMeThread(),
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
