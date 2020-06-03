import mongoDB from "../index";

import Thread from "../models/Thread";
import Comments from "../models/Comment";

export async function createThread(posterId, groupId, title, content) {
  if (posterId == null) {
    throw new Error("You must be logged in to create a thread!");
  }

  if (groupId == null || title == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.create({
    posterId,
    groupId,
    title,
    content,
  });
}

export async function deleteThread(threadId) {
  if (threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.findOneAndDelete({ _id: threadId }).then(
    async deletedThread => {
      if (!deletedThread) {
        return Promise.reject(new Error("No comment matches the provided id"));
      }

      return deletedThread;
    }
  );
}

export async function getGroupThreads(groupId) {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find({ groupId })
    .sort({
      postedAt: -1,
    })
    .then(threads => {
      if (!threads) {
        return Promise.reject(new Error("Request failed"));
      }

      return Promise.all(
        threads.map(async thread => ({
          ...thread.toObject(),
          numComments: await Comments.find({
            parentId: thread._id,
          }).countDocuments(),
        }))
      );
    });
}

export async function getThread(threadId) {
  await mongoDB();

  return Thread.findById(threadId).then(thread => {
    if (thread == null) {
      throw new Error("Thread does not exist!");
    }

    return thread;
  });
}

// Currently just filtering by date, expects dates in format 'YYYY-MM-DD' or null
export async function filterThreads(
  groupId,
  lowerBound = new Date("0001-01-01"),
  upperBound = new Date()
) {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find({
    groupId,
    postedAt: { $gte: new Date(lowerBound), $lte: new Date(upperBound) },
  }).then(threads => {
    if (!threads) {
      return Promise.reject(new Error("Request failed"));
    }

    return threads;
  });
}

export async function searchThreads(terms, groupId) {
  if (terms == null || groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find(
    {
      $text: { $search: terms },
    },
    {
      score: { $meta: "textScore" },
    }
  )
    .sort({
      score: { $meta: "textScore" },
    })
    .then(threads => {
      if (!threads) {
        return Promise.reject(new Error("Request failed"));
      }

      return threads;
    });
}
