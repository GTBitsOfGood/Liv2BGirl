import mongoose from "mongoose";

const AskMeThread = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  visibility: {
    type: String,
    default: "Public",
    required: true,
    index: true,
    enum: ["Public", "Anonymous", "Ambassador"],
  },
  postedAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;

    await mongoose.model("Comment").deleteMany({ parent: id });
  }
}

AskMeThread.pre("remove", handleDelete);
AskMeThread.pre("findOneAndDelete", handleDelete);
AskMeThread.pre("findOneAndRemove", handleDelete);
AskMeThread.pre("deleteOne", handleDelete);
AskMeThread.pre("deleteMany", handleDelete);

export default mongoose.models.AskMeThread ||
  mongoose.model("AskMeThread", AskMeThread);
