import mongoose from "mongoose";
import Group from "./Group";
import Thread from "./Thread";
import Comment from "./Comment";

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
    // Admin, Ambassador, User
    type: String,
    required: true,
    default: "User",
  },
  name: {
    // Admin/Ambassador only
    type: String,
  },
  groups: {
    type: [Schema.Types.ObjectId],
    ref: "Group",
    required: true,
    index: true,
    default: [],
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  following: {
    type: [Schema.Types.ObjectId],
    ref: "User",
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
    ref: "AskMeThread",
    required: true,
    default: [],
  },
  groupBookmarks: {
    type: [Schema.Types.ObjectId],
    ref: "Thread",
    required: true,
    default: [],
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;
  const id = doc._id;

  await Group.updateMany({ admin: id }, { admin: null });
  await Thread.deleteMany({ posterId: id });
  await Comment.deleteMany({ poster: id });
}

UserSchema.pre("remove", handleDelete);
UserSchema.pre("findOneAndDelete", handleDelete);
UserSchema.pre("findOneAndRemove", handleDelete);
UserSchema.pre("deleteOne", handleDelete);
UserSchema.pre("deleteMany", handleDelete);

export default mongoose.models.User || mongoose.model("User", UserSchema);
