"use client";

import { useEffect, useRef } from "react";

/**
 * Entrance animation: fades + lifts content into place once, on scroll.
 * - Default: animates the wrapper as one block.
 * - stagger: animates each direct child in sequence. Each child must already
 *   carry the `reveal` class in markup so it starts hidden (no flash).
 */
export default function Reveal({ className = "", stagger = false, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = stagger ? Array.from(el.children) : [el];

    if (reduce) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targets.forEach((t, i) => {
              t.style.transitionDelay = `${i * 70}ms`;
              t.classList.add("is-visible");
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={stagger ? className : `reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
