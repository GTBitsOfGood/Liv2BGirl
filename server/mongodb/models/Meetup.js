import mongoose from "mongoose";

const { Schema } = mongoose;

const MeetupSchema = new Schema({
  location: {
    type: String,
    index: true,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    index: true,
    required: true,
  },
});

export default mongoose.models.Meetup || mongoose.model("Meetup", MeetupSchema);
