import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  approved: {
    type: Boolean,
    required: true,
    default: false,
  },

  content: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
