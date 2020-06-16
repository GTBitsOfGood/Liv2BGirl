import mongoDB from "../index";
import InvitationCode from "../models/InvitationCode";

export const createCode = async (currentUser) => {
  if (currentUser == null) {
    throw new Error("You must be logged in to create a invitation code!");
  } else if (currentUser.role !== "Admin") {
    throw new Error("Only admins can create an invitation code!");
  }

  await mongoDB();

  return InvitationCode.create({
    createdBy: currentUser._id,
  });
};

export const verifyCodeUnused = async ({ code }) => {
  if (code == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return InvitationCode.findOne({ _id: code }).then((invCode) => {
    if (invCode == null) {
      throw new Error("Invalid invitation code!");
    }

    return invCode.usedAt == null;
  });
};

export const useCode = async ({ code, usedBy }) => {
  if (code == null || usedBy == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return InvitationCode.findOneAndUpdate(
    {
      _id: code,
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
    .then((newCode) => newCode.toObject())
    .catch(() => {
      throw new Error("Invitation Code is invalid or has already been used!");
    });
};
