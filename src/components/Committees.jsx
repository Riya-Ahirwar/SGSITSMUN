import { committees } from "@/data/site";

export default function Committees() {
  return (
    <section id="committees" className="bg-navy text-cream px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-cream/60 mb-3">Delegate Desk</p>
        <h2 className="font-display text-4xl md:text-5xl mb-4">Three rooms, three debates.</h2>
        <p className="max-w-2xl text-cream/70 mb-12">
          Each committee approaches DIGIT from a different angle. Choose your arena.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {committees.map((c) => (
            <div key={c.name} className="grid-item bg-cream/5 border border-cream/15 rounded-2xl p-8 hover:bg-cream/10 transition">
              <span className="text-xs uppercase tracking-wide text-cream/50">{c.type}</span>
              <h3 className="font-display text-2xl mt-3 mb-1">{c.name}</h3>
              <p className="text-sm text-cream/60 mb-4">{c.tag}</p>
              <p className="text-cream/80 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
