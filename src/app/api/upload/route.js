import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/mongodb";
import PastEdition from "@/models/PastEdition";

// Expects a JSON body: { file: "data:image/png;base64,....", editionId: "...", caption: "..." }
// `file` should be a base64 data URL from a client-side <input type="file"> read via FileReader.
export async function POST(req) {
  try {
    const { file, editionId, caption } = await req.json();
    if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

    const uploaded = await cloudinary.uploader.upload(file, {
      folder: "sgsits-mun/past-editions",
    });

    await connectDB();
    const image = { url: uploaded.secure_url, publicId: uploaded.public_id, caption };

    if (editionId) {
      await PastEdition.findByIdAndUpdate(editionId, {
        $push: { gallery: image },
      });
    }

    return Response.json({ image });
  } catch (err) {
    console.error("Upload failed:", err);
    return Response.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
