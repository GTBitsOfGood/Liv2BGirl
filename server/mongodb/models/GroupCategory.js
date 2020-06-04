import mongoose from "mongoose";

const GroupCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupCategory",
    index: true,
    default: null,
  },
});

export default mongoose.models.GroupCategory ||
  mongoose.model("GroupCategory", GroupCategorySchema);
