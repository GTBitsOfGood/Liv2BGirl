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
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;
  const id = doc._id;

  await this.model.deleteMany({ parent: id });
}

CommentSchema.pre("remove", handleDelete);
CommentSchema.pre("findOneAndDelete", handleDelete);
CommentSchema.pre("findOneAndRemove", handleDelete);
CommentSchema.pre("deleteOne", handleDelete);
CommentSchema.pre("deleteMany", handleDelete);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
