import PageShell from "@/components/PageShell";
import { conductPoints } from "@/data/site";

export const metadata = { title: "Delegate Conduct | SGSITS MUN" };

export default function DelegateConductPage() {
  return (
    <PageShell
      eyebrow="Commitment"
      title="Delegate Conduct"
      subtitle="Every delegate agrees to these terms at registration. They are enforced, not decorative."
    >
      <div className="flex flex-col gap-4">
        {conductPoints.map((c, i) => (
          <div key={c.title} className="flex gap-4 border-b border-navy/10 pb-4">
            <span className="font-display text-navy/30 text-xl">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-navy/70">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
