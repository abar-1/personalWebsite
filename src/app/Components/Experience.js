"use client";

import { useEffect, useRef } from "react";

const experiences = [
  {
    company: "Purdue Daniel's School of Business",
    title: "Incoming Marketing Data Science Intern",
    date: "Fall 2026",
    bulletPoints:[
      ""
    ],
    placeholder: true
  },
  {
    company: "Flexco",
    title: "IT Intern",
    date: "Summer 2026",
    bulletPoints: ["Working on RPA projects, LLM Optimization (QLoRA), and Data Analytics"],
  },
  {
    company: "Purdue Instructional Innovations",
    title: "Software Engineering Intern",
    date: "Dec 2025 - May 2026",
    bulletPoints: [
      "Engineered an asynchronous configuration service in C#/.NET allowing users to toggle between bulk and sequential data loading for group assessments; designed EF Core migrations and domain models to reduce API payload sizes and optimize database query efficiency.",
      "Developed reusable frontend components with React.js for a learning management system used by 3000+ Purdue students.",
      "Employed Azurite and SQL LocalDB for local testing and developing, simulating production services, and to optimize integration.",
      "Participated in weekly standups to discuss progress and challenges with the team."
    ],
  },
  {
    company: "KLoBot",
    title: "Software Development Intern",
    date: "Summer 2025",
    bulletPoints: [
      "Collaborated with a dev team of 20+ backend and frontend engineers to update Sharepoint services for law firms.",
      "Integrated an AI-powered Natural Language Processing engine into SharePoint services to deliver suggested search results for attorneys by specialization, reducing lawyer lookup time by ~30% for 200+ firm employees.",
      "Completed training courses in React.js, ASP.NET core, Microsoft Azure, Generative AI, and C#.",
    ],
  },
  {
    company: "Illinois Institute of Technology",
    title: "Machine Learning Research Intern",
    date: "August 2024 - Present",
    bulletPoints: [
      "Led the digitalization of 16 Quadrature Amplitude Modulation (QAM) modulation and demodulation with Python that might replace QAM hardware in devices.",
      "Built a decision tree and random forest model capable of decoding 16 QAM signals with Gaussian and impulse noise with a 91.4% accuracy.",
      "Presenting at IITs Real-Time Communications Conference in October 2025.",
    ],
  },
];

export default function Experience() {
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = list.querySelectorAll(".exp-card-anim");

    if (prefersReduced) {
      cards.forEach((c) => {
        c.style.opacity = "1";
        c.style.transform = "none";
      });
      return;
    }

    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(16px)";
      c.style.transition =
        "opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1), transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 90);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={listRef}>
      {experiences.map((exp) => (
        <div key={`${exp.company}-${exp.title}`} className="exp-card exp-card-anim">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "0.25rem",
              marginBottom: "0.25rem",
            }}
          >
            <h3
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              {exp.title}
            </h3>
            <span
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {exp.date}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              margin: "0 0 0.75rem 0",
            }}
          >
            {exp.company}
          </p>

          {exp.placeholder || exp.bulletPoints.length === 0 || exp.bulletPoints.every((b) => !b.trim()) ? (
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", fontStyle: "italic" }}>
              Details coming soon.
            </p>
          ) : (
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.125rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.375rem",
              }}
            >
              {exp.bulletPoints.filter((b) => b.trim()).map((point, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
