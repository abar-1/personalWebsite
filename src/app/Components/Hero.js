"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import profilePic from "../assets/profilePic.png";

const links = [
  { label: "Résumé", href: "/Aneesh_Bargaje_Resume.pdf", external: true },
  { label: "GitHub", href: "https://github.com/abar-1", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aneesh-bargaje-a345b7269/",
    external: true,
  },
  { label: "Email", href: "mailto:abargaje@purdue.edu", external: false },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1];
  const rise = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-main">
          <motion.p className="hero-eyebrow" {...rise(0.05)}>
            DS&middot;ML&nbsp;/&nbsp;Software Engineer
          </motion.p>

          <motion.h1 className="hero-name" {...rise(0.12)}>
            Aneesh Bargaje
          </motion.h1>

          <motion.p className="hero-lede" {...rise(0.22)}>
            Data Science + Computer Science @ Purdue&nbsp;&rsquo;29. I build{" "}
            <strong>ML systems</strong> and the <strong>software</strong> around
            them.
          </motion.p>

          <motion.div className="hero-actions" {...rise(0.38)}>
            <a href="#projects" className="btn btn-primary">
              View work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M7 2.5v9M7 11.5L3.5 8M7 11.5L10.5 8"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="btn btn-ghost"
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.3, ease }}
        >
          <Image
            src={profilePic}
            alt="Aneesh Bargaje"
            className="hero-portrait-img"
            placeholder="blur"
            priority
            sizes="(max-width: 940px) 80vw, 420px"
          />
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 1 : 0.6 }}
        transition={{ delay: reduce ? 0 : 1.1, duration: 1 }}
      >
        <span>Scroll</span>
        <span className="line" />
      </motion.div>
    </section>
  );
}
