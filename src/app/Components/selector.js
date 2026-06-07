"use client";

import { useState } from "react";
import Experience from "./Experience";
import Education from "./Education";

export default function Selector() {
  const [selected, setSelected] = useState("experience");

  return (
    <section id="experience" style={{ padding: "4rem 0" }}>
      <div className="container">
        <div
          style={{
            display: "inline-flex",
            gap: "0.25rem",
            padding: "0.25rem",
            background: "var(--bg-elevated)",
            borderRadius: "0.625rem",
            border: "1px solid var(--border)",
            marginBottom: "2rem",
          }}
        >
          <button
            className={`selector-btn${selected === "experience" ? " active" : ""}`}
            onClick={() => setSelected("experience")}
          >
            Experience
          </button>
          <button
            className={`selector-btn${selected === "education" ? " active" : ""}`}
            onClick={() => setSelected("education")}
          >
            Education
          </button>
        </div>

        <div className="selector-content">
          {selected === "experience" ? <Experience /> : <Education />}
        </div>
      </div>
    </section>
  );
}
