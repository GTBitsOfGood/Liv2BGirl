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
  category: {
    type: String,
    index: true,
  },
  admin: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
