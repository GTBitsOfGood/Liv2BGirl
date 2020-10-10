import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  officialAnswer: {
    type: Boolean,
    default: false,
    index: true,
  },
  content: {
    type: String,
  },
  taggedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    index: true,
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

    await this.model.update({ _id: id }, { reported: true });
    await this.model.update({ _id: id }, { reportCount: this.reportCount++ });
  }
}

CommentSchema.pre("remove", handleDelete);
CommentSchema.pre("findOneAndDelete", handleDelete);
CommentSchema.pre("findOneAndRemove", handleDelete);
CommentSchema.pre("deleteOne", handleDelete);
CommentSchema.pre("deleteMany", handleDelete);
CommentSchema.pre("reportComment", handleReport);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
