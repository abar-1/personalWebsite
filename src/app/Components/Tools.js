"use client";

import Image from "next/image";
import Reveal from "./Reveal";

import pythonLogo from "../assets/python.png";
import javaLogo from "../assets/java.png";
import cppLogo from "../assets/c++.png";
import sqlLogo from "../assets/postgresql.png";
import jsLogo from "../assets/javascript.png";
import tfLogo from "../assets/tensorflow.png";
import pandasLogo from "../assets/pandas.png";
import numpyLogo from "../assets/numpy.png";
import reactLogo from "../assets/react.png";
import nextLogo from "../assets/next_js.png";
import flaskLogo from "../assets/flask.png";
import dotnetLogo from "../assets/DotNet.png";
import gitLogo from "../assets/git.png";
import firebaseLogo from "../assets/firebase.png";

const groups = [
  {
    label: "Languages",
    items: [
      { name: "Python", logo: pythonLogo },
      { name: "Java", logo: javaLogo },
      { name: "C++", logo: cppLogo },
      { name: "SQL", logo: sqlLogo },
      { name: "JavaScript", logo: jsLogo },
    ],
  },
  {
    label: "ML & Data",
    items: [
      { name: "TensorFlow", logo: tfLogo },
      { name: "pandas", logo: pandasLogo },
      { name: "NumPy", logo: numpyLogo },
    ],
  },
  {
    label: "Web",
    items: [
      { name: "React", logo: reactLogo },
      { name: "Next.js", logo: nextLogo },
      { name: "Flask", logo: flaskLogo },
      { name: ".NET", logo: dotnetLogo },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git", logo: gitLogo },
      { name: "Firebase", logo: firebaseLogo },
      { name: "PostgreSQL", logo: sqlLogo },
    ],
  },
];

export default function Tools() {
  return (
    <Reveal className="skills-grid">
      {groups.map((group) => (
        <div key={group.label} className="skill-group">
          <p className="skill-group-label">{group.label}</p>
          <div className="skill-pills">
            {group.items.map((item) => (
              <span key={item.name} className="skill-pill">
                <Image src={item.logo} alt="" width={18} height={18} aria-hidden="true" />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </Reveal>
  );
}
