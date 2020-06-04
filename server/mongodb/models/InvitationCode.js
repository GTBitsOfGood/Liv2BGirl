import mongoose from "mongoose";

const InvitationCodeSchema = new Schema({
  code: {
    type: String,
    required: true,
    index: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },
  madeAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  usedAt: {
    type: Date,
  },
});

export default mongoose.models.InvitationCode ||
  mongoose.model("InvitationCode", InvitationCodeSchema);
