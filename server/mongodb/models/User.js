import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  following: {
    type: [String],
  },
  followers: {
    type: [String],
    
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
