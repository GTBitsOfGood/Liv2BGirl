const FilterHelper = require("bad-words");
import mongoDB from "../index";
import AskMeThread from "../models/AskMeThread";
import Comments from "../models/Comment";

const wordFilter = new FilterHelper();

export const createThread = async (
  currentUser,
  { title, content, visibility }
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a thread!");
  } else if (title == null) {
    throw new Error("All parameters must be provided!");
  } else if (wordFilter.isProfane(content)) {
    throw new Error("Please remove bad language from your content!");
  }

  await mongoDB();

  return AskMeThread.create({
    author: currentUser._id,
    title,
    content,
    visibility,
  });
};

export const reportThread = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  query.author = currentUser.id;
  await AskMeThread.handleReport(query);

  return AskMeThread.find(query)
    .exec()
    .then(async (reportedThread) => {
      if (reportedThread == null) {
        throw new Error(
          "No thread matches the provided id or user does not have permission!"
        );
      }
    });
};

export const unreportThread = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  //const query = { _id: id };
  //query.author = currentUser.id;

  return AskMeThread.findOneAndUpdate({_id: id}, {reported: false})
    .exec()
    .then(async (reportedThread) => {
      if (reportedThread == null) {
        throw new Error(
          "No thread matches the provided id or user does not have permission!"
        );
      }
    });
};

// export const unreportAskMeThread = async (currentUser, { id }) => {
//   if (currentUser == null || id == null) {
//     throw new Error("All parameters must be provided!");
//   } else if (["User", "Ambassador"].includes(currentUser.role)) {
//     throw new Error("Cannot ");
//   }

//   await mongoDB();

//   const query = { _id: id };
//   query.author = currentUser.id;

//   return AskMeThread.findOneAndUpdate(query, { reported: false })
//     .exec()
//     .then(async (reportedThread) => {
//       if (reportedThread == null) {
//         throw new Error(
//           "No thread matches the provided id or user does not have permission!"
//         );
//       }
//     });
// };

export const deleteThread = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (currentUser.role === "User") {
    query.author = currentUser._id;
  }

  return AskMeThread.findOneAndDelete(query).then((deletedThread) => {
    if (deletedThread == null) {
      throw new Error(
        "No thread matches the provided id or user does not have permission!"
      );
    }

    return deletedThread;
  });
};

export const editThread = async (currentUser, { id, title }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }
  const filter = {
    _id: id,
  };

  const query = {
    title: title,
  };

  return AskMeThread.findOneAndUpdate(filter, query);
};

export const getUserQuestions = async (currentUser) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  return AskMeThread.find({ author: currentUser._id })
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      postedAt: -1,
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

export const getThreads = async (currentUser) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  let query = {};
  if (currentUser.role === "User") {
    query = {
      ...query,
      $or: [
        {
          author: currentUser._id,
        },
        {
          visibility: {
            $ne: "Ambassador",
          },
        },
      ],
    };
  }

  return AskMeThread.find(query)
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      postedAt: -1,
    })
    .then((threads) => {
      if (threads == null) {
        throw new Error("Request failed");
      }

      return Promise.all(
        threads.map(async (thread) => ({
          ...thread.toObject(),
          ...(thread.visibility === "Anonymous" && currentUser.role === "User"
            ? {
                author: {
                  userId: null,
                  username: "Anonymous",
                  avatar: 1,
                  avatarColor: 1,
                },
              }
            : {}),
          numComments: await Comments.find({
            parent: thread._id,
          }).countDocuments(),
        }))
      );
    });
};

export const getReportedThreads = async (currentUser) => {
  if (currentUser == null || currentUser.role != "Admin") {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  let query = { reported: true };

  return AskMeThread.find(query);
};

export const getThread = async (currentUser, { id }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  let query = {
    _id: id,
  };
  if (currentUser.role === "User") {
    query = {
      ...query,
      $or: [
        {
          author: currentUser._id,
        },
        {
          visibility: {
            $ne: "Ambassador",
          },
        },
      ],
    };
  }

  return AskMeThread.findOne(query)
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .then((thread) => {
      if (thread == null) {
        throw new Error(
          "Thread does not exist or user does not have permission!"
        );
      }

      return {
        ...thread.toObject(),
        ...(thread.visibility === "Anonymous" && currentUser.role === "User"
          ? {
              author: {
                userId: null,
                username: "Anonymous",
                avatar: 1,
                avatarColor: 1,
              },
            }
          : {}),
      };
    })
    .catch(() => {
      throw new Error("Invalid link or thread does not exist!");
    });
};

// Currently just filtering by date, expects dates in format 'YYYY-MM-DD' or null
export const filterThreads = async (
  currentUser,
  { lowerBound = new Date("0001-01-01"), upperBound = new Date() }
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  }

  await mongoDB();

  let query = {
    postedAt: {
      $gte: new Date(lowerBound),
      $lte: new Date(upperBound),
    },
  };
  if (currentUser.role === "User") {
    query = {
      ...query,
      $or: [
        {
          author: currentUser._id,
        },
        {
          visibility: {
            $ne: "Ambassador",
          },
        },
      ],
    };
  }

  return AskMeThread.find(query)
    .populate({
      path: "author",
      model: "User",
      select: "_id username avatar avatarColor",
    })
    .sort({
      postedAt: -1,
    })
    .then((threads) => {
      if (threads == null) {
        throw new Error("Request failed");
      }

      return Promise.all(
        threads.map(async (thread) => ({
          ...thread.toObject(),
          ...(thread.visibility === "Anonymous" && currentUser.role === "User"
            ? {
                author: {
                  userId: null,
                  username: "Anonymous",
                  avatar: 1,
                  avatarColor: 1,
                },
              }
            : {}),
          numComments: await Comments.find({
            parent: thread._id,
          }).countDocuments(),
        }))
      );
    });
};

export const searchThreads = async (currentUser, { term }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (term == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  let query = {
    $text: { $search: term },
  };
  if (currentUser.role === "User") {
    query = {
      ...query,
      $or: [
        {
          author: currentUser._id,
        },
        {
          visibility: {
            $ne: "Ambassador",
          },
        },
      ],
    };
  }

  return AskMeThread.find(query, {
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

      return Promise.all(
        threads.map(async (thread) => ({
          ...thread.toObject(),
          ...(thread.visibility === "Anonymous" && currentUser.role === "User"
            ? {
                author: {
                  userId: null,
                  username: "Anonymous",
                  avatar: 1,
                  avatarColor: 1,
                },
              }
            : {}),
          numComments: await Comments.find({
            parent: thread._id,
          }).countDocuments(),
        }))
      );
    });
};
