"use client";

import { useState } from "react";

const publications = [
  {
    title:
      "Machine Learning Approaches for QAM-16 Demodulation: Evaluating Decision Trees and Random Forests as Hardware Alternatives",
    authors: "Bargaje, Stillman, Vijay, Ghosh, Kinney, Davids, Gurbani",
    venue: "IIT's Real-Time Communications Conference",
    date: "October 2025",
    description:
      "Conference paper discussing machine learning emulations for hardware QAM demodulation. Demonstrated that decision tree and random forest models can decode 16 QAM signals with 91.4% accuracy, potentially replacing dedicated hardware.",
  },
];

export default function Publications() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="publications" style={{ padding: "2rem 0 4rem 0" }} aria-label="Publications">
      <div className="container">
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            marginBottom: expanded ? "1.25rem" : 0,
          }}
          aria-expanded={expanded}
          type="button"
        >
          <span className="section-label" style={{ margin: 0 }}>
            Publications
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            style={{
              color: "var(--text-muted)",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          >
            <path
              d="M3 5l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 400 }}>
            {publications.length} paper{publications.length !== 1 ? "s" : ""}
          </span>
        </button>

        {expanded && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              animation: "fadeIn 0.3s ease",
            }}
          >
            {publications.map((pub) => (
              <div key={pub.title} className="pub-card">
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                    margin: "0 0 0.375rem 0",
                  }}
                >
                  {pub.title}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", margin: "0 0 0.25rem 0" }}>
                  {pub.authors}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--accent)", margin: "0 0 0.625rem 0" }}>
                  {pub.venue} · {pub.date}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {pub.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
