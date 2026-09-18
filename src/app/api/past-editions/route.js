import { connectDB } from "@/lib/mongodb";
import PastEdition from "@/models/PastEdition";

export async function GET() {
  await connectDB();
  const editions = await PastEdition.find().sort({ year: -1 }).lean();
  return Response.json(editions);
}
