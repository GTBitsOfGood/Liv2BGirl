import mongoDB from "../index";
import Comment from "../models/Comment";
import Thread from "../models/Thread";
import User from "../models/User";

export async function createComment(
  poster,
  parentId,
  content,
  officialAnswer = false,
  postedAt = Date.now()
) {
  await mongoDB();

  return User.findById(poster).then(user => {
    console.log(user);
    if (!user) {
      return Promise.reject(new Error("Invalid User ID for poster"));
    }
    return Thread.findById(parentId).then(thread => {
      if (!thread) {
        return Promise.reject(new Error("Invalid Thread ID"));
      }

      return Comment.create({
        poster,
        parentId,
        content,
        officialAnswer,
        postedAt,
      });
    });
  });
}

export async function deleteComment(commentId) {
  await mongoDB();

  return Comment.findOneAndDelete({ _id: commentId }).then(deletedComment => {
    if (deletedComment) {
      console.log("Successfully deleted comment");
    } else {
      return Promise.reject(new Error("No comment matches the provided id"));
    }
    return deletedComment;
  });
}

export async function getCommentsByThread(threadId) {
  await mongoDB();

  return Thread.findById(threadId)
    .then(thread => {
      if (!thread) {
        return Promise.reject(new Error("Invalid Thread ID"));
      }
      return Comment.find({ parentId: threadId }).then(comments => {
        if (!comments) {
          return Promise.reject(new Error("Error retrieving comments"));
        }
        return comments;
      });
    })
    .catch(() => Promise.reject(new Error("Invalid Thread ID")));
}
