import mongoose from "mongoose";

const { Schema } = mongoose;

const GroupCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    index: true,
    default: null,
  },
});

export default mongoose.models.GroupCategory ||
  mongoose.model("GroupCategory", GroupCategorySchema);
