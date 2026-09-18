import { event } from "@/data/site";

export default function Footer() {
  return (
    <>
      <section id="contact" className="bg-cream px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <p className="uppercase tracking-widest text-sm text-navy/60 mb-3">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Ask us anything.</h2>
          <p className="max-w-xl text-navy/70 mb-8">
            Delegates, schools, sponsors and press. We answer everything, usually within a day.
          </p>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <p className="text-navy/50 mb-1">Email</p>
              <a href={`mailto:${event.email}`} className="font-semibold">{event.email}</a>
            </div>
            <div>
              <p className="text-navy/50 mb-1">Follow</p>
              <a href={event.instagram} target="_blank" rel="noopener" className="font-semibold">Instagram</a>
            </div>
            <div>
              <p className="text-navy/50 mb-1">Venue</p>
              <p className="font-semibold">{event.venue}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-cream/70 px-6 py-10 text-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-4">
          <p>{event.name} · {event.theme} · {event.dates}</p>
          <p>{event.city}</p>
        </div>
      </footer>
    </>
  );
}
