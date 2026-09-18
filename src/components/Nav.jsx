"use client";
import { useState } from "react";
import Image from "next/image";

const dropdowns = {
  "Delegate Desk": [
    { label: "Committees", href: "#committees" },
    { label: "Fees & Packages", href: "#fees" },
    { label: "Awards", href: "#awards" },
  ],
  "Our Leadership": [
    { label: "Secretariat", href: "#secretariat" },
    { label: "Join the Team", href: "#register" },
  ],
};

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy text-cream">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <a href="#" className="flex items-center gap-3">
          <Image src="/assets/logo.jpg" alt="SGSITS MUN" width={40} height={40} className="rounded-full" />
          <span className="font-display text-lg font-semibold tracking-wide">SGSITS MUN</span>
        </a>

        <button
          className="lg:hidden flex flex-col gap-1.5"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-6 h-0.5 bg-cream" />
          <span className="w-6 h-0.5 bg-cream" />
          <span className="w-6 h-0.5 bg-cream" />
        </button>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          <a href="#about" className="hover:text-cream/70">Our Story</a>

          {Object.entries(dropdowns).map(([label, items]) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => setOpenDrop(label)}
              onMouseLeave={() => setOpenDrop(null)}
            >
              <button className="flex items-center gap-1 hover:text-cream/70">
                {label.toUpperCase()} <span className="text-xs">▾</span>
              </button>
              {openDrop === label && (
                <div className="absolute top-full left-0 mt-2 bg-cream text-navy rounded-lg shadow-lg py-2 min-w-[180px]">
                  {items.map((it) => (
                    <a key={it.label} href={it.href} className="block px-4 py-2 text-sm hover:bg-navy/5">
                      {it.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a href="#partners" className="hover:text-cream/70">Partners</a>
          <a href="#contact" className="hover:text-cream/70">Commitment</a>

          <a
            href="#register"
            className="border border-cream/50 px-5 py-2 rounded-full font-semibold hover:bg-cream hover:text-navy transition"
          >
            Apply Now
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden flex flex-col gap-3 px-6 pb-6 text-sm">
          <a href="#about">Our Story</a>
          <a href="#committees">Committees</a>
          <a href="#secretariat">Secretariat</a>
          <a href="#partners">Partners</a>
          <a href="#contact">Commitment</a>
          <a href="#register" className="border border-cream/50 px-5 py-2 rounded-full text-center font-semibold">
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}
