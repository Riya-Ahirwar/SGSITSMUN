import { secretariat } from "@/data/site";

export default function Secretariat() {
  return (
    <section id="secretariat" className="bg-cream px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-navy/60 mb-3">Leadership</p>
        <h2 className="font-display text-4xl md:text-5xl mb-4">The people who built this.</h2>
        <p className="max-w-2xl text-navy/70 mb-12">
          Everything you experience is theirs to answer for.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {secretariat.map((m) => (
            <div key={m.name} className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-navy/10 flex items-center justify-center font-display text-xl text-navy/50 mb-4">
                {m.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-semibold">{m.name}</h3>
              <p className="text-sm text-navy/60 mb-2">{m.role}</p>
              <p className="text-xs text-navy/50 italic">"{m.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
