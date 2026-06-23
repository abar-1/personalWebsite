"use client";

import { useEffect, useState } from "react";
import { Briefcase, FolderGit2, GraduationCap, Layers, Mail, FileText } from "lucide-react";

const navLinks = [
  { label: "Experience", href: "#experience", Icon: Briefcase },
  { label: "Projects", href: "#projects", Icon: FolderGit2 },
  { label: "Education", href: "#education", Icon: GraduationCap },
  { label: "Skills", href: "#skills", Icon: Layers },
  { label: "Contact", href: "#contact", Icon: Mail },
];

const RESUME_HREF = "/Aneesh_Bargaje_Resume.pdf";

export default function TopNav() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id], footer[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`topnav${scrolled ? " scrolled" : ""}`} role="banner">
      <div className="container topnav-inner">
        <a href="#home" className="topnav-mark">
          Aneesh Bargaje
        </a>
        <div className="topnav-right">
          <nav aria-label="Sections">
            <ul className="topnav-links">
              {navLinks.map(({ label, href, Icon }) => {
                const id = href.slice(1);
                const isActive = active === id;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={`topnav-link${isActive ? " active" : ""}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className="topnav-link-icon">
                        <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="topnav-link-label">{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <a
            href={RESUME_HREF}
            className="topnav-resume"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
            Résumé
          </a>
        </div>
      </div>
    </header>
  );
}
