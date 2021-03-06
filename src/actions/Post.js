import { authedPostRequest } from "../utils/requests";
import urls from "../../utils/urls";

export const getApprovedPosts = () =>
  authedPostRequest(
    urls.baseUrl + urls.api.post.getApprovedPosts(),
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

export const getPendingPosts = (currentUser) =>
  authedPostRequest(
    urls.baseUrl + urls.api.post.getPendingPosts(),
    currentUser,
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

export const createPost = (cookies, {createdTime, postContent}) =>
  authedPostRequest(
    urls.baseUrl + urls.api.post.createPost(),
    {
      createdTime,
      postContent,
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

export const deletePost = (cookies, id) =>
  authedPostRequest(
    urls.baseUrl + urls.api.post.deletePost(),
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

export const approvePost = (cookies, id) =>
    authedPostRequest(
      urls.baseUrl + urls.api.post.approvePost(),
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
