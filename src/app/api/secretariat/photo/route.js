import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import SecretariatMember from "@/models/SecretariatMember";

// Expects JSON body: { file: "data:image/...;base64,...", memberId }
export async function POST(req) {
  try {
    const { file, memberId } = await req.json();
    if (!file || !memberId) {
      return Response.json({ error: "file and memberId are required" }, { status: 400 });
    }

    const uploaded = await cloudinary.uploader.upload(file, {
      folder: "sgsits-mun/secretariat",
    });

    await connectDB();
    const image = { url: uploaded.secure_url, publicId: uploaded.public_id };
    await SecretariatMember.findByIdAndUpdate(memberId, { image });

    return Response.json({ image });
  } catch (err) {
    console.error("Secretariat photo upload failed:", err);
    return Response.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
