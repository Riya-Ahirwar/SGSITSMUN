"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const dropdowns = {
  "Delegate Desk": [
    { label: "Committees", href: "/#committees" },
    { label: "Fees & Packages", href: "/fees" },
    { label: "Awards", href: "/awards" },
    { label: "Delegate Conduct", href: "/delegate-conduct" },
  ],
  "Our Leadership": [
    { label: "Secretariat", href: "/#secretariat" },
    { label: "Join the Team", href: "/#register" },
  ],
};

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDrop(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Transparent at top, solid navy on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 text-cream transition-all duration-300 ${
        scrolled ? "bg-navy shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-3">

        <a href="/" className="group flex items-center flex-shrink-0 transition-transform duration-300">
          <div className="relative rounded-full p-0.5 transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(126,184,247,0.5)]">
            <Image
              src="/assets/logo.jpg"
              alt="SGSITS MUN"
              width={56}
              height={56}
              className="rounded-full ring-2 ring-cream/20 group-hover:ring-[#7eb8f7]/70 transition-all duration-300"
            />
          </div>
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1 rounded-md hover:bg-cream/10 transition-colors"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-6 h-0.5 bg-cream" />
          <span className="w-6 h-0.5 bg-cream" />
          <span className="w-6 h-0.5 bg-cream" />
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          <a href="/our-story" className="relative py-1 text-cream/80 hover:text-cream transition-colors duration-200 group">
            Our Story
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7eb8f7] transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
          <a href="/what-is-mun" className="relative py-1 text-cream/80 hover:text-cream transition-colors duration-200 group">
            What is MUN?
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7eb8f7] transition-all duration-300 group-hover:w-full rounded-full" />
          </a>

          {Object.entries(dropdowns).map(([label, items]) => (
            <div key={label} className="relative">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === label ? null : label)}
                className="relative py-1 flex items-center gap-1 text-cream/80 hover:text-cream transition-colors duration-200 group"
              >
                {label}{" "}
                <span className={`text-xs transition-transform duration-300 ${openDrop === label ? "rotate-180 text-[#7eb8f7]" : "group-hover:translate-y-0.5"}`}>
                  ▾
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7eb8f7] transition-all duration-300 group-hover:w-full rounded-full" />
              </button>
              {openDrop === label && (
                <div className="absolute top-full left-0 pt-2 w-[180px] animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="bg-cream text-navy rounded-lg shadow-xl py-2 border border-navy/10 overflow-hidden">
                    {items.map((it) => (
                      <a
                        key={it.label}
                        href={it.href}
                        className="block px-4 py-2 text-sm font-semibold hover:bg-navy/10 hover:text-[#082052] hover:translate-x-1 transition-all duration-150"
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <a href="/past-editions" className="relative py-1 text-cream/80 hover:text-cream transition-colors duration-200 group">
            Past Editions
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7eb8f7] transition-all duration-300 group-hover:w-full rounded-full" />
          </a>
          <a href="/#contact" className="relative py-1 text-cream/80 hover:text-cream transition-colors duration-200 group">
            Commitment
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7eb8f7] transition-all duration-300 group-hover:w-full rounded-full" />
          </a>

          <a
            href="https://forms.gle/7wArNn3jcDDJgD2j7"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cream/50 px-5 py-2 rounded-full font-semibold hover:bg-cream hover:text-navy hover:shadow-[0_0_20px_rgba(248,240,229,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Register Now
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className={`lg:hidden flex flex-col gap-3 px-6 pb-6 text-sm ${scrolled ? "bg-navy" : "bg-[#040e24]/80 backdrop-blur-sm"}`}>
          <a href="/our-story">Our Story</a>
          <a href="/what-is-mun">What is MUN?</a>
          <a href="/#committees">Committees</a>
          <a href="/#secretariat">Secretariat</a>
          <a href="/fees">Fees & Packages</a>
          <a href="/awards">Awards</a>
          <a href="/delegate-conduct">Delegate Conduct</a>
          <a href="/past-editions">Past Editions</a>
          <a href="/#contact">Commitment</a>
          <a
            href="https://forms.gle/7wArNn3jcDDJgD2j7"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-cream/50 px-5 py-2 rounded-full text-center font-semibold"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
}
