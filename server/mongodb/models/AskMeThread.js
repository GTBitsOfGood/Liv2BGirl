import mongoose from "mongoose";

const { Schema } = mongoose;

const AskMeThread = new Schema({
  posterId: {
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
  visibility: {
    type: String,
    default: "Public",
    required: true,
    index: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.models.AskMeThread ||
  mongoose.model("AskMeThread", AskMeThread);
