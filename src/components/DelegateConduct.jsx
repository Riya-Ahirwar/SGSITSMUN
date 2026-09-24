/* ── data ─────────────────────────────────────────────── */
const rules = [
  {
    num: "01",
    title: "RESPECT THE CHAIR. RESPECT THE ROOM.",
    body: "Follow the instructions and rulings of the Executive Board. Maintain decorum during formal and informal sessions. Disagreement is part of debate; disrespect is not.",
  },
  {
    num: "02",
    title: "DEBATE THE ISSUE, NOT THE PERSON.",
    body: "Personal attacks, insults, intimidation, discrimination or deliberately disrespectful behaviour towards another delegate, Executive Board member, volunteer or member of the organising team will not be tolerated.",
  },
  {
    num: "03",
    title: "NO RAGGING. NO HARASSMENT.",
    body: "Ragging, bullying, harassment or intimidation of any kind is strictly prohibited.\n\nThis includes verbal, physical, psychological, sexual or online harassment, whether occurring during committee, elsewhere at the venue or in connection with the conference.\n\nAny such incident will be taken seriously and may result in immediate removal from the conference.",
  },
  {
    num: "04",
    title: "ZERO TOLERANCE FOR VIOLENCE.",
    body: "Physical fighting, assault, threats of violence, aggressive physical behaviour or deliberate physical intimidation will not be tolerated under any circumstances.\n\nAny participant involved in such conduct may be immediately removed from the conference and disqualified from participation and awards.",
  },
  {
    num: "05",
    title: "NO MISCONDUCT OUTSIDE COMMITTEE.",
    body: "The standards of SGSITS MUN do not end when committee does.\n\nParticipants are expected to maintain appropriate conduct in corridors, common areas, transport, accommodation where applicable, social events and all conference-related spaces.",
  },
  {
    num: "06",
    title: "ACADEMIC INTEGRITY MATTERS.",
    body: "Position papers, speeches, working papers and other submissions must be your own work.\n\nPlagiarism, fabricated information, impersonation or the use of pre-written resolutions presented as original work may result in disqualification.",
  },
  {
    num: "07",
    title: "RESPECT THE DRESS CODE.",
    body: "Formal attire is required for all committee sessions.\n\nWestern formal or appropriate Indian formal wear is expected throughout the conference.",
  },
  {
    num: "08",
    title: "NO SUBSTANCE ABUSE.",
    body: "The possession, consumption or distribution of alcohol, recreational drugs or other prohibited substances during the conference or at conference-related activities is strictly prohibited.",
  },
  {
    num: "09",
    title: "RESPECT THE VENUE.",
    body: "Treat the SGSITS campus, committee rooms, equipment and facilities with care.\n\nAny deliberate damage to property may result in removal from the conference and the participant may be held responsible for the associated costs.",
  },
];

/* ── component ────────────────────────────────────────── */
export default function DelegateConduct() {
  return (
    <div className="bg-cream text-navy">
      {/* ══════════ HERO ══════════ */}
      <section className="bg-navy text-cream px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cream/75 font-semibold mb-6">
            Delegate Desk
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.08] font-bold mb-6 tracking-tight">
            DELEGATE CODE
            <br />
            OF CONDUCT
          </h1>
          <p className="text-cream text-lg md:text-xl font-bold max-w-2xl leading-relaxed mb-4">
            The standard we expect.
          </p>
          <p className="text-cream/85 text-base md:text-lg max-w-2xl leading-relaxed font-normal">
            SGSITS MUN 2026 is built on debate, discipline and mutual respect.
            Every delegate is expected to conduct themselves accordingly —
            inside committee, across the venue and throughout the conference.
          </p>
          <p className="text-cream/75 text-sm md:text-base max-w-2xl leading-relaxed mt-4 italic font-medium">
            These standards apply to every participant and are not merely
            guidelines. Violations may result in removal from the conference
            and/or disqualification from awards.
          </p>
        </div>
      </section>

      {/* ══════════ RULES ══════════ */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto flex flex-col">
          {rules.map((rule, idx) => (
            <div key={rule.num}>
              {/* divider */}
              <div className="h-px bg-navy/20 w-full" />

              {/* card */}
              <div
                className="group relative py-8 md:py-10 flex gap-5 md:gap-8 items-start
                           rounded-2xl px-4 md:px-6 -mx-4 md:-mx-6
                           transition-all duration-300 ease-out
                           hover:bg-navy/[0.05] hover:shadow-[0_4px_30px_rgba(8,32,82,0.08)]
                           hover:scale-[1.005] cursor-default"
              >
                {/* number */}
                <span
                  className="font-display text-3xl md:text-4xl font-bold text-navy/35
                             group-hover:text-navy
                             transition-colors duration-300 select-none
                             min-w-[3.5rem] pt-0.5"
                >
                  {rule.num}
                </span>

                {/* content */}
                <div className="flex-1">
                  <h3
                    className="font-display text-xl md:text-2xl font-bold tracking-wide text-navy mb-3
                               group-hover:text-[#040e24]
                               transition-colors duration-300"
                  >
                    {rule.title}
                  </h3>
                  {rule.body.split("\n\n").map((para, pi) => (
                    <p
                      key={pi}
                      className="text-navy/90 font-normal text-base md:text-[16px] leading-relaxed mb-3 last:mb-0
                                 group-hover:text-navy transition-colors duration-300"
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* hover accent bar */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-[4px] rounded-full
                             bg-[#7eb8f7] scale-y-0 origin-top
                             group-hover:scale-y-100
                             transition-transform duration-300 ease-out"
                />
              </div>

              {/* last divider */}
              {idx === rules.length - 1 && (
                <div className="h-px bg-navy/20 w-full" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CLOSING — OUR STANDARD ══════════ */}
      <section className="bg-navy text-cream px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-cream/70 font-semibold mb-5">
            Our Standard
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-8">
            Debate fiercely.
            <br />
            Conduct yourself respectfully.
          </h2>
          <p className="text-cream/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6 font-medium">
            SGSITS MUN is a space for disagreement, negotiation and competition
            — but never at the expense of another person&apos;s dignity or safety.
          </p>
          <p className="text-cream/75 text-sm md:text-base leading-relaxed max-w-2xl mx-auto italic font-normal">
            By registering for SGSITS MUN 2026, every participant agrees to
            abide by these standards and to cooperate with the Secretariat and
            Executive Board in maintaining a safe, respectful and professional
            conference environment.
          </p>
        </div>
      </section>
    </div>
  );
}
