import mongoDB from "../index";
import Group from "../models/Group";
import User from "../models/User";

export async function followGroup(groupId, userId) {
  await mongoDB();

  return Group.findByIdAndUpdate(groupId, { $push: { subscribers: userId } });
}

export async function unfollowGroup(groupId, userId) {
  await mongoDB();

  return Group.findByIdAndUpdate(groupId, { $pull: { subscribers: userId } });
}

export async function createGroup(
  currentUser,
  name,
  description,
  category,
  admin
) {
  await mongoDB();

  if (currentUser == null) {
    throw new Error("You must be logged in to create a group!");
  }

  return Group.create({
    name,
    description,
    category,
    admin,
  }).then(async group => {
    const groupid = group._id;
    await followGroup(groupid, currentUser);

    return group;
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

export const getGroup = groupId =>
  Group.findById(groupId).then(async group => {
    if (group == null) {
      throw new Error("Group does not exist!");
    }

    const people = await User.find({ groups: groupId }).count();

    return {
      id: group._id,
      name: group.name,
      description: group.description,
      admin: group.admin,
      subscribers: group.subscribers,
      image: group.image,
      category: group.category,
      people,
    };
  });

export const searchGroups = groupId =>
  Group.findById(groupId).then(async group => {
    if (group == null) {
      throw new Error("Group does not exist!");
    }

    const people = await User.find({ groups: groupId }).count();

    return {
      id: group._id,
      name: group.name,
      description: group.description,
      admin: group.admin,
      subscribers: group.subscribers,
      image: group.image,
      category: group.category,
      people,
    };
  });
