import './Education.css';

export default function Education() {
  const schools = [
    {
      name: "Purdue University",
      gradYear: "2029",
      type: "BS",
      major: "Data Science + Computer Science",
      relevantCourses: ["Multivariate Calculus", "Java Programming"]
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
        "Physics: Calculus-Based Mechanics"
      ],
    }
  ]
  
  return (
    <div className="edu-container">
        {schools.map((schl, idx) => (
          <div key={idx} className="school-card">
            <div className="school-content">
              <div className="school-header">
                <div>
                  <h3 className="school-name">{schl.name}</h3>
                  <p className="school-major">{schl.major}, {schl.type}</p>
                  {schl.activities && (
                    <p className="school-activities">{schl.activities}</p>
                  )}
                </div>
                <p className="school-grad-year">{schl.gradYear}</p>
              </div>
              <div className="school-courses">
                <span className="school-courses-label">Relevant courses</span>
                <p>{schl.relevantCourses.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
