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
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
});

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
