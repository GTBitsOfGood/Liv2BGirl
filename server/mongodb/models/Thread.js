import mongoose from "mongoose";

const { Schema } = mongoose;

const ThreadSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },
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
    required: true,
    default: Date.now,
  },
});

// const ThreadSchema = new Schema({
//     poster: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     group: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       text: true,
//     },
//     tags: {
//       type: [String],
//       text: true,
//     },
//     content: {
//       type: String,
//     },
//     postedAt: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//   });

export default mongoose.models.Thread || mongoose.model("Thread", ThreadSchema);
