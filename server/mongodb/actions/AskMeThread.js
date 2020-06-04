import mongoDB from "../index";

import AskMeThread from "../models/AskMeThread";
import Comments from "../models/Comment";
import User from "../models/User";

export async function createThread(posterId, title, content, visibility) {
  if (posterId == null) {
    throw new Error("You must be logged in to create a thread!");
  }

  if (title == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return AskMeThread.create({
    posterId,
    title,
    content,
    visibility,
  });
}

export async function deleteThread(currentUser, threadId) {
  if (currentUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: threadId };
  if (currentUser.role === "User") {
    query.posterId = currentUser._id;
  }

  return AskMeThread.findOneAndDelete(query).then(deletedThread => {
    if (!deletedThread) {
      return Promise.reject(new Error("No comment matches the provided id"));
    }

    return deletedThread;
  });
}

export async function getUserQuestions(posterId) {
  if (posterId == null) {
    throw new Error("A user must be provided!");
  }

  await mongoDB();

  return AskMeThread.find({ posterId })
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

export async function getThreads(curUser) {
  await mongoDB();

  const query = {};
  if (curUser.role === "User") {
    query.visibility = { $ne: "Ambassador" };
  }

  return AskMeThread.find(query)
    .sort({
      postedAt: -1,
    })
    .then(threads => {
      if (!threads) {
        throw new Error("Request failed");
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

export async function getThread(curUser, threadId) {
  if (curUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {
    _id: threadId,
  };
  if (curUser.role === "User") {
    query.visibility = { $ne: "Ambassador" };
  }

  return AskMeThread.findOne(query).then(thread => {
    if (thread == null) {
      throw new Error(
        "Thread does not exist or user does not have permission!"
      );
    }

    return thread;
  });
}

// Currently just filtering by date, expects dates in format 'YYYY-MM-DD' or null
export async function filterThreads(
  lowerBound = new Date("0001-01-01"),
  upperBound = new Date()
) {
  await mongoDB();

  return AskMeThread.find({
    postedAt: { $gte: new Date(lowerBound), $lte: new Date(upperBound) },
  })
    .sort({
      postedAt: -1,
    })
    .then(threads => {
      if (!threads) {
        return Promise.reject(new Error("Request failed"));
      }

      return threads;
    });
}

export async function searchThreads(terms) {
  if (terms == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return AskMeThread.find(
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
