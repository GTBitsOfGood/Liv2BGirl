import mongoose from "mongoose";

const { Schema } = mongoose;

const PictureSchema = new Schema({
  poster: {
    type: String,
    index: true,
    required: true,
  },
  parentId: {
    type: String,
    index: true,
    required: true,
  },
  approved: {
    type: Boolean,
    required: true,
  },
  content: {
    data: Buffer,
    contentType: String,
  },
  postedAt: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Picture ||
  mongoose.model("Picture", PictureSchema);
