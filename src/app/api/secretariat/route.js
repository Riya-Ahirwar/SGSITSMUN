import { connectDB } from "@/lib/mongodb";
import SecretariatMember from "@/models/SecretariatMember";

export async function GET() {
  await connectDB();
  const members = await SecretariatMember.find().sort({ order: 1, createdAt: 1 }).lean();
  return Response.json(members);
}

// Expects JSON body: { name, role, quote, order }
export async function POST(req) {
  const { name, role, quote, order } = await req.json();
  if (!name || !role) {
    return Response.json({ error: "name and role are required" }, { status: 400 });
  }
  await connectDB();
  const member = await SecretariatMember.create({ name, role, quote, order });
  return Response.json(member, { status: 201 });
}
