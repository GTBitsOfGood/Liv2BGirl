import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const FilterHelper = require("bad-words");
import mongoDB from "../index";
import User from "../models/User";
import Comment from "../models/Comment";
import { useCode } from "./InvitationCode";

const wordFilter = new FilterHelper();

export const login = async ({ email, password }) => {
  if (email == null || password == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) return Promise.resolve(user);

          return Promise.reject(
            new Error("The password you entered is incorrect.")
          );
        });
      }

      return Promise.reject(new Error("The username does not exist."));
    })
    .then((user) =>
      jwt.sign(
        {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWTSECRET,
        {
          expiresIn: "7d",
        }
      )
    );
};

export const signUp = async (
  currentUser,
  {
    invCode,
    email,
    username,
    password,
    avatar = 1,
    avatarColor = 1,
    age = 13,
    grade = 7,
    role = "User",
    name = "",
    followers = [],
    following = [],
    interests = [],
    askBookmarks = [],
    groupBookmarks = [],
  }
) => {
  if (
    invCode == null ||
    email == null ||
    username == null ||
    password == null
  ) {
    throw new Error("All parameters must be provided!");
  } else if (
    role !== "User" &&
    (currentUser == null || currentUser.role !== "Admin")
  ) {
    throw new Error("Only admins can create non-user accounts!");
  }

  await mongoDB();

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = new User({
    email,
    username,
    password: hashedPassword,
    avatar,
    avatarColor,
    age,
    grade,
    role,
    name,
    interests,
    followers,
    following,
    askBookmarks,
    groupBookmarks,
  });

  return user
    .validate()
    .then(() => user.save())
    .then(() => useCode({ code: invCode, usedBy: user._id }))
    .then(() =>
      jwt.sign(
        {
          _id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWTSECRET,
        {
          expiresIn: "7d",
        }
      )
    );
};

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateUsernames = async ({
  description,
  thing,
  number,
  count,
}) => {
  if (description == null || thing == null || number == null || count == null) {
    throw new Error("All parameters must be provided!");
  }

  const usernames = new Set();

  while (usernames.size < count) {
    const descriptionStart = getRandom(0, 1);
    const descriptionLength = getRandom(2, description.length);
    const thingStart = getRandom(0, 1);
    const thingLength = getRandom(2, thing.length);
    const newUsername =
      description.substring(descriptionStart, descriptionLength) +
      thing.substring(thingStart, thingLength) +
      number +
      Math.floor(Math.random() * 10);

    if (
      !usernames.has(newUsername) &&
      !wordFilter.isProfane(newUsername) &&
      !(await User.exists({ username: newUsername }))
    ) {
      usernames.add(newUsername);
    }
  }

  return Array.from(usernames);
};

export const verifyEmailUnused = async ({ email }) => {
  if (email == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.exists({ email }).then((exists) => !exists);
};

export const signOut = (req, res) => {
  res.setHeader("Set-Cookie", "token=; Max-Age=0; SameSite=Lax; Path=/");
};

export const verifyToken = async (req, res) => {
  const token = req.cookies != null ? req.cookies.token : null;
  if (token == null) {
    throw new Error("User is not signed in!");
  }

  return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (decoded) {
      return decoded;
    }

    res.setHeader("Set-Cookie", "token=; Max-Age=0; SameSite=Lax; Path=/");
    throw new Error("Invalid token!");
  });
};

export const verifyTokenSecure = async (req, res) => {
  const token = req.cookies != null ? req.cookies.token : null;
  if (token == null) {
    return null;
  }

  await mongoDB();

  return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err || decoded == null) {
      res.setHeader("Set-Cookie", "token=; Max-Age=0; SameSite=Lax; Path=/");

      return null;
    }

    const { _id } = decoded;

    return User.findOne({ _id })
      .then((user) => {
        if (user == null) {
          res.setHeader(
            "Set-Cookie",
            "token=; Max-Age=0; SameSite=Lax; Path=/"
          );
          throw new Error("User does not exist!");
        }

        // eslint-disable-next-line no-unused-vars
        const { password, ...userInfo } = user.toObject();

        return userInfo;
      })
      .catch(() => {
        res.setHeader("Set-Cookie", "token=; Max-Age=0; SameSite=Lax; Path=/");

        return null;
      });
  });
};

