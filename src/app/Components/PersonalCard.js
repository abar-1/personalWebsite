"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import NeuralNetworkSVG from "./NeuralNetworkSVG";
import profile from "../assets/IMG_3352.png";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aneesh-bargaje-a345b7269/" },
  { label: "GitHub", href: "https://github.com/abar-1" },
  { label: "Email", href: "mailto:abargaje@purdue.edu" },
];

const meta = [
  "Data Science + Computer Science @ Purdue '29",
  "IT Intern @ Flexco",
  "Chicago, IL",
];

export default function PersonalCard() {
  const contentRef = useRef(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition =
      "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)";

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);

    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div className="hero-mesh" aria-hidden="true" />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          right: "2%",
          width: "min(380px, 45vw)",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      >
        <NeuralNetworkSVG style={{ width: "100%", height: "auto" }} />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{ position: "relative", zIndex: 1, paddingTop: "6rem", paddingBottom: "6rem" }}
      >
        <div ref={contentRef}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "2px solid rgba(139,92,246,0.35)",
                boxShadow: "0 0 24px rgba(139,92,246,0.25)",
              }}
            >
              <Image
                src={profile}
                alt="Aneesh Bargaje"
                width={72}
                height={72}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Aneesh Bargaje
            </h1>
          </div>

          <p
            style={{
              fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: "520px",
              marginBottom: "1.5rem",
            }}
          >
            Software engineer and data scientist interested in building systems that turn
            data into business decisions — from forecasting to applied ML.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
              marginBottom: "1.5rem",
            }}
          >
            {meta.map((line) => (
              <span
                key={line}
                style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.5 }}
              >
                {line}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
              alignItems: "center",
            }}
          >
            {links.map((link, i) => (
              <span key={link.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {i > 0 && (
                  <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>·</span>
                )}
                <a
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  {link.label}
                </a>
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
            <a href="#experience" className="anchor-chip">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 4h8M2 7h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Experience
            </a>
            <a href="#projects" className="anchor-chip">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1.5" y="2" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 5.5h4M4 7.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Projects
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.375rem",
          opacity: 0.4,
        }}
      >
        <span
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
