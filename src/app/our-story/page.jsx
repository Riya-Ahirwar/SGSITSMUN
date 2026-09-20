import PageShell from "@/components/PageShell";
import { story } from "@/data/site";

export const metadata = { title: "Our Story | SGSITS MUN" };

export default function OurStoryPage() {
  return (
    <PageShell eyebrow="Our Story" title="Why this conference exists" subtitle={story.intro}>
      <div className="flex flex-col gap-6 text-navy/80 leading-relaxed">
        {story.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </PageShell>
  );
}
