import mongoose from "mongoose";

const { Schema } = mongoose;

const ReportSchema = new Schema({
  filedBy: {
    type: String,
    required: true,
  },
  reportedUser: {
    type: String,
    required: true,
  },
  parentId: { 
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
    text: true,
  },
  decided: {
    type: Boolean,
  }
  madeAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);