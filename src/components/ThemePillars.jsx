import { themePillars } from "@/data/site";

export default function ThemePillars() {
  return (
    <section id="about" className="bg-cream px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-widest text-sm text-navy/60 mb-3">Our theme</p>
        <h2 className="font-display text-4xl md:text-5xl mb-4">Five words. One conference.</h2>
        <p className="max-w-2xl text-navy/70 mb-12">
          DIGIT is not an acronym for decoration. Each pillar is a question the committees
          will actually wrestle with — and a skill every delegate will leave with.
        </p>

        <div className="grid md:grid-cols-5 gap-6">
          {themePillars.map((p) => (
            <div key={p.title} className="border border-navy/15 rounded-2xl p-6 hover:border-navy/40 transition">
              <span className="font-display text-3xl text-navy/30">{p.letter}</span>
              <h3 className="font-semibold text-lg mt-3 mb-2">{p.title}</h3>
              <p className="text-sm text-navy/70">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
