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
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      )
    );
}

export async function signUp(
  username,
  password,
  email,
  role = "User",
  name = ""
) {
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
        name,
        password: hashedPassword,
        role,
        username,
      })
    )
    .then(user =>
      jwt.sign(
        {
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
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

export async function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) return Promise.resolve(decoded);

    return Promise.reject(new Error("Invalid token!"));
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
  await User.findByIdAndUpdate(toUnfollowId, { $push: { followers: userId } });
}
