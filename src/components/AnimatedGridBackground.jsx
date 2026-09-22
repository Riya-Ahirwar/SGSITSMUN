"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const TILE_SIZE = 60; // 60px grid tiles

// Only while a tile tweens; on all 576 statically it made every style recalc expensive.
const WILL_CHANGE = "transform, box-shadow, background-color, border-color";
const promote = (el) => { if (el) el.style.willChange = WILL_CHANGE; };
const demote = (el) => { if (el) el.style.willChange = "auto"; };

export default function AnimatedGridBackground() {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const hoverIndexRef = useRef(-1);
    const activeNeighborsRef = useRef([]);

    // Track hero container dimensions dynamically
    useEffect(() => {
        const updateSize = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const width = rect.width || window.innerWidth;
            const height = rect.height || window.innerHeight;

            // Same numbers must return the same object or every no-op resize rebuilds the grid.
            setDimensions((prev) =>
                prev.width === width && prev.height === height ? prev : { width, height }
            );
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
        const container = containerRef.current;
        if (!container || totalTiles === 0 || !dimensions.width || !dimensions.height) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const tiles = gsap.utils.toArray(".anim-tile", container);
        if (!tiles.length) return;

        let isKilled = false;
        let isOnScreen = true;

        // -----------------------------
        // SUBTLE DARK AMBIENT PULSE ANIMATION
        // -----------------------------
        const animateRandomTile = () => {
            if (isKilled || prefersReducedMotion) return;

            const randomIndex = Math.floor(Math.random() * totalTiles);
            const tile = tiles[randomIndex];

            if (
                isOnScreen &&
                randomIndex !== hoverIndexRef.current &&
                !activeNeighborsRef.current.includes(randomIndex) &&
                tile
            ) {
                promote(tile);
                gsap.to(tile, {
                    duration: 2.2,
                    backgroundColor: "rgba(30, 65, 120, 0.12)",
                    borderColor: "rgba(50, 95, 170, 0.18)",
                    boxShadow: "0 0 8px rgba(30, 65, 120, 0.15)",
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        demote(tile);
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
                const tile = tiles[index];
                gsap.killTweensOf(tile);
                gsap.to(tile, {
                    duration,
                    backgroundColor: "transparent",
                    borderColor: "rgba(35, 65, 125, 0.07)",
                    boxShadow: "none",
                    scale: 1,
                    ease: "power2.out",
                    zIndex: 1,
                    onComplete: () => demote(tile)
                });
            }
        };

        // -----------------------------
        // MOUSE HOVER TRACKING (DARK & SUBTLE)
        // -----------------------------
        // Container is pointer-events-none, so the listener has to live on window.
        let rect = null;
        let rectIsStale = true;
        let frameId = 0;
        let pointerX = 0;
        let pointerY = 0;

        const invalidateRect = () => { rectIsStale = true; };

        const applyPointer = () => {
            frameId = 0;
            if (!isOnScreen) return;

            // Deferred: a scroll costs no layout, a sweep costs one read per frame.
            if (rectIsStale) {
                rect = container.getBoundingClientRect();
                rectIsStale = false;
            }

            const x = pointerX - rect.left;
            const y = pointerY - rect.top;

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
                    promote(tiles[currentIndex]);
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
                        promote(tiles[nIdx]);
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

        const handleMouseMove = (e) => {
            if (!isOnScreen) return;
            pointerX = e.clientX;
            pointerY = e.clientY;
            if (!frameId) frameId = requestAnimationFrame(applyPointer);
        };

        const handleMouseLeave = () => {
            if (hoverIndexRef.current !== -1) {
                resetTile(hoverIndexRef.current, 0.7);
                hoverIndexRef.current = -1;
            }
            activeNeighborsRef.current.forEach((nIdx) => resetTile(nIdx, 0.7));
            activeNeighborsRef.current = [];
        };

        const observer = new IntersectionObserver(([entry]) => {
            isOnScreen = entry.isIntersecting;
            invalidateRect();
            if (!isOnScreen) handleMouseLeave();
        });
        observer.observe(container);

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("scroll", invalidateRect, { passive: true });
        window.addEventListener("resize", invalidateRect);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            isKilled = true;
            if (frameId) cancelAnimationFrame(frameId);
            observer.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", invalidateRect);
            window.removeEventListener("resize", invalidateRect);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            tiles.forEach((t) => gsap.killTweensOf(t));
        };
    }, [totalTiles, cols, rows, dimensions.width, dimensions.height]);

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
                // No transition-colors: GSAP writes these inline every frame and the two fight.
                <div
                    key={i}
                    className="anim-tile w-full h-full border border-[rgba(35,65,125,0.07)] origin-center box-border"
                    style={{
                        backgroundColor: "transparent",
                        zIndex: 1,
                    }}
                />
            ))}
        </div>
    );
}
