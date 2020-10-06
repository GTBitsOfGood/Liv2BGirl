const FilterHelper = require("bad-words");
import mongoDB from "../index";
import Comment from "../models/Comment";

const wordFilter = new FilterHelper();

export const createComment = async (
  currentUser,
  { parentId, content, taggedUsers }
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a comment!");
  } else if (wordFilter.isProfane(content)) {
    throw new Error("Please remove bad language from your content!");
  }

  await mongoDB();

  return Comment.create({
    author: currentUser._id,
    parent: parentId,
    content,
    taggedUsers,
  });
};

export const deleteComment = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (currentUser.role === "User") {
    query.author = currentUser._id;
  }

  return Comment.findOneAndDelete(query).then((deletedComment) => {
    if (deletedComment == null) {
      throw new Error(
        "No comment matches the provided id or user does not have permission!"
      );
    }

    return deletedComment;
  });
};

export const reportComment = async (CurrentUser, { id }) => {
  if (CurrentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (CurrentUser.role === "User") {
    query.author = CurrentUser._id;
  }

  return Comment.report(query).then((reportedComment) => {
    if (reportedComment == null) {
      throw new Error(
        "No comment matches the provided id or user does not have permission!"
      );
    }

    return reportedComment;
  });
};

export const getCommentsByAskMeThread = async (currentUser, { id }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Comment.find({ parent: id })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      postedAt: 1, // newest at bottom
    })
    .then(async (comments) => {
      if (comments == null) {
        throw new Error("Error retrieving comment");
      }

      return comments;
    });
};

export const getCommentsByThread = async (currentUser, { id }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Comment.find({ parent: id })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      postedAt: 1, // newest at bottom
    })
    .then(async (comments) => {
      if (comments == null) {
        throw new Error("Error retrieving comment");
      }

      return comments;
    });
};
