import mongoose from "mongoose";

const { Schema } = mongoose;

const ThreadSchema = new Schema({
  posterId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  groupId: {
    type: Schema.Types.ObjectId,
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

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
