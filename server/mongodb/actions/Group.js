import mongoDB from "../index";
import Group from "../models/Group";
import User from "../models/User";
import { followGroup } from "./User";

export const createGroup = async (
  currentUser,
  { name, description, category }
) => {
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
  }).then(async (group) => {
    await followGroup(currentUser, {
      groupId: group._id,
    });

    return group;
  });
};

export const deleteGroup = async (currentUser, { id }) => {
  if (currentUser == null || id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  const query = { _id: id };
  if (currentUser.role === "User") {
    query.moderator = currentUser._id;
  }

  return Group.findOneAndDelete({ _id: id }).then(async (deletedGroup) => {
    if (deletedGroup == null) {
      throw new Error(
        "No group matches the provided id or user does not have permission!"
      );
    }

    return deletedGroup;
  });
};

export const getGroup = async (currentUser, { id }) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to view this content!");
  } else if (id == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return Group.findById(id)
    .populate({
      path: "category",
      model: "GroupCategory",
      select: "_id name iconUrl parent",
    })
    .exec()
    .then(async (group) => {
      if (group == null) {
        throw new Error("Group does not exist!");
      }

      const people = await User.find({
        groups: id,
      }).countDocuments();

      return {
        ...group.toObject(),
        people,
      };
    });
};

export const searchGroups = async (currentUser, { term, category }) => {
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
    .then((groups) =>
      Promise.all(
        groups.map(async (group) => {
          const people = await User.find({
            groups: group._id,
          }).countDocuments();

          return {
            ...group.toObject(),
            people,
          };
        })
      )
    );
};
