import Image from "next/image";
import Countdown from "./Countdown";
import { event } from "@/data/site";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background photo — drop your college building shot at
          public/assets/hero-building.jpg and it renders here automatically */}
      <Image
        src="/assets/hero-building.jpg"
        alt=""
        fill
        priority
        className="object-cover -z-20"
      />

      {/* Navy wash over the photo, so text stays readable — mirrors the
          maroon overlay on the reference site's riverfront photo */}
      <div className="absolute inset-0 -z-10 bg-navy/80" />

      {/* Subtle dotted/jali texture on top of the wash */}
      <div
        className="absolute inset-0 -z-10 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, #f8f0e5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-8 text-cream">
        <Image src="/assets/logo.jpg" alt="SGSITS MUN" width={90} height={90} className="rounded-full" />

        <p className="uppercase tracking-widest text-sm text-cream/70">
          Edition 2026 · SGSITS Indore
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-tight">
          Where debate <br />
          becomes <em className="italic text-cream/90">direction.</em>
        </h1>
        <p className="max-w-xl text-cream/80">
          {event.name} — {event.theme}. Two days, three committees, and a room full of
          people about to discover what they are capable of.
        </p>

        <div className="bg-cream/10 rounded-2xl p-4 sm:p-6">
          <Countdown />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#register" className="bg-cream text-navy px-6 py-3 rounded-full font-semibold hover:bg-cream/90 transition">
            Register as Delegate
          </a>
          <a href="#about" className="border border-cream/40 px-6 py-3 rounded-full font-semibold hover:bg-cream/10 transition">
            Learn more
          </a>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-cream/70 pt-4">
          <span>{event.dates}</span>
          <span>·</span>
          <span>{event.venue}</span>
          <span>·</span>
          <span>Three Committees</span>
        </div>
      </div>
    </header>
  );
}
