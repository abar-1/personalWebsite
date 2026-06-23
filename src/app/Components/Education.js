"use client";

import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import BorderGlow from "./BorderGlow";

const schools = [
  {
    name: "Purdue University",
    gradYear: "2029",
    type: "BS",
    major: "Data Science + Computer Science",
    location: "West Lafayette, IN",
    relevantCourses: [
      "Multivariate Calculus",
      "Java Programming",
      "Linear Algebra",
      "Discrete Mathematics",
      "Statistics in Data Science",
    ],
  },
  {
    name: "Illinois Mathematics and Science Academy",
    gradYear: "2025",
    type: "High School",
    major: "Focus in Computer Science",
    location: "Aurora, IL",
    relevantCourses: [
      "Object Oriented Programming (Java)",
      "Advanced Programming (Java)",
      "CS Seminar: Machine Learning",
      "CS Seminar: Cybersecurity & Linux",
      "Calculus I & II",
      "Physics: Calculus-Based Mechanics",
    ],
  },
];

const GLOW = {
  glowColor: "228 100 72",
  backgroundColor: "#1a1a1f",
  colors: ["#2347d9", "#6e8bff", "#aab8ff"],
  borderRadius: 16,
  glowRadius: 34,
  coneSpread: 24,
  edgeSensitivity: 34,
  glowIntensity: 0.9,
  fillOpacity: 0.35,
};

export default function Education() {
  return (
    <Reveal className="card-grid" stagger>
      {schools.map((schl) => (
        <div className="reveal card-wrap" key={schl.name}>
          <BorderGlow className="glow-card" {...GLOW}>
            <div className="card-inner edu-inner">
              <div className="edu-head">
                <span className="exp-icon" aria-hidden="true">
                  <GraduationCap size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="edu-name">{schl.name}</h3>
                  <p className="entry-org">
                    {schl.type} · {schl.major}
                  </p>
                </div>
              </div>
              <p className="edu-meta">
                Class of {schl.gradYear} · {schl.location}
              </p>
              <div className="tag-row tag-row--links">
                {schl.relevantCourses.map((c) => (
                  <span key={c} className="tag-link">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      ))}
    </Reveal>
  );
}
