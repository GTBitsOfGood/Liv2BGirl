import mongoDB from "../index";
import Group from "../models/Group";
import User from "../models/User";

export const followGroup = async (groupId, userId) => {
  if (groupId == null || userId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, { $push: { groups: groupId } });
}

export const unfollowGroup = async (groupId, userId) => {
  if (groupId == null || userId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, { $pull: { groups: groupId } });
}

export const createGroup = async (
  currentUser,
  name,
  description,
  category,
  admin
) => {
  if (name == null || description == null || category == null || admin == null) {
    throw new Error("All parameters must be provided!");
  }

  if (currentUser == null) {
    throw new Error("You must be logged in to create a group!");
  }

  await mongoDB();

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

export const deleteGroup = async (groupId) => {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

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

export const getGroup = async (groupId) => {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Group.findById(groupId).then(async group => {
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
}

export const searchGroups = async (groupId) => {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Group.findById(groupId).then(async group => {
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
}
