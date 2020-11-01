import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const FilterHelper = require("bad-words");
import mongoDB from "../index";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";
import { useCode } from "./InvitationCode";

export const getApprovedPosts = async () => {
    await mongoDB();
    var approvedPosts = await Post.find({approved: true}); 
    return approvedPosts; 
};

export const getPendingPosts = async (currentUser) => {
    if (currentUser == null) {
        throw new Error("Are you a ghost?");
    } else if (currentUser.role != "Admin") {
        throw new Error("You must be an admin to approve posts!");
    }
    await mongoDB();
    var pendingPosts = await Post.find({approved: false});
    return pendingPosts
} 

export const approvePost = async (currentUser, id) => {
    if (currentUser == null || id == null) {
        throw new Error("All parameters must be provided!");
    } else if (currentUser.role != "Admin") {
        throw new Error("You must be an admin to approve posts!");
    }
    await mongoDB();

    return Post.findOneAndUpdate({_id: id}, {approved: true})
    .exec()
    .then(async (reportedThread) => {
      if (reportedThread == null) {
        throw new Error(
          "No thread matches the provided id or user does not have permission!"
        );
      }
    });
    
}

export const createPost = async (currentUser, {createdTime, postContent}
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a group!");
  } else if (content == null) {
    throw new Error("Content is null!");
  }

  var approvedFlag = false; 

  if (currentUser.role == 'Admin') approved = true; 

  await mongoDB();

  const post = new Post({
    createdBy: currentUser._id,
    createdAt: createdTime,
    approved: approvedFlag,  
    content: postContent,
  }); 

  // return Post.create({
  //   createdBy: currentUser._id,
  //   createdAt: createdTime,
  //   approved: approvedFlag,  
  //   content: postContent,
  // }).then(async (Post) => {
  //   return Post;
  // });

  return post
    .validate()
    .then(() => post.save()); 
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