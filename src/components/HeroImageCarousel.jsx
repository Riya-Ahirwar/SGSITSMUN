"use client";

import Image from "next/image";

const IMAGES = [
  { src: "/assets/gallery-1.jpg", alt: "SGSITS Campus" },
  { src: "/assets/gallery-2.jpg", alt: "MUN Committee Session" },
  { src: "/assets/gallery-3.jpg", alt: "Faculty and Students" },
  { src: "/assets/gallery-4.jpg", alt: "MUN Celebration" },
];

// Duplicate for seamless infinite loop
const LOOP_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES];

export default function HeroImageCarousel() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: -15 }}
      aria-hidden="true"
    >
      {/* Scrolling strip — each image is exactly 100vw wide */}
      <div className="hero-carousel-track flex items-stretch h-full">
        {LOOP_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 h-full"
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
            {/* Subtle dark tint so image blends with navy theme */}
            <div className="absolute inset-0 bg-[#040e24]/30" />
          </div>
        ))}
      </div>

      {/* Soft gradient edges to blend into the background */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#040e24] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#040e24] to-transparent" />
    </div>
  );
}
