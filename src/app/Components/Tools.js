"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gitLogo from "../assets/git.png";
import javaLogo from "../assets/java.png";
import cLogo from "../assets/c++.png";
import pythonLogo from "../assets/python.png";
import reactLogo from "../assets/react.png";
import nextLogo from "../assets/next_js.png";
import flaskLogo from "../assets/flask.png";
import sqlLogo from "../assets/postgresql.png";
import tfLogo from "../assets/tensorflow.png";
import dotnetLogo from "../assets/DotNet.png";

const tools = [
  { name: "Python", logo: pythonLogo },
  { name: "Java", logo: javaLogo },
  { name: "C++", logo: cLogo },
  { name: "React", logo: reactLogo },
  { name: "Next.js", logo: nextLogo },
  { name: "SQL", logo: sqlLogo },
  { name: "TensorFlow", logo: tfLogo },
  { name: "Flask", logo: flaskLogo },
  { name: "Git", logo: gitLogo },
  { name: ".NET", logo: dotnetLogo },
];

export default function Tools() {
  const sectionRef = useRef(null);
  const pillsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pills = pillsRef.current;
    if (!section || !pills) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const children = Array.from(pills.children);

    if (prefersReduced) {
      children.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }

    children.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(14px)";
      c.style.transition =
        "opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = "1";
                child.style.transform = "translateY(0)";
              }, i * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tools" ref={sectionRef} style={{ padding: "4rem 0" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
          <p className="section-label" style={{ margin: 0 }}>
            Tools
          </p>
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none" aria-hidden="true" style={{ opacity: 0.35 }}>
            <line x1="0" y1="6" x2="60" y2="6" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="8" cy="6" r="2" fill="var(--accent)" />
            <circle cx="28" cy="6" r="1.5" fill="var(--accent)" opacity="0.7" />
            <circle cx="48" cy="6" r="2" fill="var(--accent)" />
          </svg>
        </div>

        <div
          ref={pillsRef}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}
        >
          {tools.map((tool) => (
            <div key={tool.name} className="tool-pill">
              <Image src={tool.logo} alt="" width={18} height={18} aria-hidden="true" />
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
