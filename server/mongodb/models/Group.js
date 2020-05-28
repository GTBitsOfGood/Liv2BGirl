import mongoose from "mongoose";
import Thread from "./Thread";
import User from "./User";

const { Schema } = mongoose;

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    text: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    index: true,
    required: true,
  },
});

async function handleDelete(provDoc) {
  const doc =
    this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;
  const id = doc._id;

  await User.updateMany({ groups: id }, { $pull: { groups: id } });
  await Thread.deleteMany({ groupId: id });
}

GroupSchema.pre("remove", handleDelete);
GroupSchema.pre("findOneAndDelete", handleDelete);
GroupSchema.pre("findOneAndRemove", handleDelete);
GroupSchema.pre("deleteOne", handleDelete);
GroupSchema.pre("deleteMany", handleDelete);

export default mongoose.models.Group || mongoose.model("Group", GroupSchema);
