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

export async function filterThreads(groupId, option, lowerBound, upperBound) {
  await mongoDB();

  return Thread.find({
    group: groupId,
    postedAt: { $gt: lowerBound, $lt: upperBound },
  }).then(threads => {
    if (threads) {
      console.log("Successfully filtered threads");
    } else {
      return Promise.reject(new Error("No threads match filtering criteria"));
    }
    return threads;
  });
}
