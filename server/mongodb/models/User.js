import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    // admin/ambassador only
    type: String
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  followers: {
    type: [String],
    required: true
  },
  following: {
    type: [String],
    required: true
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
