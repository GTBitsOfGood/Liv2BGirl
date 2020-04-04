import mongoDB from "../index";
import Thread from "../models/Thread";

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

// Currently just filtering by date, expects dates in format 'YYYY-MM-DD' or null
export async function filterThreads(groupId, option, lowerBound, upperBound) {
  await mongoDB();
  if (lowerBound == null || lowerBound == 'undefined') {
    lowerBound = new Date("0001-01-01");
  }
  if (upperBound == null || upperBound == 'undefined') {
    upperBound = new Date();
  }
  return Thread.find({
    group: groupId,
    postedAt: { $gte: new Date(lowerBound), $lte: new Date(upperBound) }
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
