import { waysIn } from "@/data/site";

export default function WaysIn() {
  return (
    <section
      id="register"
      className="relative bg-navy text-cream px-6 py-16 overflow-hidden"
    >
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-72 h-72 rounded-full bg-cream/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-16 w-80 h-80 rounded-full bg-cream/5 blur-[110px]" />

      <div className="relative max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <p className="uppercase tracking-widest text-xs text-cream/50 mb-2">
              Get involved
            </p>
            <h2 className="font-display text-2xl md:text-4xl">
              Four ways in.
            </h2>
          </div>

          <p className="max-w-xs text-cream/60 text-sm md:text-right">
            Delegate registration opens soon. Every other role is open right now.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {waysIn.map((w) => {
            const isExecutiveBoard = w.title === "Join the Executive Board";

            const cardContent = (
              <>
                {/* Animated gradient border */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isExecutiveBoard
                      ? "opacity-0"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background:
                      "conic-gradient(from 0deg, #f8f0e5, transparent 30%, transparent 70%, #f8f0e5)",
                  }}
                />

                <div
                  className={`relative bg-navy rounded-[calc(1rem-1px)] p-5 h-full flex flex-col gap-3 border transition-colors ${
                    isExecutiveBoard
                      ? "border-cream/5 opacity-60"
                      : "border-cream/10 group-hover:border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-end">
                    {!isExecutiveBoard && (
                      <span
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-cream/20 text-sm
                                   group-hover:bg-cream group-hover:text-navy group-hover:border-cream
                                   group-hover:rotate-45 transition-all duration-300"
                        aria-hidden
                      >
                        →
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 mt-auto">
                    <h3
                      className={`font-display text-lg md:text-xl ${
                        !isExecutiveBoard &&
                        "group-hover:translate-x-1 transition-transform duration-300"
                      }`}
                    >
                      {w.title}
                    </h3>

                    <p className="text-xs text-cream/60 leading-relaxed">
                      {w.desc}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center gap-1.5 text-[10px] uppercase tracking-wide border rounded-full px-2.5 py-1 ${
                      isExecutiveBoard
                        ? "text-cream/40 border-cream/10"
                        : "text-cream/50 border-cream/15"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isExecutiveBoard
                          ? "bg-red-400/60"
                          : "bg-cream/50 group-hover:bg-emerald-400"
                      } transition-colors`}
                    />
                    {isExecutiveBoard ? "Closed" : w.status}
                  </span>
                </div>
              </>
            );

            if (isExecutiveBoard) {
              return (
                <div
                  key={w.title}
                  className="group relative rounded-2xl p-[1px] overflow-hidden cursor-not-allowed"
                  aria-disabled="true"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <a
                key={w.title}
                href={w.href}
                className="group relative rounded-2xl p-[1px] overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
              >
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
