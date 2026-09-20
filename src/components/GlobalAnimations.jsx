"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Duration must stay well above the gap or the cards resolve one at a time and stutter.
const CARD_DURATION = 0.65;
const CARD_GAP = 0.08;

export default function GlobalAnimations() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
                    const items = group.querySelectorAll(":scope > [data-reveal]");
                    if (!items.length) return;

                    // from() would bake opacity:0 in as the destination on refresh.
                    gsap.fromTo(
                        items,
                        { y: 24, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: CARD_DURATION,
                            // each, not amount: amount divides by card count and desyncs sections.
                            stagger: { each: CARD_GAP, from: "start" },
                            ease: "power3.out",
                            // No immediateRender:false — it defers hiding to trigger time, so cards pop.
                            scrollTrigger: { trigger: group, start: "top 85%", once: true },
                        }
                    );
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return null;
}
