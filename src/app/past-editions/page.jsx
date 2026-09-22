import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PastEditionsView from "@/components/PastEditionsView";
import { connectDB } from "@/lib/mongodb";
import PastEdition from "@/models/PastEdition";

export const metadata = {
  title: "Past Editions | SGSITS MUN 2026",
  description:
    "SGSITS MUN 2025 · Theme: DIGIT. The inaugural edition of SGSITS MUN brought together students from across the campus and beyond for two days of debate, diplomacy and dialogue.",
};

export const dynamic = "force-dynamic";

async function getEditions() {
  try {
    await connectDB();
    const editions = await PastEdition.find().sort({ year: -1 }).lean();
    return JSON.parse(JSON.stringify(editions));
  } catch (err) {
    console.error("Failed to load past editions:", err.message);
    return [];
  }
}

export default async function PastEditionsPage() {
  const editions = await getEditions();

  return (
    <>
      <Nav />
      <main>
        <PastEditionsView editions={editions} />
      </main>
      <Footer />
    </>
  );
}
