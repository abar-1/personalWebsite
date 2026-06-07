"use client";

import { useEffect, useRef } from "react";

export default function NeuralNetworkSVG({ className = "", style = {} }) {
  const svgRef = useRef(null);
  const drawnRef = useRef(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = svg.querySelectorAll("path, circle, line");

    paths.forEach((el) => {
      try {
        const len = el.getTotalLength ? el.getTotalLength() : 200;
        el.style.strokeDasharray = `${len}`;
        el.style.strokeDashoffset = prefersReduced ? "0" : `${len}`;
        if (!prefersReduced) {
          el.style.transition = "stroke-dashoffset 1.6s cubic-bezier(0.23, 1, 0.32, 1)";
        }
      } catch {
        // element doesn't support getTotalLength
      }
    });

    if (prefersReduced) {
      drawnRef.current = true;
      return;
    }

    const onScroll = () => {
      if (drawnRef.current) return;
      const rect = svg.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.85;
      if (inView) {
        drawnRef.current = true;
        paths.forEach((el, i) => {
          setTimeout(() => {
            el.style.strokeDashoffset = "0";
          }, i * 120);
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="40" cy="50" r="7" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
      <circle cx="40" cy="100" r="7" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
      <circle cx="40" cy="150" r="7" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5" />
      <circle cx="130" cy="35" r="7" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <circle cx="130" cy="80" r="7" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <circle cx="130" cy="125" r="7" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <circle cx="130" cy="165" r="7" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <circle cx="210" cy="60" r="7" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
      <circle cx="210" cy="100" r="7" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
      <circle cx="210" cy="140" r="7" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
      <circle cx="290" cy="100" r="9" stroke="rgba(139,92,246,0.7)" strokeWidth="1.5" />
      <path d="M47 50 L123 35" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <path d="M47 50 L123 80" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <path d="M47 50 L123 125" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <path d="M47 100 L123 35" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <path d="M47 100 L123 80" stroke="rgba(139,92,246,0.30)" strokeWidth="1" />
      <path d="M47 100 L123 125" stroke="rgba(139,92,246,0.30)" strokeWidth="1" />
      <path d="M47 100 L123 165" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <path d="M47 150 L123 80" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <path d="M47 150 L123 125" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <path d="M47 150 L123 165" stroke="rgba(139,92,246,0.30)" strokeWidth="1" />
      <path d="M137 35 L203 60" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <path d="M137 35 L203 100" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <path d="M137 80 L203 60" stroke="rgba(139,92,246,0.30)" strokeWidth="1" />
      <path d="M137 80 L203 100" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <path d="M137 125 L203 100" stroke="rgba(139,92,246,0.30)" strokeWidth="1" />
      <path d="M137 125 L203 140" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <path d="M137 165 L203 100" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
      <path d="M137 165 L203 140" stroke="rgba(139,92,246,0.30)" strokeWidth="1" />
      <path d="M217 60 L281 100" stroke="rgba(139,92,246,0.40)" strokeWidth="1.2" />
      <path d="M217 100 L281 100" stroke="rgba(139,92,246,0.50)" strokeWidth="1.2" />
      <path d="M217 140 L281 100" stroke="rgba(139,92,246,0.40)" strokeWidth="1.2" />
      <circle cx="88" cy="67" r="2" fill="rgba(139,92,246,0.6)" />
      <circle cx="170" cy="90" r="2" fill="rgba(139,92,246,0.5)" />
      <circle cx="250" cy="100" r="2.5" fill="rgba(139,92,246,0.7)" />
    </svg>
  );
}
