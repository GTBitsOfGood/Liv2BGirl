import mongoDB from "../index";
import GroupCategory from "../models/GroupCategory";

export const createCategory = async (
  currentUser,
  { name, iconUrl, parent }
) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a group category!");
  } else if (currentUser.role !== "Admin") {
    throw new Error("Only admins can create a group category!");
  } else if (name == null || iconUrl == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return GroupCategory.create({
    name,
    iconUrl,
    parent,
  });
};

export const getCategories = async () => {
  await mongoDB();

  return GroupCategory.find().sort({
    name: 1,
  });
};
