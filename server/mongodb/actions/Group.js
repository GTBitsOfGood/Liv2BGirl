import mongoDB from "../index";
import Group from "../models/Group";

export async function createGroup(name, description, tags, admin, subscribers) {
  await mongoDB();

  return Group.create({
    name,
    description,
    tags,
    admin,
    subscribers,
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

  return Group.findByIdAndUpdate(groupId, { $push: { subscribers: userId } });
}

export async function unfollowGroup(groupId, userId) {
  await mongoDB();

  return Group.findByIdAndUpdate(groupId, { $pull: { subscribers: userId } });
}

export const getGroup = groupId =>
  Group.findById(groupId).then(group => {
    if (group == null) {
      throw new Error("Group does not exist!");
    }

    return {
      id: group._id,
      name: group.name,
      description: group.description,
      admin: group.admin,
      subscribers: group.subscribers,
      image: group.image,
    };
  });
