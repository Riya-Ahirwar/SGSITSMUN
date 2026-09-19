import mongoose from "mongoose";

const SecretariatMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: String,
    image: {
      url: String,
      publicId: String,
    },
    order: { type: Number, default: 0 }, // controls display order on the site
  },
  { timestamps: true }
);

export default mongoose.models.SecretariatMember ||
  mongoose.model("SecretariatMember", SecretariatMemberSchema);
