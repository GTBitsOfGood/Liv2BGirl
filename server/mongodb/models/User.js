import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  name: {
    // admin/ambassador only
    type: String,
  },
  groups: {
    type: [String],
    required: true,
    index: true,
  },
  followers: {
    type: [String],
    required: true,
    default: [],
  },
  following: {
    type: [String],
    required: true,
    default: [],
  },
  avatar: {
    type: Number,
    required: true,
  },
  avatarColor: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  askBookmarks: {
    type: [String],
    required: true,
  },
  groupBookmarks: {
    type: [String],
    required: true,
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
