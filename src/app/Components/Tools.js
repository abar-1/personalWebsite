"use client";
import React from 'react';
import Image from 'next/image';
import './Tools.css';

import gitLogo from "../assets/git.png";
import javaLogo from "../assets/java.png";
import cLogo from "../assets/c++.png";
import pythonLogo from "../assets/python.png";
import reactLogo from "../assets/react.png";
import nextLogo from "../assets/next_js.png";
import flaskLogo from "../assets/flask.png";
import sqlLogo from "../assets/postgresql.png";
import tfLogo from "../assets/tensorflow.png";
import dotnetLogo from "../assets/DotNet.png";

const tools = [
  { name: "Python", logo: pythonLogo },
  { name: "Java", logo: javaLogo },
  { name: "C++", logo: cLogo },
  { name: "React", logo: reactLogo },
  { name: "Next.js", logo: nextLogo },
  { name: "SQL", logo: sqlLogo },
  { name: "TensorFlow", logo: tfLogo },
  { name: "Flask", logo: flaskLogo },
  { name: "Git", logo: gitLogo },
  { name: ".NET", logo: dotnetLogo },
];

export default function Tools() {
  return (
    <section className="section tools-section" id="tools">
      <h2 className="section-title">Tools</h2>
      <div className="tools-grid">
        {tools.map((tool) => (
          <div key={tool.name} className="tool-item">
            <Image
              src={tool.logo}
              alt={`${tool.name} logo`}
              width={28}
              height={28}
            />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
