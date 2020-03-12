import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  poster: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
  officialAnswer: {
    type: Boolean,
  },
  content: {
    type: String,
    text: true,
  },
  postedAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);