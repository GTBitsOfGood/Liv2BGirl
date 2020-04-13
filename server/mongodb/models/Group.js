import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
    text: true,
  },
  admin: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
