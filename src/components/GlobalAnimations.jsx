"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlobalAnimations() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const grids = gsap.utils.toArray(".grid");
        grids.forEach((grid) => {
            const items = grid.querySelectorAll(".grid-item");
            if (items.length > 0) {
                gsap.from(items, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.4,
                    stagger: { amount: 0.6, from: "center" },
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: grid,
                        start: "top 80%",
                    },
                });
            }
        });
    }, []);

    return null;
}
