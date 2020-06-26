import mongoose from "mongoose";

const InvitationCodeSchema = new mongoose.Schema({
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
    index: true,
  },
  usedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  usedAt: {
    type: Date,
    index: true,
  },
});

export default mongoose.models.InvitationCode ||
  mongoose.model("InvitationCode", InvitationCodeSchema);
