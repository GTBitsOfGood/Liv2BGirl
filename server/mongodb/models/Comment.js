import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  officialAnswer: {
    type: Boolean,
    default: false,
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

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
