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
    default: "User",
  },
  name: {
    // admin/ambassador only
    type: String,
  },
  groups: {
    type: [Schema.Types.ObjectId],
    required: true,
    index: true,
    default: [],
  },
  followers: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  following: {
    type: [Schema.Types.ObjectId],
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
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  groupBookmarks: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
