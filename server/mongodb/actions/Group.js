import mongoDB from "../index";
import Group from "../models/Group";

export async function createGroup(name, description = "", tags = []) {
  await mongoDB();

  return Group.create({
    name,
    description,
    tags,
  });
}

export async function deleteGroup(groupId) {
  await mongoDB();

  return Group.findOneAndDelete({ _id: groupId }).then(deletedGroup => {
    if (deletedGroup) {
      console.log("Successfully deleted group");
    } else {
      return Promise.reject(new Error("No group matches the provided id"));
    }
    return deletedGroup;
  });
}

export async function followGroup(groupId, userId) {
  await mongoDB();

  await Group.findByIdAndUpdate(groupId, { $push: { subscribers: userId } });
}

export async function unfollowGroup(groupId, userId) {
  await mongoDB();

  await Group.findByIdAndUpdate(groupId, { $pull: { subscribers: userId } });
}
