import mongoDB from "../index";
import Group from "../models/Group";
import GroupCategory from "../models/GroupCategory";
import User from "../models/User";

export const followGroup = async (groupId, userId) => {
  if (groupId == null || userId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, { $push: { groups: groupId } });
};

export const unfollowGroup = async (groupId, userId) => {
  if (groupId == null || userId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, { $pull: { groups: groupId } });
};

export const createGroup = async (
  currentUser,
  name,
  description,
  category,
  admin
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a group!");
  }

  if (
    name == null ||
    description == null ||
    category == null ||
    admin == null
  ) {
    throw new Error("All parameters must be provided!");
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
};

export const deleteGroup = async groupId => {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Group.findOneAndDelete({ _id: groupId }).then(async deletedGroup => {
    if (!deletedGroup) {
      return Promise.reject(new Error("No group matches the provided id"));
    }

    return deletedGroup;
  });
};

export const getGroup = async groupId => {
  if (groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Group.findById(groupId).then(async group => {
    if (group == null) {
      throw new Error("Group does not exist!");
    }

    const people = await User.find({
      groups: groupId,
    }).countDocuments();
    const category = await GroupCategory.findById(group.category);

    return {
      _id: group._id,
      name: group.name,
      description: group.description,
      admin: group.admin,
      subscribers: group.subscribers,
      image: group.image,
      category,
      people,
    };
  });
};

export async function searchGroups({ term, category }) {
  if (term == null && category == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = {};
  const projection = {};
  const sort = {};

  if (term != null && term.length > 0) {
    query.$text = { $search: term };
    projection.score = { $meta: "textScore" };
    sort.score = { $meta: "textScore" };
  }

  if (category != null) {
    query.category = category;
    sort.name = 1;
  }

  return Group.find(query, projection)
    .sort(sort)
    .then(groups =>
      Promise.all(
        groups.map(async group => {
          const people = await User.find({
            groups: group._id,
          }).countDocuments();

          return {
            _id: group._id,
            name: group.name,
            description: group.description,
            admin: group.admin,
            subscribers: group.subscribers,
            image: group.image,
            people,
          };
        })
      )
    );
}
