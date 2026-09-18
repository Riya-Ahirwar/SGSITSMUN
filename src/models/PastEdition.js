import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: String,        // Cloudinary secure_url
  publicId: String,   // Cloudinary public_id, for deletes/transforms
  caption: String,
});

const PastEditionSchema = new mongoose.Schema(
  {
    title: String,        // e.g. "SGSITS MUN 2025"
    year: Number,
    theme: String,
    summary: String,
    coverImage: ImageSchema,
    gallery: [ImageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.PastEdition ||
  mongoose.model("PastEdition", PastEditionSchema);
