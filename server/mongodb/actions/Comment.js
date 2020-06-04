import mongoDB from "../index";
import Comment from "../models/Comment";

export async function createComment(
  currentUser,
  parent,
  content,
  postedAt = Date.now()
) {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a comment!");
  }

  await mongoDB();

  return Comment.create({
    author: currentUser._id,
    parent,
    content,
    postedAt,
  });
}

export async function deleteComment(currentUser, commentId) {
  if (currentUser == null || commentId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: commentId };
  if (currentUser.role === "User") {
    query.author = currentUser._id;
  }

  return Comment.findOneAndDelete(query).then(deletedComment => {
    if (deletedComment == null) {
      throw new Error(
        "No comment matches the provided id or user does not have permission!"
      );
    }

    return deletedComment;
  });
}

export async function getCommentsByAskMeThread(currentUser, threadId) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Comment.find({ parent: threadId })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      officialAnswer: -1, // official answers come first
      postedAt: 1, // newest at bottom
    })
    .then(async comments => {
      if (comments == null) {
        throw new Error("Error retrieving comments");
      }

      return comments;
    });
}

export async function getCommentsByThread(currentUser, threadId) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Comment.find({ parent: threadId })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      officialAnswer: -1, // official answers come first
      postedAt: 1, // newest at bottom
    })
    .then(async comments => {
      if (comments == null) {
        throw new Error("Error retrieving comments");
      }

      return comments;
    });
}
