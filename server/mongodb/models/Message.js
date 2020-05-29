import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
    text: true,
  },
  sentAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
