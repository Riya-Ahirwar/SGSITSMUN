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

        <a href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/assets/logo.jpg"
            alt="SGSITS MUN"
            width={56}
            height={56}
            className="rounded-full ring-2 ring-cream/20 shadow-lg"
          />
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="w-6 h-0.5 bg-cream" />
          <span className="w-6 h-0.5 bg-cream" />
          <span className="w-6 h-0.5 bg-cream" />
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide">
          <a href="/our-story" className="hover:text-cream/70 transition-colors">Our Story</a>

          {Object.entries(dropdowns).map(([label, items]) => (
            <div key={label} className="relative">
              <button
                type="button"
                onClick={() => setOpenDrop(openDrop === label ? null : label)}
                className="flex items-center gap-1 hover:text-cream/70 transition-colors"
              >
                {label} <span className="text-xs">▾</span>
              </button>
              {openDrop === label && (
                <div className="absolute top-full left-0 pt-2 w-[180px]">
                  <div className="bg-cream text-navy rounded-lg shadow-lg py-2">
                    {items.map((it) => (
                      <a
                        key={it.label}
                        href={it.href}
                        className="block px-4 py-2 text-sm hover:bg-navy/5"
                      >
                        {it.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <a href="/past-editions" className="hover:text-cream/70 transition-colors">Past Editions</a>
          <a href="/#contact" className="hover:text-cream/70 transition-colors">Commitment</a>

          <a
            href="/#register"
            className="border border-cream/50 px-5 py-2 rounded-full font-semibold hover:bg-cream hover:text-navy transition"
          >
            Apply Now
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className={`lg:hidden flex flex-col gap-3 px-6 pb-6 text-sm ${scrolled ? "bg-navy" : "bg-[#040e24]/80 backdrop-blur-sm"}`}>
          <a href="/our-story">Our Story</a>
          <a href="/#committees">Committees</a>
          <a href="/#secretariat">Secretariat</a>
          <a href="/fees">Fees & Packages</a>
          <a href="/awards">Awards</a>
          <a href="/delegate-conduct">Delegate Conduct</a>
          <a href="/past-editions">Past Editions</a>
          <a href="/#contact">Commitment</a>
          <a href="/#register" className="border border-cream/50 px-5 py-2 rounded-full text-center font-semibold">
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
}
