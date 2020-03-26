import mongoDB from "../index";
import Thread from "../models/Thread";

export async function deleteThread(threadId) {
  await mongoDB();

  return Thread.findOneAndDelete({ _id: threadId }).then(deletedThread => {
    if (deletedThread) {
      console.log("Successfully deleted group");
    } else {
      return Promise.reject(new Error("No comment matches the provided id"));
    }
    return deletedThread;
  });
}
