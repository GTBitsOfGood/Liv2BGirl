import mongoose from "mongoose";

const { Schema } = mongoose;

const PollAnswersSchema = new Schema({
  content: {
    type: String,
    required: true,
    text: true,
  },
  votes: {
    type: [String],
    required: true,
  },
});

export default mongoose.models.PollAnswers ||
  mongoose.model("PollAnswers", PollAnswersSchema);
