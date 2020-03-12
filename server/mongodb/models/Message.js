import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    text: true,
  },
  sentAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);