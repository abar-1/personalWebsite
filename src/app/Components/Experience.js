"use client";

import Reveal from "./Reveal";
import { emphasizeMetrics } from "./emphasize";

const experiences = [
  {
    company: "Illinois Institute of Technology",
    title: "Machine Learning Research Intern",
    date: "Aug 2024 — Present",
    bulletPoints: [
      "Led the digitalization of 16 Quadrature Amplitude Modulation (QAM) modulation and demodulation with Python that might replace QAM hardware in devices.",
      "Built a decision tree and random forest model capable of decoding 16 QAM signals with Gaussian and impulse noise with a 91.4% accuracy.",
      "Presenting at IITs Real-Time Communications Conference in October 2025.",
    ],
  },
  {
    company: "Purdue Instructional Innovations",
    title: "Software Engineering Intern",
    date: "Dec 2025 — May 2026",
    bulletPoints: [
      "Engineered an asynchronous configuration service in C#/.NET allowing users to toggle between bulk and sequential data loading for group assessments; designed EF Core migrations and domain models to reduce API payload sizes and optimize database query efficiency.",
      "Developed reusable frontend components with React.js for a learning management system used by 3000+ Purdue students.",
      "Employed Azurite and SQL LocalDB for local testing and developing, simulating production services, and to optimize integration.",
      "Participated in weekly standups to discuss progress and challenges with the team.",
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
    company: "Flexco",
    title: "IT Intern",
    date: "Summer 2026",
    bulletPoints: ["Working on RPA projects, LLM Optimization (QLoRA), and Data Analytics."],
  },
  {
    company: "Purdue Daniel's School of Business",
    title: "Incoming Marketing Data Science Intern",
    date: "Fall 2026",
    bulletPoints: [],
    placeholder: true,
  },
];

export default function Experience() {
  return (
    <Reveal className="entry-list" stagger>
      {experiences.map((exp) => {
        const hasBullets =
          !exp.placeholder && exp.bulletPoints.some((b) => b.trim());
        return (
          <div className="entry reveal" key={`${exp.company}-${exp.title}`}>
            <div className="entry-date">{exp.date}</div>
            <div>
              <h3 className="entry-role">{exp.title}</h3>
              <p className="entry-org">{exp.company}</p>
              {hasBullets ? (
                <ul className="entry-bullets">
                  {exp.bulletPoints
                    .filter((b) => b.trim())
                    .map((point, i) => (
                      <li key={i}>{emphasizeMetrics(point)}</li>
                    ))}
                </ul>
              ) : (
                <p className="entry-muted">Details coming soon.</p>
              )}
            </div>
          </div>
        );
      })}
    </Reveal>
  );
}
