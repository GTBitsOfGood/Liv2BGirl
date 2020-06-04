import mongoDB from "../index";
import GroupCategory from "../models/GroupCategory";

export async function createCategory(name, iconUrl, parent) {
  if (name == null || iconUrl == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return GroupCategory.create({
    name,
    iconUrl,
    parent,
  });
}

export async function getCategories() {
  await mongoDB();

  return GroupCategory.find().sort({
    name: 1,
  });
}
