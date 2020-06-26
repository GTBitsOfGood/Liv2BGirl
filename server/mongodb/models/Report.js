import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  filedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  reportedUser: {
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  additionalInfo: {
    type: String,
    text: true,
    index: true,
  },
  decided: {
    type: Boolean,
    default: false,
    index: true,
  },
  madeAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
  },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
