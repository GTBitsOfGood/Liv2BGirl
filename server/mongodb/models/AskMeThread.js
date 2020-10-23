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

    await mongoose.model("Comment").deleteMany({ parent: id });
  }
}

async function handleReport(provDoc) {
  const doc =
    this.getQuery != null ? await this.find(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;
    if (!this.reported) {
      await this.update({ _id: id }, { reported: true });
      // await mongoose
      //   .update({ _id: id }, { reportCount: this.reportCount++ });
    }
  }
}

async function handleUnreport(provDoc) {
  const doc =
    this.getQuery != null ? await this.find(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;
    if (this.reported) {
      await this.update({ _id: id }, { reported: false });
      // await mongoose
      //   .update({ _id: id }, { reportCount: this.reportCount++ });
    }
  }
}

AskMeThread.pre("remove", handleDelete);
AskMeThread.pre("findOneAndDelete", handleDelete);
AskMeThread.pre("findOneAndRemove", handleDelete);
AskMeThread.pre("deleteOne", handleDelete);
AskMeThread.pre("deleteMany", handleDelete);

AskMeThread.statics.handleReport = handleReport;
AskMeThread.statics.handleUnreport = handleUnreport;

export default mongoose.models.AskMeThread ||
  mongoose.model("AskMeThread", AskMeThread);
