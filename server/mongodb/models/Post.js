import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },

  approved: {
    type: Boolean,
    required: true,
    default: false,
  },

  content: {
    type: String,
    required: true,
  },

  reported: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// async function handleDelete(provDoc) {
//     const doc =
//       this.getQuery != null ? await this.model.findOne(this.getQuery()) : provDoc;

//     if (doc != null) {
//       const id = doc._id;
//       await mongoose
//         .model()
//         .updateMany({ groups: id }, { $pull: { groups: id } });
//         await mongoose.model("GroupThread").deleteMany({ group: id });
//     }

//   }

//   PostSchema.pre("remove", handleDelete);
//   PostSchema.pre("findOneAndDelete", handleDelete);
//   PostSchema.pre("findOneAndRemove", handleDelete);
//   PostSchema.pre("deleteOne", handleDelete);
//   PostSchema.pre("deleteMany", handleDelete);

async function handleApprove(provDoc) {
  const doc =
    this.getQuery != null ? await this.find(this.getQuery()) : provDoc;

  if (doc != null) {
    const id = doc._id;
    if (!this.approved) {
      await this.update({ _id: id }, { reported: true });
    }
  }
}

PostSchema.statics.handleApprove = handleApprove;

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
