import './Education.css';

export default function Education() {
  const schools = [
    {
      name: "Purdue University",
      gradYear: "2029",
      type: "BS",
      major: "Data Science + Computer Science",
      activities: "AFROTC",
      GPA: "Don't have one yet",
      relevantCourses: ["Multivariate Calculus", "Java Programming"]
    },
    {
      name: "Illinois Mathematics and Science Academy",
      gradYear: "2025",
      type: "High School",
      major: "Focus in Computer Science",
      activities: "American Computer Science League, Debate",
      GPA: "3.8",
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
          <div key={idx} className="schoolCard">

            <div className="school-content">
              <div className="school-header">
                <h2 className="school-name">{schl.name}</h2>
                <h5 className="school-major">{schl.major}, {schl.type}</h5>
                <p className="school-gradYear">{schl.gradYear}</p>
              </div>
              <p className="school-gpa">GPA: {schl.GPA}</p>
              <div className="school-courses">
                <span>Relevant Courses: </span>
                {schl.relevantCourses.map((course, idx) => (
                  <span key={idx} className="course">{course}{idx < schl.relevantCourses.length - 1 ? ', ' : ''}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}