import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
    index: true,
    unique: true
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
