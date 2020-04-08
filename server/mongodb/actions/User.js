import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "js-cookie";
import Router from "next/router";
import mongoDB from "../index";
import User from "../models/User";

export async function login(email, password) {
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
}

export async function signUp({
  email,
  username,
  password,
  avatar,
  avatarColor,
  age,
  grade,
  selectedTopics,
  role = "User",
  name = "",
}) {
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
        selectedTopics,
        role,
        name,
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
}

export const signOut = () => {
  cookie.remove("token");

  return Router.push({
    pathname: "/",
  });
};

export async function verifyToken(req, res) {
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
}

export async function verifyTokenSecure(req, res) {
  // eslint-disable-next-line global-require
  const cookies = require("cookie-universal")(req, res);

  const token = cookies.get("token");
  if (token == null) {
    throw new Error("User is not signed in!");
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

        return {
          id: user._id,
          groups: user.groups,
          followers: user.followers,
          following: user.following,
          email: user.email,
          username: user.username,
          avatar: user.avatar,
          avatarColor: user.avatarColor,
          age: user.age,
          grade: user.grade,
          role: user.role,
        };
      })
      .catch(findError => {
        cookies.remove("token");

        throw findError;
      });
  });
}

export async function follow(userId, toFollowId) {
  await mongoDB();
  // username added to userId's following
  // userId added to username's follower

  await User.findByIdAndUpdate(userId, { $push: { following: toFollowId } });
  await User.findByIdAndUpdate(toFollowId, { $push: { followers: userId } });
}

export async function unfollow(userId, toUnfollowId) {
  await mongoDB();
  // "username" deleted from userId's following
  // "userId" deleted from username's follower reduces

  await User.findByIdAndUpdate(userId, { $pull: { following: toUnfollowId } });
  await User.findByIdAndUpdate(toUnfollowId, { $pull: { followers: userId } });
}

export const getUser = userId =>
  User.findById(userId).then(user => {
    if (user == null) {
      throw new Error("User does not exist!");
    }

    return {
      id: user._id,
      groups: user.groups,
      followers: user.followers,
      following: user.following,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      avatarColor: user.avatarColor,
      age: user.age,
      grade: user.grade,
      role: user.role,
    };
  });
