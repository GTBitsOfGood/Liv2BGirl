import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import Router from "next/router";
import mongoDB from "../index";
import Group from "../models/Group";

export async function createGroup(
  name,
  subscribers = [],
  description = ""
) {
  await mongoDB();

  return Group.create({
        name,
        description,
        subscribers,
      })
}

export async function deleteGroup(
  id
) {
  await mongoDB();

  return Group.findOneAndDelete({ _id : id })
    .then(deletedGroup => {
      if(deletedGroup) {
        console.log(`Successfully deleted group`)
      } else {
        console.log("No group matches the provided id.")
      }
      return deletedGroup
    })
    .catch(err => console.error(`Failed to find and delete group: ${err}`))
}

export async function followGroup(groupId, userId) {
  await mongoDB();

  await Group.findByIdAndUpdate(groupId, { $push: { subscribers: userId } });
}

export async function unfollowGroup(groupId, userId) {
  await mongoDB();

  await Group.findByIdAndUpdate(groupId, { $pull: { subscribers: userId } });
}