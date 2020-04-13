import mongoDB from "../index";

import Thread from "../models/Thread";
import Comments from "../models/Comment";

export async function createThread(posterId, groupId, title, content) {
  await mongoDB();

  if (posterId == null) {
    throw new Error("You must be logged in to create a thread!");
  }

  return Thread.create({
    posterId,
    groupId,
    title,
    content,
  });
}

export async function deleteThread(threadId) {
  await mongoDB();

  return Thread.findOneAndDelete({ _id: threadId }).then(deletedThread => {
    if (deletedThread) {
      console.log("Successfully deleted thread");
    } else {
      return Promise.reject(new Error("No comment matches the provided id"));
    }

    return deletedThread;
  });
}

export async function getGroupThreads(groupId) {
  await mongoDB();

  return Thread.find({ groupId }).then(threads => {
    if (threads) {
      if (threads.length) {
        console.log("Successfully filtered threads");
      } else {
        console.log("No threads in this group");
      }
    } else {
      return Promise.reject(new Error("Request failed"));
    }

    return Promise.all(
      threads.map(async thread => ({
        ...thread.toObject(),
        numComments: await Comments.find({ parentId: thread._id }).count(),
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
  await mongoDB();

  return Thread.find({
    groupId,
    postedAt: { $gte: new Date(lowerBound), $lte: new Date(upperBound) },
  }).then(threads => {
    if (threads) {
      if (threads.length) {
        console.log("Successfully filtered threads");
      } else {
        console.log("No threads match filtering criteria");
      }
    } else {
      return Promise.reject(new Error("Request failed"));
    }

    return threads;
  });
}

export async function searchThreads(terms, groupId) {
  await mongoDB();

  const options = {};

  if (groupId != null) {
    options.groupId = groupId;
  }

  return Thread.find(
    {
      ...options,
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
      if (threads) {
        if (threads.length) {
          console.log("Successfully searched for threads");
        } else {
          console.log("No threads match search criteria");
        }
      } else {
        return Promise.reject(new Error("Request failed"));
      }

      return threads;
    });
}
