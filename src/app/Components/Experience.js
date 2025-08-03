import React from "react";
import "./Experience.css";

const Experience = () => {
  const experiences = [
    {
      company: "KLoBot",
      title: "Software Development Intern",
      date: "Summer 2025",
      bulletPoints: ["Working with the dev team to help migrate and update Sharepoint services for various law firms. ",
        "Completed training courses in React.js, .NET core, Python, Microsoft Azure, Generative AI, and C#. "
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
    {
      company: "Code Ninjas",
      title: "Coding Sensei/Manager",
      date: "Summers of 2023 and 2024",
      bulletPoints: [
        "Helped 20-30 students to  develop problem-solving and software development skills. Topics ranged from block coding to scripting in Java and Python, often in a one-on-one setting. ",
        "In my second summer, I managed the Elmhurst team of 6+ employees.",
        "Assisted in planning schedule for school year and summer camps.",
      ],
    },
    {
      company: "Illinois State Treasurers Office",
      title: "Cybersecurity Intern",
      date: "September 2023 - April 2024",
      bulletPoints: [
        "Organized monthly vulnerability scans in partnership with the Cybersecurity and Infrastructure Security Agency (CISA), identifying and documenting 4 vulnerabilities in various public-facing domains.",
        "Investigated applications of machine learning for detecting fraudulent claims in Illinois Unclaimed Property program, laying groundwork for potential automation and anomaly detection models."
      ]
    }
  ];

  return (
    <div>
        <h1 className="heading">Experience</h1>
        <section className="experience-section" id="experience">
        {experiences.map((exp, idx) => (
            <div key={idx} className="experience-card">
            <div className="experience-header">
                <div>
                <h3 className="experience-title">{exp.title}</h3>
                <p className="experience-company">{exp.company}</p>
                </div>
                <p className="experience-date">{exp.date}</p>
            </div>
            <ul className="experience-bullets">
                {exp.bulletPoints.map((point, i) => (
                <li key={i}>{point}</li>
                ))}
            </ul>
            </div>
        
        ))}
        </section>
    </div>
  );
};

export default Experience;
