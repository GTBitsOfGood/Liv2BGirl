import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const FilterHelper = require("bad-words");
import mongoDB from "../index";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { useCode } from "./InvitationCode";

export const getApprovedPosts = async (req, res) => {
    await mongoDB();
    var approvedPosts = await Post.find({approved: True}); 
    return approvedPosts; 
};

export const createPost = async (currentUser, content
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a group!");
  } else if (content == null) {
    throw new Error("Content is null!");
  }

  await mongoDB();

  return Post.create({
    name,
    content,
  }).then(async (Post) => {
    return Post;
  });
};

export const deletePost = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (currentUser.role === "User") {
    query.moderator = currentUser._id;
  }

  return Post.findOneAndDelete({ _id: id }).then(async (deletedPost) => {
    if (deletedPost == null) {
      throw new Error(
        "No post matches the provided id or user does not have permission!"
      );
    }
    return deletedPost;
  });
};



