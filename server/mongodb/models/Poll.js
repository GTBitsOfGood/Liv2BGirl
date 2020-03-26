import mongoose from "mongoose";

const { Schema } = mongoose;

const PollSchema = new Schema({
  poster: {
    type: String,
    required: true,
    index: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  expires: {
    type: Date,
  },
});

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
