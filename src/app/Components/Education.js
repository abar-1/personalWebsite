"use client";

import Reveal from "./Reveal";

const schools = [
  {
    name: "Purdue University",
    gradYear: "2029",
    type: "BS",
    major: "Data Science + Computer Science",
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

export default function Education() {
  return (
    <Reveal className="entry-list" stagger>
      {schools.map((schl) => (
        <div className="entry reveal" key={schl.name}>
          <div className="entry-date">{schl.gradYear}</div>
          <div>
            <h3 className="entry-role">{schl.name}</h3>
            <p className="entry-org">
              {schl.type} · {schl.major}
            </p>
            <p className="entry-courses">
              <span className="lbl">Relevant coursework</span>
              {schl.relevantCourses.join(" · ")}
            </p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
