import { waysIn } from "@/data/site";

export default function WaysIn() {
  return (
    <section id="register" className="bg-navy text-cream px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-cream/60 mb-3">Get involved</p>
        <h2 className="font-display text-4xl md:text-5xl mb-4">Four ways in.</h2>
        <p className="max-w-2xl text-cream/70 mb-12">
          Delegate registration opens soon. All other roles are open now.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {waysIn.map((w) => (
            <a
              key={w.title}
              href={w.href}
              className="flex flex-col gap-2 border border-cream/15 rounded-2xl p-6 hover:bg-cream/5 transition"
            >
              <span className="font-semibold flex items-center justify-between">
                {w.title} <span aria-hidden>→</span>
              </span>
              <span className="text-sm text-cream/60">{w.desc}</span>
              <span className="text-xs uppercase tracking-wide text-cream/40 mt-1">{w.status}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
