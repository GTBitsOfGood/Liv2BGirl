import { v4 as uuidv4 } from "uuid";
import mongoDB from "../index";
import InvitationCode from "../models/InvitationCode";

export async function createCode(currentUser) {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a invitation code!");
  } else if (currentUser.role !== "Admin") {
    throw new Error("Only admins can create an invitation code!");
  }

  // Use uuid v4 for codes that are not repeated
  const code = uuidv4().replace(/-/g, "");

  await mongoDB();

  return InvitationCode.create({
    code,
    createdBy: currentUser._id,
  }).catch(() => {
    throw new Error("Incorrect user supplied for creation!");
  });
}

export async function verifyCodeUnused(code) {
  if (code == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return InvitationCode.findOne({ code })
    .exec()
    .then(invCode => {
      if (invCode == null) {
        throw new Error("Invalid invitation code!");
      }

      return invCode.usedAt == null;
    });
}

export async function useCode(code, usedBy) {
  if (code == null || usedBy == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return InvitationCode.findOneAndUpdate(
    {
      code,
      usedAt: null,
    },
    {
      usedBy,
      usedAt: new Date(),
    },
    {
      new: true,
    }
  )
    .then(newCode => newCode.toObject())
    .catch(() => {
      throw new Error("Invitation Code is invalid or has already been used!");
    });
}
