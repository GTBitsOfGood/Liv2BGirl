import mongoDB from "../index";

import Thread from "../models/Thread";
import Comments from "../models/Comment";

export async function createThread(currentUser, groupId, title, content) {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a thread!");
  }

  if (groupId == null || title == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.create({
    posterId: currentUser._id,
    groupId,
    title,
    content,
  });
}

export async function deleteThread(currentUser, threadId) {
  if (currentUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {
    _id: threadId,
  };

  if (currentUser.role === "User") {
    query.posterId = currentUser._id;
  }

  return Thread.findOneAndDelete(query).then(async deletedThread => {
    if (deletedThread == null) {
      throw new Error(
        "No thread matches the provided id or user does not have permission!"
      );
    }

    return deletedThread;
  });
}

export async function getGroupThreads(currentUser, groupId) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find({ groupId })
    .sort({
      postedAt: -1, // newest at top
    })
    .then(threads => {
      if (threads == null) {
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

export async function getThread(currentUser, threadId) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  return Thread.findById(threadId)
    .then(thread => {
      if (thread == null) {
        throw new Error("Thread does not exist!");
      }

      return thread;
    })
    .catch(() => {
      throw new Error("Invalid link or thread does not exist!");
    });
}

// Currently just filtering by date, expects dates in format 'YYYY-MM-DD' or null
export async function filterThreads(
  currentUser,
  groupId,
  lowerBound = new Date("0001-01-01"),
  upperBound = new Date()
) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Thread.find({
    groupId,
    postedAt: { $gte: new Date(lowerBound), $lte: new Date(upperBound) },
  }).then(threads => {
    if (threads == null) {
      throw new Error("Request failed");
    }

    return threads;
  });
}

export async function searchThreads(currentUser, terms, groupId) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (terms == null || groupId == null) {
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
      if (threads == null) {
        throw new Error("Request failed");
      }

      return threads;
    });
}
