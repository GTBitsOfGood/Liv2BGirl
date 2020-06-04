import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    enum: ["Admin", "Ambassador", "User"],
  },
  name: {
    type: String,
  },
  groups: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Group",
    required: true,
    index: true,
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: "AskMeThread",
    required: true,
    default: [],
  },
  groupBookmarks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Thread",
    required: true,
    default: [],
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;
  const id = doc._id;

  await mongoose
    .model("Group")
    .updateMany({ moderator: id }, { moderator: null });
  await mongoose.model("Thread").deleteMany({ author: id });
  await mongoose.model("Comment").deleteMany({ author: id });
}

UserSchema.pre("remove", handleDelete);
UserSchema.pre("findOneAndDelete", handleDelete);
UserSchema.pre("findOneAndRemove", handleDelete);
UserSchema.pre("deleteOne", handleDelete);
UserSchema.pre("deleteMany", handleDelete);

export default mongoose.models.User || mongoose.model("User", UserSchema);
