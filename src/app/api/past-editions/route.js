import { connectDB } from "@/lib/mongodb";
import PastEdition from "@/models/PastEdition";

// Hits Mongo on every request, so it must not be prerendered at build time.
export const dynamic = "force-dynamic";

export async function GET() {
  await connectDB();
  const editions = await PastEdition.find().sort({ year: -1 }).lean();
  return Response.json(editions);
}
