import mongoose from "mongoose";

const GroupThreadSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    text: true,
  },
  content: {
    type: String,
    text: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;
  const id = doc._id;

  await mongoose.model("Comment").deleteMany({ parent: id });
}

GroupThreadSchema.pre("remove", handleDelete);
GroupThreadSchema.pre("findOneAndDelete", handleDelete);
GroupThreadSchema.pre("findOneAndRemove", handleDelete);
GroupThreadSchema.pre("deleteOne", handleDelete);
GroupThreadSchema.pre("deleteMany", handleDelete);

export default mongoose.models.GroupThread || mongoose.model("GroupThread", GroupThreadSchema);
