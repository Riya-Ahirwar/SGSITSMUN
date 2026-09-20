"use client";

import Image from "next/image";

const IMAGES = [
  { src: "/assets/gallery-1.jpg", alt: "SGSITS Campus" },
  { src: "/assets/gallery-2.jpg", alt: "MUN Committee Session" },
  { src: "/assets/gallery-3.jpg", alt: "Faculty and Students" },
  { src: "/assets/gallery-4.jpg", alt: "MUN Celebration" },
];

// 3 copies for seamless looping
const LOOP_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES];

export default function HeroImageCarousel() {
  return (
    <>
      <style jsx>{`
        @keyframes hero-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-400vw);
          }
        }

        .hero-carousel-track {
          display: flex;
          width: max-content;
          height: 100%;
          animation: hero-scroll 32s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div className="hero-carousel-track">
          {LOOP_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="relative h-full flex-shrink-0"
              style={{ width: "100vw" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={idx < 4}
              />

              <div className="absolute inset-0 bg-[#040e24]/30" />
            </div>
          ))}
        </div>

        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040e24] to-transparent" />

        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040e24] to-transparent" />
      </div>
    </>
  );
}
