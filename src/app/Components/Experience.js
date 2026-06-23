"use client";

import { Building2 } from "lucide-react";
import Reveal from "./Reveal";
import BorderGlow from "./BorderGlow";
import { emphasizeMetrics } from "./emphasize";

const experiences = [
  {
    company: "Purdue Daniel's School of Business",
    title: "Incoming Marketing Data Science Intern",
    date: "Fall 2026",
    location: "West Lafayette, IN",
    bulletPoints: [],
    placeholder: true,
    tags: ["Marketing", "Data Science"],
  },
  {
    company: "Flexco",
    title: "IT Intern",
    date: "Summer 2026",
    bulletPoints: ["Working on RPA projects, LLM Optimization (QLoRA), and Data Analytics."],
    tags: ["QLoRA", "RPA", "Data Analytics"],
  },
  
  {
    company: "Purdue Instructional Innovations",
    title: "Software Engineering Intern",
    date: "Dec 2025 — May 2026",
    location: "West Lafayette, IN",
    metrics: [{ value: "3,000+", label: "Students served" }],
    bulletPoints: [
      "Engineered an asynchronous configuration service in C#/.NET allowing users to toggle between bulk and sequential data loading for group assessments; designed EF Core migrations and domain models to reduce API payload sizes and optimize database query efficiency.",
      "Developed reusable frontend components with React.js for a learning management system used by 3000+ Purdue students.",
      "Employed Azurite and SQL LocalDB for local testing and developing, simulating production services, and to optimize integration.",
      "Participated in weekly standups to discuss progress and challenges with the team.",
    ],
    tags: ["C#", ".NET", "EF Core", "React", "SQL"],
  },
  {
    company: "Illinois Institute of Technology",
    title: "Machine Learning Research Intern",
    date: "Aug 2024 — October 2025",
    location: "Chicago, IL",
    metrics: [{ value: "91.4%", label: "Model accuracy" }],
    bulletPoints: [
      "Led the digitalization of 16 Quadrature Amplitude Modulation (QAM) modulation and demodulation with Python that might replace QAM hardware in devices.",
      "Built a decision tree and random forest model capable of decoding 16 QAM signals with Gaussian and impulse noise with a 91.4% accuracy.",
      "Presenting at IITs Real-Time Communications Conference in October 2025.",
    ],
    tags: ["Python", "scikit-learn", "Random Forest", "Signal Processing"],
  },
  {
    company: "KLoBot",
    title: "Software Development Intern",
    date: "Summer 2025",
    metrics: [
      { value: "~30%", label: "Faster lookup" },
      { value: "200+", label: "Firm employees" },
    ],
    bulletPoints: [
      "Collaborated with a dev team of 20+ backend and frontend engineers to update Sharepoint services for law firms.",
      "Integrated an AI-powered Natural Language Processing engine into SharePoint services to deliver suggested search results for attorneys by specialization, reducing lawyer lookup time by ~30% for 200+ firm employees.",
      "Completed training courses in React.js, ASP.NET core, Microsoft Azure, Generative AI, and C#.",
    ],
    tags: ["React", "ASP.NET", "Azure", "NLP", "C#"],
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

export default function Experience() {
  return (
    <Reveal className="exp-timeline" stagger>
      {experiences.map((exp) => {
        const hasBullets = !exp.placeholder && exp.bulletPoints.some((b) => b.trim());
        return (
          <div className="reveal exp-item" key={`${exp.company}-${exp.title}`}>
            <span className="exp-node" aria-hidden="true" />
            <BorderGlow className="glow-card exp-card" {...GLOW}>
              <div className="card-inner exp-inner">
                <div className="exp-head">
                  <div className="exp-head-main">
                    <span className="exp-icon" aria-hidden="true">
                      <Building2 size={20} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="entry-role">{exp.title}</h3>
                      <p className="entry-org">{exp.company}</p>
                    </div>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-dates">{exp.date}</span>
                    {exp.location && <span className="exp-loc">{exp.location}</span>}
                  </div>
                </div>

                
              
                <div className="exp-divider" />

                {hasBullets ? (
                  <ul className="entry-bullets">
                    {exp.bulletPoints
                      .filter((b) => b.trim())
                      .map((point, j) => (
                        <li key={j}>{emphasizeMetrics(point)}</li>
                      ))}
                  </ul>
                ) : (
                  <p className="entry-muted">Details coming soon.</p>
                )}

                {exp.tags?.length > 0 && (
                  <div className="tag-row tag-row--links">
                    {exp.tags.map((t) => (
                      <span key={t} className="tag-link">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </BorderGlow>
          </div>
        );
      })}
    </Reveal>
  );
}
