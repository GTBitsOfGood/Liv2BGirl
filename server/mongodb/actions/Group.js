import mongoDB from "../index";
import Group from "../models/Group";
import GroupCategory from "../models/GroupCategory";
import User from "../models/User";

export const followGroup = async (currentUser, groupId) => {
  if (currentUser == null || groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $push: { groups: groupId },
  });
};

export const unfollowGroup = async (currentUser, groupId) => {
  if (currentUser == null || groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $pull: { groups: groupId },
  });
};

export const createGroup = async (currentUser, name, description, category) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a group!");
  } else if (name == null || description == null || category == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Group.create({
    name,
    description,
    category,
    moderator: currentUser._id,
  }).then(async group => {
    await followGroup(currentUser, group._id);

    return group;
  });
};

export const deleteGroup = async (currentUser, groupId) => {
  if (currentUser == null || groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: groupId };
  if (currentUser.role === "User") {
    query.moderator = currentUser._id;
  }

  return Group.findOneAndDelete({ _id: groupId }).then(async deletedGroup => {
    if (deletedGroup == null) {
      throw new Error(
        "No group matches the provided id or user does not have permission!"
      );
    }

    return deletedGroup;
  });
};

export const getGroup = async (currentUser, groupId) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (groupId == null) {
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
      ...group,
      category,
      people,
    };
  });
};

export async function searchGroups(currentUser, { term, category }) {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (term == null && category == null) {
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
            ...group,
            people,
          };
        })
      )
    );
}
