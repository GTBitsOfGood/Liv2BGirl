import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    text: true,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupCategory",
    index: true,
    required: true,
  },
  iconUrl: {
    type: String,
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;

    await mongoose
      .model("User")
      .updateMany({ groups: id }, { $pull: { groups: id } });
    await mongoose.model("Thread").deleteMany({ group: id });
  }
}

GroupSchema.pre("remove", handleDelete);
GroupSchema.pre("findOneAndDelete", handleDelete);
GroupSchema.pre("findOneAndRemove", handleDelete);
GroupSchema.pre("deleteOne", handleDelete);
GroupSchema.pre("deleteMany", handleDelete);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
