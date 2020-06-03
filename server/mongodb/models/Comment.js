import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
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

  await this.model.deleteMany({ parentId: id });
}

CommentSchema.pre("remove", handleDelete);
CommentSchema.pre("findOneAndDelete", handleDelete);
CommentSchema.pre("findOneAndRemove", handleDelete);
CommentSchema.pre("deleteOne", handleDelete);
CommentSchema.pre("deleteMany", handleDelete);

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
