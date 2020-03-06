import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  subscribers: {
    type: [String],
    required: true,
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
