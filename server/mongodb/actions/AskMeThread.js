import mongoDB from "../index";
import AskMeThread from "../models/AskMeThread";
import Comments from "../models/Comment";

export async function createThread(currentUser, title, content, visibility) {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a thread!");
  } else if (title == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return AskMeThread.create({
    author: currentUser._id,
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
    query.author = currentUser._id;
  }

  return AskMeThread.findOneAndDelete(query).then(deletedThread => {
    if (deletedThread == null) {
      throw new Error("No thread matches the provided id!");
    }

    return deletedThread;
  });
}

export async function getUserQuestions(currentUser) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  return AskMeThread.find({ author: currentUser._id })
    .sort({
      postedAt: -1,
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

export async function getThreads(currentUser) {
  if (currentUser == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {};
  if (currentUser.role === "User") {
    query.visibility = { $ne: "Ambassador" };
  }

  return AskMeThread.find(query)
    .sort({
      postedAt: -1,
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
  } else if (threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {
    _id: threadId,
  };
  if (currentUser.role === "User") {
    query.visibility = { $ne: "Ambassador" };
  }

  return AskMeThread.findOne(query)
    .then(thread => {
      if (thread == null) {
        throw new Error(
          "Thread does not exist or user does not have permission!"
        );
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
  lowerBound = new Date("0001-01-01"),
  upperBound = new Date()
) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  const query = {
    postedAt: {
      $gte: new Date(lowerBound),
      $lte: new Date(upperBound),
    },
  };
  if (currentUser.role === "User") {
    query.visibility = { $ne: "Ambassador" };
  }

  return AskMeThread.find(query)
    .sort({
      postedAt: -1,
    })
    .then(threads => {
      if (threads == null) {
        throw new Error("Request failed");
      }

      return threads;
    });
}

export async function searchThreads(currentUser, terms) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (terms == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {
    $text: { $search: terms },
  };
  if (currentUser.role === "User") {
    query.visibility = { $ne: "Ambassador" };
  }

  return AskMeThread.find(query, {
    score: { $meta: "textScore" },
  })
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