export const followUser = async (currentUser, { toFollowId }) => {
  if (currentUser == null || toFollowId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  await User.findByIdAndUpdate(currentUser._id, {
    $push: { following: toFollowId },
  });
  await User.findByIdAndUpdate(toFollowId, {
    $push: { followers: currentUser._id },
  });
};

export const unfollowUser = async (currentUser, { toUnfollowId }) => {
  if (currentUser == null || toUnfollowId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  await User.findByIdAndUpdate(currentUser._id, {
    $pull: { following: toUnfollowId },
  });
  await User.findByIdAndUpdate(toUnfollowId, {
    $pull: { followers: currentUser._id },
  });
};

export const getUser = async (currentUser, { userId }) => {
  if (userId == null) {
    throw new Error("userId must be provided!");
  }

  await mongoDB();

  return User.findById(userId)
    .then((user) => {
      if (user == null) {
        throw new Error("User does not exist!");
      }

      // eslint-disable-next-line no-unused-vars
      const { password, ...rest } = user.toObject();

      return rest;
    })
    .catch(() => {
      throw new Error("Invalid link or thread does not exist!");
    });
};

export const getUserAskBookmarks = async (currentUser) => {
  if (currentUser == null) {
    throw new Error("User must be logged in!");
  }

  await mongoDB();

  return User.findById(currentUser._id)
    .populate({
      path: "askBookmarks",
      model: "AskMeThread",
      populate: {
        path: "author",
        model: "User",
        select: "_id username avatar avatarColor",
      },
    })
    .then((user) => {
      if (user == null) {
        throw new Error("User does not exist!");
      }

      return user.askBookmarks;
    })
    .then((bookmarks) =>
      Promise.all(
        bookmarks.map(async (bookmark) => ({
          ...bookmark.toObject(),
          numComments: await Comment.find({
            parent: bookmark._id,
          }).countDocuments(),
        }))
      )
    );
};

export const addAskBookmark = async (currentUser, { threadId }) => {
  if (currentUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $push: { askBookmarks: threadId },
  });
};

export const removeAskBookmark = async (currentUser, { threadId }) => {
  if (currentUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $pull: { askBookmarks: threadId },
  });
};

export const getUserGroupBookmarks = async (currentUser) => {
  if (currentUser == null) {
    throw new Error("User must be logged in!");
  }

  await mongoDB();

  return User.findById(currentUser._id)
    .populate({
      path: "groupBookmarks",
      model: "GroupThread",
      populate: {
        path: "author",
        model: "User",
        select: "_id username avatar avatarColor",
      },
    })
    .then((user) => {
      if (user == null) {
        throw new Error("User does not exist!");
      }

      return user.askBookmarks;
    })
    .then((bookmarks) =>
      Promise.all(
        bookmarks.map(async (bookmark) => ({
          ...bookmark.toObject(),
          numComments: await Comment.find({
            parent: bookmark._id,
          }).countDocuments(),
        }))
      )
    );
};

export const addGroupBookmark = async (currentUser, { threadId }) => {
  if (currentUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $push: { groupBookmarks: threadId },
  });
};

export const removeGroupBookmark = async (currentUser, { threadId }) => {
  if (currentUser == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $pull: { groupBookmarks: threadId },
  });
};

export const followGroup = async (currentUser, { groupId }) => {
  if (currentUser == null || groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $push: { groups: groupId },
  });
};

export const unfollowGroup = async (currentUser, { groupId }) => {
  if (currentUser == null || groupId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(currentUser._id, {
    $pull: { groups: groupId },
  });
};
