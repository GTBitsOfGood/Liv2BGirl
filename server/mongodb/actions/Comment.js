import mongoDB from "../index";
import Comment from "../models/Comment";
import AskMeThread from "../models/AskMeThread";
import Thread from "../models/Thread";
import User from "../models/User";
import { getUser } from "./User";

export async function createComment(
  poster,
  parentId,
  content,
  postedAt = Date.now()
) {
  if (poster == null) {
    throw new Error("You must be logged in to create a comment!");
  }

  await mongoDB();

  return User.findById(poster).then(user => {
    if (!user) {
      return Promise.reject(new Error("Invalid User ID for poster"));
    }

    return Comment.create({
      poster,
      parentId,
      content,
      postedAt,
    });
  });
}

export async function deleteComment(currentUser, commentId) {
  if (currentUser == null || commentId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {
    _id: commentId,
  };

  if (currentUser.role === "User") {
    query.poster = currentUser._id;
  }

  return Comment.findOneAndDelete(query).then(deletedComment => {
    if (!deletedComment) {
      return Promise.reject(
        new Error(
          "No comment matches the provided id or user does not have permission!"
        )
      );
    }

    return deletedComment;
  });
}

export async function getCommentsByAskMeThread(threadId) {
  if (threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return AskMeThread.findById(threadId)
    .then(thread => {
      if (!thread) {
        return Promise.reject(new Error("Invalid Thread ID"));
      }

      return Comment.find({ parentId: threadId })
        .sort({
          officialAnswer: -1, // official answers come first
          postedAt: 1, // newest at bottom
        })
        .then(async comments => {
          if (!comments) {
            return Promise.reject(new Error("Error retrieving comments"));
          }

          return Promise.all(
            comments.map(async comment => ({
              comment: comment.toObject(),
              author: await getUser(comment.poster).then(user => ({
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                avatarColor: user.avatarColor,
              })),
            }))
          );
        });
    })
    .catch(() => Promise.reject(new Error("Invalid Thread ID")));
}

export async function getCommentsByThread(threadId) {
  if (threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.findById(threadId)
    .then(thread => {
      if (!thread) {
        return Promise.reject(new Error("Invalid Thread ID"));
      }

      return Comment.find({ parentId: threadId })
        .sort({
          officialAnswer: -1, // official answers come first
          postedAt: 1, // newest at bottom
        })
        .then(async comments => {
          if (!comments) {
            return Promise.reject(new Error("Error retrieving comments"));
          }

          return Promise.all(
            comments.map(async comment => ({
              comment: comment.toObject(),
              author: await getUser(comment.poster).then(user => ({
                _id: user._id,
                username: user.username,
                avatar: user.avatar,
                avatarColor: user.avatarColor,
              })),
            }))
          );
        });
    })
    .catch(() => Promise.reject(new Error("Invalid Thread ID")));
}
