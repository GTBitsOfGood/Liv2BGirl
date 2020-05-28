import mongoose from "mongoose";

const { Schema } = mongoose;

const ReportSchema = new Schema({
  filedBy: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  reportedUser: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  additionalInfo: {
    type: String,
    text: true,
  },
  decided: {
    type: Boolean,
    default: false,
  },
  madeAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
