const FilterHelper = require("bad-words");
import mongoDB from "../index";
import Thread from "../models/GroupThread";
import Comments from "../models/Comment";

const wordFilter = new FilterHelper();

export const createThread = async (
  currentUser,
  { groupId, title, content }
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a thread!");
  } else if (groupId == null || title == null) {
    throw new Error("All parameters must be provided!");
  } else if (wordFilter.isProfane(content)) {
    throw new Error("Please remove bad language from your content!");
  }

  await mongoDB();

  return Thread.create({
    author: currentUser._id,
    group: groupId,
    title,
    content,
  });
};

export const reportThread = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  query.author = currentUser.id;

  return GroupThread.findOneAndReport(query)
    .exec()
    .then(async (reportedThread) => {
      if (reportedThread == null) {
        throw new Error(
          "No thread matches the provided id or user does not have permission!"
        );
      }
    });
};

export const deleteThread = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (currentUser.role === "User") {
    query.author = currentUser._id;
  }

  return Thread.findOneAndDelete(query)
    .exec()
    .then(async (deletedThread) => {
      if (deletedThread == null) {
        throw new Error(
          "No thread matches the provided id or user does not have permission!"
        );
      }

      return deletedThread;
    });
};

export const getGroupThreads = async (currentUser, { groupId }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find({ group: groupId })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      postedAt: -1, // newest at top
    })
    .then((threads) => {
      if (threads == null) {
        throw new Error("Request failed");
      }

      return Promise.all(
        threads.map(async (thread) => ({
          ...thread.toObject(),
          numComments: await Comments.find({
            parent: thread._id,
          }).countDocuments(),
        }))
      );
    });
};

export const getThread = async (currentUser, { id }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  return Thread.findById(id)
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .then((thread) => {
      if (thread == null) {
        throw new Error("Thread does not exist!");
      }

      return thread;
    })
    .catch(() => {
      throw new Error("Invalid link or thread does not exist!");
    });
};

// Currently just filtering by date, expects dates in format 'YYYY-MM-DD' or null
export const filterThreads = async (
  currentUser,
  groupId,
  { lowerBound = new Date("0001-01-01"), upperBound = new Date() }
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find({
    group: groupId,
    postedAt: { $gte: new Date(lowerBound), $lte: new Date(upperBound) },
  })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .then((threads) => {
      if (threads == null) {
        throw new Error("Request failed");
      }

      return threads;
    });
};

export const searchThreads = async (currentUser, { term, groupId }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (term == null && groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {
    $text: { $search: term },
  };
  if (groupId != null) {
    query.group = groupId;
  }

  return Thread.find(query, {
    score: { $meta: "textScore" },
  })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      score: { $meta: "textScore" },
    })
    .then((threads) => {
      if (threads == null) {
        throw new Error("Request failed");
      }

      return threads;
    });
};
