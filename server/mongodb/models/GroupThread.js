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
    index: true,
    text: true,
  },
  content: {
    type: String,
    index: true,
    text: true,
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
  reported: {
    type: Boolean,
    required: true,
    default: false,
  },
  reportCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;

    await this.model.deleteMany({ parent: id });
  }
}

async function handleReport(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;

    await mongoose
      .model("GroupThread")
      .updateMany({ _id: id }, { reported: true });

    await mongoose
      .model("GroupThread")
      .updateMany({ _id: id }, { reportCount: this.reportCount++ });
  }
}

GroupThreadSchema.pre("remove", handleDelete);
GroupThreadSchema.pre("findOneAndDelete", handleDelete);
GroupThreadSchema.pre("findOneAndRemove", handleDelete);
GroupThreadSchema.pre("deleteOne", handleDelete);
GroupThreadSchema.pre("deleteMany", handleDelete);
GroupThreadSchema.pre("reportThread", handleReport);

export default mongoose.models.GroupThread ||
  mongoose.model("GroupThread", GroupThreadSchema);
