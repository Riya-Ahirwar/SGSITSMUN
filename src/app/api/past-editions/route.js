import { connectDB } from "@/lib/mongodb";
import PastEdition from "@/models/PastEdition";

export async function GET() {
  await connectDB();
  const editions = await PastEdition.find().sort({ year: -1 }).lean();
  return Response.json(editions);
}

// Expects JSON body: { title, year, theme, summary }
// Creates the edition record; images are added afterward via /api/upload
// with the returned _id as `editionId`.
export async function POST(req) {
  const { title, year, theme, summary } = await req.json();
  if (!title || !year) {
    return Response.json({ error: "title and year are required" }, { status: 400 });
  }
  await connectDB();
  const edition = await PastEdition.create({ title, year, theme, summary });
  return Response.json(edition, { status: 201 });
}
