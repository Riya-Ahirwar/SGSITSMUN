"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function AnimatedGridBackground() {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const TILE_SIZE = 60; // 60px grid tiles
    const hoverIndexRef = useRef(-1);
    const activeNeighborsRef = useRef([]);

    // Track hero container dimensions dynamically
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: rect.width || window.innerWidth,
                    height: rect.height || window.innerHeight,
                });
            }
        };

        const observer = new ResizeObserver(updateSize);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        updateSize();
        window.addEventListener("resize", updateSize);
        return () => {
            window.removeEventListener("resize", updateSize);
            observer.disconnect();
        };
    }, []);

    const cols = Math.max(1, Math.ceil(dimensions.width / TILE_SIZE));
    const rows = Math.max(1, Math.ceil(dimensions.height / TILE_SIZE));
    const totalTiles = cols * rows;

    useEffect(() => {
        if (totalTiles === 0 || !dimensions.width || !dimensions.height) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const tiles = gsap.utils.toArray(".anim-tile", containerRef.current);
        if (!tiles.length) return;

        let isKilled = false;

        // -----------------------------
        // SUBTLE DARK AMBIENT PULSE ANIMATION
        // -----------------------------
        const animateRandomTile = () => {
            if (isKilled || prefersReducedMotion) return;

            const randomIndex = Math.floor(Math.random() * totalTiles);
            const tile = tiles[randomIndex];

            if (
                randomIndex !== hoverIndexRef.current &&
                !activeNeighborsRef.current.includes(randomIndex) &&
                tile
            ) {
                gsap.to(tile, {
                    duration: 2.2,
                    backgroundColor: "rgba(30, 65, 120, 0.12)",
                    borderColor: "rgba(50, 95, 170, 0.18)",
                    boxShadow: "0 0 8px rgba(30, 65, 120, 0.15)",
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        if (!isKilled) {
                            gsap.delayedCall(Math.random() * 3 + 2, animateRandomTile);
                        }
                    }
                });
            } else {
                gsap.delayedCall(1.5, animateRandomTile);
            }
        };

        if (!prefersReducedMotion) {
            for (let i = 0; i < 3; i++) {
                gsap.delayedCall(Math.random() * 2 + 0.5, animateRandomTile);
            }
        }

        // Reset tile back to dark subtle base state
        const resetTile = (index, duration = 0.6) => {
            if (index >= 0 && index < totalTiles && tiles[index]) {
                gsap.killTweensOf(tiles[index]);
                gsap.to(tiles[index], {
                    duration,
                    backgroundColor: "transparent",
                    borderColor: "rgba(35, 65, 125, 0.07)",
                    boxShadow: "none",
                    scale: 1,
                    ease: "power2.out",
                    zIndex: 1
                });
            }
        };

        // -----------------------------
        // MOUSE HOVER TRACKING (DARK & SUBTLE)
        // -----------------------------
        const handleMouseMove = (e) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const isOutOfBounds = x < 0 || x > rect.width || y < 0 || y > rect.height;

            let currentIndex = -1;
            if (!isOutOfBounds) {
                const tileWidth = rect.width / cols;
                const tileHeight = rect.height / rows;
                const col = Math.min(cols - 1, Math.max(0, Math.floor(x / tileWidth)));
                const row = Math.min(rows - 1, Math.max(0, Math.floor(y / tileHeight)));

                currentIndex = row * cols + col;
            }

            if (currentIndex !== hoverIndexRef.current) {
                const prevIndex = hoverIndexRef.current;
                const prevNeighbors = activeNeighborsRef.current;

                hoverIndexRef.current = currentIndex;

                // Adjacent neighbor tile indices
                const newNeighbors = [];
                if (currentIndex !== -1) {
                    const c = currentIndex % cols;
                    const r = Math.floor(currentIndex / cols);

                    if (c > 0) newNeighbors.push(r * cols + (c - 1));
                    if (c < cols - 1) newNeighbors.push(r * cols + (c + 1));
                    if (r > 0) newNeighbors.push((r - 1) * cols + c);
                    if (r < rows - 1) newNeighbors.push((r + 1) * cols + c);
                }
                activeNeighborsRef.current = newNeighbors;

                // Reset previous tiles
                if (prevIndex !== -1 && prevIndex !== currentIndex && !newNeighbors.includes(prevIndex)) {
                    resetTile(prevIndex, 0.6);
                }
                prevNeighbors.forEach((nIdx) => {
                    if (nIdx !== currentIndex && !newNeighbors.includes(nIdx)) {
                        resetTile(nIdx, 0.6);
                    }
                });

                // Highlight hovered tile: muted dark blue highlight, soft dark glow
                if (currentIndex !== -1 && currentIndex < totalTiles && tiles[currentIndex]) {
                    gsap.killTweensOf(tiles[currentIndex]);
                    gsap.to(tiles[currentIndex], {
                        duration: prefersReducedMotion ? 0 : 0.15,
                        backgroundColor: "rgba(45, 95, 175, 0.18)",
                        borderColor: "rgba(75, 135, 225, 0.35)",
                        boxShadow: "0 0 16px rgba(45, 95, 175, 0.25), inset 0 0 8px rgba(75, 135, 225, 0.15)",
                        scale: prefersReducedMotion ? 1 : 1.025,
                        ease: "power2.out",
                        zIndex: 10
                    });
                }

                // Highlight neighbors softly
                newNeighbors.forEach((nIdx) => {
                    if (nIdx < totalTiles && tiles[nIdx] && nIdx !== currentIndex) {
                        gsap.killTweensOf(tiles[nIdx]);
                        gsap.to(tiles[nIdx], {
                            duration: prefersReducedMotion ? 0 : 0.25,
                            backgroundColor: "rgba(35, 75, 140, 0.06)",
                            borderColor: "rgba(60, 110, 190, 0.14)",
                            boxShadow: "0 0 6px rgba(35, 75, 140, 0.1)",
                            scale: prefersReducedMotion ? 1 : 1.008,
                            ease: "power2.out",
                            zIndex: 5
                        });
                    }
                });
            }
        };

        const handleMouseLeave = () => {
            if (hoverIndexRef.current !== -1) {
                resetTile(hoverIndexRef.current, 0.7);
                hoverIndexRef.current = -1;
            }
            activeNeighborsRef.current.forEach((nIdx) => resetTile(nIdx, 0.7));
            activeNeighborsRef.current = [];
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            isKilled = true;
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            tiles.forEach((t) => gsap.killTweensOf(t));
        };
    }, [totalTiles, cols, rows, dimensions]);

    if (totalTiles === 0) return null;

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            }}
        >
            {Array.from({ length: totalTiles }).map((_, i) => (
                <div
                    key={i}
                    className="anim-tile w-full h-full border border-[rgba(35,65,125,0.07)] origin-center box-border transition-colors duration-100"
                    style={{
                        willChange: "transform, box-shadow, background-color, border-color",
                        backgroundColor: "transparent",
                        zIndex: 1,
                    }}
                />
            ))}
        </div>
    );
}


