import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  poster: {
    type: String,
    required: true,
  },
  parentId: {
    type: String, // parent can be a post id or a comment id (for future use, sub-comments are disabled during MVP)
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  officialAnswer: {
    type: Boolean,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
