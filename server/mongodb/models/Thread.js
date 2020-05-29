import mongoose from "mongoose";
import Comment from "./Comment";

const { Schema } = mongoose;

const ThreadSchema = new Schema({
  posterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "Group",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    text: true,
  },
  content: {
    type: String,
    text: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;
  const id = doc._id;

  await Comment.deleteMany({ parentId: id });
}

ThreadSchema.pre("remove", handleDelete);
ThreadSchema.pre("findOneAndDelete", handleDelete);
ThreadSchema.pre("findOneAndRemove", handleDelete);
ThreadSchema.pre("deleteOne", handleDelete);
ThreadSchema.pre("deleteMany", handleDelete);

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
