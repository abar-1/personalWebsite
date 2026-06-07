"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function MiniHeader() {
  const headerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.7;
      if (window.scrollY > heroHeight) {
        header.classList.add("visible");
      } else {
        header.classList.remove("visible");
      }
    };

    const sections = document.querySelectorAll("section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((s) => sectionObserver.observe(s));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <header ref={headerRef} className="mini-header" role="banner">
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
            Aneesh Bargaje
          </span>
          <span
            className="role-label"
            style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
          >
            DS / ML · SWE
          </span>
        </div>

        <nav aria-label="Section navigation">
          <ul
            style={{
              display: "flex",
              gap: "0.25rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      padding: "0.25rem 0.625rem",
                      borderRadius: "0.375rem",
                      textDecoration: "none",
                      color: isActive ? "#a78bfa" : "var(--text-muted)",
                      background: isActive ? "rgba(139, 92, 246, 0.1)" : "transparent",
                      transition: "color 0.2s ease, background 0.2s ease",
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
