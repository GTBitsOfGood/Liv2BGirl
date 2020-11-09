import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const FilterHelper = require("bad-words");
import mongoDB from "../index";
import User from "../models/User";
import Post from "../models/Post";

export const getApprovedPosts = async () => {
  await mongoDB();
  var approvedPosts = await Post.find({ approved: true });
  return approvedPosts;
};

export const approvePost = async (currentUser, { id }) => {
  if (id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  query.author = currentUser.id;

  await Post.update({ _id: id }, { approved: true });

  return Post.find(query)
    .exec()
    .then(async (approvedThread) => {
      if (approvedThread == null) {
        throw new Error(
          "No post matches the provided id or user does not have permission!"
        );
      }
    });
};

export const unapprovePost = async (currentUser, { id }) => {
  if (id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  query.author = currentUser.id;

  await Post.update({ _id: id }, { approved: false });

  return Post.find(query)
    .exec()
    .then(async (unapprovedThread) => {
      if (unapprovedThread == null) {
        throw new Error(
          "No post matches the provided id or user does not have permission!"
        );
      }
    });
};

export const createPost = async (currentUser, content) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a post!");
  } else if (content == null) {
    throw new Error("Content is null!");
  }

  console.log(content);
  var approvedFlag = false;

  if (currentUser.role == "Admin") {
    approvedFlag = true;
  }

  await mongoDB();

  // const post = new Post({
  //   createdBy: currentUser._id,
  //   createdAt: createdTime,
  //   approved: approvedFlag,
  //   content: postContent,
  // });

  return Post.create({
    createdBy: currentUser._id,
    approved: approvedFlag,
    content: content.content,
  }).then(async (Post) => {
    return Post;
  });

  // return post.validate().then(() => post.save());
};

export const deletePost = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (currentUser.role === "User") {
    query.createdBy = currentUser._id;
  }

  return Post.findOneAndDelete(query).then((deletedPost) => {
    if (deletedPost == null) {
      throw new Error(
        "No post matches the provided id or user does not have permission!"
      );
    }

    return deletedPost;
  });
};
