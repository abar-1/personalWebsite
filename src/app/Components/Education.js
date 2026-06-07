"use client";

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
    activities: "American Computer Science League, Debate",
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
    <div>
      {schools.map((schl) => (
        <div key={schl.name} className="exp-card">
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
              {schl.major}, {schl.type}
            </h3>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              {schl.gradYear}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              margin: "0 0 0.75rem 0",
            }}
          >
            {schl.name}
          </p>

          {schl.activities && (
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                margin: "0 0 0.75rem 0",
              }}
            >
              {schl.activities}
            </p>
          )}

          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>Relevant courses: </span>
            {schl.relevantCourses.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
}
