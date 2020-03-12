import mongoose from "mongoose";

const { Schema } = mongoose;

const ReportSchema = new Schema({
  filedBy: {
    type: String,
    index: true,
    required: true,
  },
  reportedUser: {
    type: String,
    index: true,
    required: true,
  },
  parentId: {
    type: String,
    index: true,
    required: true,
  },
  category: {
    type: String,
    index: true,
    required: true,
  },
  additionalInfo: {
    type: String,
    text: true,
  },
  decided: {
    type: Boolean,
  },
  madeAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
