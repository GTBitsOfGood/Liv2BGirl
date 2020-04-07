import mongoose from "mongoose";

const { Schema } = mongoose;

const ThreadSchema = new Schema({
  posterId: {
    type: String,
    required: true,
    index: true,
  },
  groupId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    text: true,
  },
  tags: {
    type: [String],
    text: true,
  },
  content: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
