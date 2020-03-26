import mongoose from "mongoose";

const { Schema } = mongoose;

const ThreadSchema = new Schema({
  poster: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  content: {
    type: String,
  },
  comments: {
    type: [String],
  },
  pictures: {
    type: [String],
  },
  reports: {
    type: [String],
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
