import mongoDB from "../index";
import Comment from "../models/Comment";
import User from "../models/User";
import Thread from "../models/Thread";

export async function createComment(
  poster,
  parentId,
  content,
  officialAnswer = false,
  postedAt = Date.now()
) {
  await mongoDB();

  return User.findById(poster).then(user => {
    console.log(user);
    if (!user) {
      return Promise.reject(new Error("Invalid User ID for poster"));
    }
    return Thread.findById(parentId).then(thread => {
      if (!thread) {
        return Promise.reject(new Error("Invalid Thread ID"));
      }

      return Comment.create({
        poster,
        parentId,
        content,
        officialAnswer,
        postedAt,
      });
    });
  });
}
