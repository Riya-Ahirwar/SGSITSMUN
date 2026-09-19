import PageShell from "@/components/PageShell";
import { awardsList } from "@/data/site";

export const metadata = { title: "Awards | SGSITS MUN" };

export default function AwardsPage() {
  return (
    <PageShell
      eyebrow="Delegate Desk"
      title="Awards"
      subtitle="Judged on argument, strategy, diplomacy and how much better the debate got because you were in it."
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {awardsList.map((a) => (
          <div key={a.title} className="border border-navy/15 rounded-2xl p-6">
            <h3 className="font-display text-lg mb-2">{a.title}</h3>
            <p className="text-sm text-navy/70">{a.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
