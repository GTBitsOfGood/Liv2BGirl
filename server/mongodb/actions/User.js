import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import Router from "next/router";
import mongoDB from "../index";
import User from "../models/User";
import Comments from "../models/Comment";

export const login = async (email, password) => {
  if (email == null || password == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findOne({ email })
    .then(user => {
      if (user) {
        return bcrypt.compare(password, user.password).then(result => {
          if (result) return Promise.resolve(user);

          return Promise.reject(
            new Error("The password you entered is incorrect.")
          );
        });
      }

      return Promise.reject(new Error("The username does not exist."));
    })
    .then(user =>
      jwt.sign(
        {
          id: user._id,
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

export const signUp = async ({
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
}) => {
  if (email == null || username == null || password == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.countDocuments({ email })
    .then(count => {
      if (count) {
        return Promise.reject(new Error("This email has already been used."));
      }

      return bcrypt.hashSync(password, 10);
    })
    .then(hashedPassword =>
      User.create({
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
      })
    )
    .then(user =>
      jwt.sign(
        {
          id: user._id,
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

export const signOut = () => {
  cookie.remove("token");

  return Router.push({
    pathname: "/",
  });
};

export const verifyToken = async (req, res) => {
  // eslint-disable-next-line global-require
  const cookies = require("cookie-universal")(req, res);

  const token = cookies.get("token");
  if (token == null) {
    throw new Error("User is not signed in!");
  }

  return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (decoded) {
      return decoded;
    }

    cookies.remove("token");

    throw new Error("Invalid token!");
  });
};

export const verifyTokenSecure = async (req, res) => {
  // eslint-disable-next-line global-require
  const cookies = require("cookie-universal")(req, res);

  const token = cookies.get("token");
  if (token == null) {
    return null;
  }

  await mongoDB();

  return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err || decoded == null) {
      throw new Error("Invalid token!");
    }

    const { id } = decoded;

    return User.findOne({ _id: id })
      .then(user => {
        if (user == null) {
          throw new Error("User does not exist!");
        }

        const { password, ...rest } = user.toObject();

        return rest;
      })
      .catch(findError => {
        cookies.remove("token");

        throw findError;
      });
  });
};

export const follow = async (userId, toFollowId) => {
  if (userId == null || toFollowId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();
  // username added to userId's following
  // userId added to username's follower

  await User.findByIdAndUpdate(userId, { $push: { following: toFollowId } });
  await User.findByIdAndUpdate(toFollowId, { $push: { followers: userId } });
};

export const unfollow = async (userId, toUnfollowId) => {
  if (userId == null || toUnfollowId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();
  // "username" deleted from userId's following
  // "userId" deleted from username's follower reduces

  await User.findByIdAndUpdate(userId, { $pull: { following: toUnfollowId } });
  await User.findByIdAndUpdate(toUnfollowId, { $pull: { followers: userId } });
};

export const getUser = async userId => {
  if (userId == null) {
    throw new Error("userId must be provided!");
  }

  await mongoDB();

  return User.findById(userId).then(user => {
    if (user == null) {
      throw new Error("User does not exist!");
    }

    return {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      avatarColor: user.avatarColor,
      groups: user.groups,
      age: user.age,
      grade: user.grade,
      interests: user.interests,
    };
  });
};

export const getUserAskBookmarks = async userId => {
  if (userId == null) {
    throw new Error("userId must be provided!");
  }

  await mongoDB();

  return User.findById(userId)
    .populate({
      path: "askBookmarks",
      model: "AskMeThread",
    })
    .then(user => {
      if (user == null) {
        throw new Error("User does not exist!");
      }

      return user.askBookmarks;
    })
    .then(bookmarks =>
      Promise.all(
        bookmarks.map(async bookmark => ({
          ...bookmark.toObject(),
          numComments: await Comments.find({
            parentId: bookmark._id,
          }).countDocuments(),
        }))
      )
    );
};

export const addAskBookmark = async (userId, threadId) => {
  if (threadId == null || userId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, { $push: { askBookmarks: threadId } });
};

export const removeAskBookmark = async (userId, threadId) => {
  if (userId == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, { $pull: { askBookmarks: threadId } });
};

export const getUserGroupBookmarks = async userId => {
  if (userId == null) {
    throw new Error("userId must be provided!");
  }

  await mongoDB();

  return User.findById(userId)
    .populate({
      path: "groupBookmarks",
      model: "Thread",
    })
    .then(user => {
      if (user == null) {
        throw new Error("User does not exist!");
      }

      return user.askBookmarks;
    })
    .then(bookmarks =>
      Promise.all(
        bookmarks.map(async bookmark => ({
          ...bookmark.toObject(),
          numComments: await Comments.find({
            parentId: bookmark._id,
          }).countDocuments(),
        }))
      )
    );
};

export const addGroupBookmark = async (userId, threadId) => {
  if (userId == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return User.findByIdAndUpdate(userId, {
    $push: { groupBookmarks: threadId },
  });
};

export const removeGroupBookmark = async (userId, threadId) => {
  if (userId == null || threadId == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  await User.findByIdAndUpdate(userId, {
    $pull: { groupBookmarks: threadId },
  });
};
