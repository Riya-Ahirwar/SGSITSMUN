import Image from "next/image";
import PageShell from "@/components/PageShell";
import { connectDB } from "@/lib/mongodb";
import PastEdition from "@/models/PastEdition";

export const metadata = { title: "Past Editions | SGSITS MUN" };
export const dynamic = "force-dynamic"; // always fetch fresh from Mongo, no static caching

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
    <PageShell
      eyebrow="Delegate Desk"
      title="Past Editions"
      subtitle="What previous editions looked like, in the words and photos of the people who ran them."
    >
      {editions.length === 0 ? (
        <div className="border border-navy/15 rounded-2xl p-10 text-center text-navy/60">
          <p className="mb-2 font-semibold">No past editions added yet.</p>
          <p className="text-sm">
            Once photos are uploaded via the admin upload route, they&apos;ll appear here automatically —
            this page reads live from the database.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {editions.map((ed) => (
            <div key={ed._id}>
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="font-display text-2xl">{ed.title}</h2>
                <span className="text-sm text-navy/50">{ed.year}</span>
              </div>
              {ed.theme && <p className="text-sm text-navy/60 mb-3">Theme: {ed.theme}</p>}
              {ed.summary && <p className="text-navy/80 mb-6">{ed.summary}</p>}

              {ed.coverImage?.url && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4">
                  <Image src={ed.coverImage.url} alt={ed.title} fill className="object-cover" />
                </div>
              )}

              {ed.gallery?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {ed.gallery.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                      <Image src={img.url} alt={img.caption || ed.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
