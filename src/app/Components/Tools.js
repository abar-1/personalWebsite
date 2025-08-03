"use client";
import React from 'react';
import Image from 'next/image';
import './Tools.css'; 

import htmlLogo from "../assets/html.png";
import gitLogo from "../assets/git.png";
import cssLogo from "../assets/css.png";
import tailwindCSSLogo from "../assets/tailwind_css.png";
import jsLogo from "../assets/javascript.png";
import reactLogo from "../assets/react.png";
import nodeLogo from "../assets/node_js.png";
import nextLogo from "../assets/next_js.png";
import viteLogo from "../assets/vite.png";
import javaLogo from "../assets/java.png";
import cLogo from "../assets/c++.png";
import pythonLogo from "../assets/python.png";
import flaskLogo from "../assets/flask.png";
import pandasLogo from "../assets/pandas.png";
import firebaseLogo from '../assets/firebase.png';
import sqlLogo from "../assets/postgresql.png";
import bashLogo from "../assets/bash.png";
import tfLogo from "../assets/tensorflow.png";
import numpyLogo from "../assets/numpy.png";
import dotnetLogo from "../assets/DotNet.png";


const tools = [
  { name: "Java", logo: javaLogo },
  { name: "Vite", logo: viteLogo },
  { name: "HTML", logo: htmlLogo },
  { name: "C++", logo: cLogo },
  { name: "CSS", logo: cssLogo },
  { name: "Bash", logo: bashLogo },
  { name: "Firebase", logo: firebaseLogo},
  { name: "TensorFlow", logo: tfLogo},
  { name: ".NET", logo: dotnetLogo},
  { name: "Tailwind CSS", logo: tailwindCSSLogo},
  { name: "JavaScript", logo: jsLogo },
  { name: "Python", logo: pythonLogo },
  { name: "React", logo: reactLogo },
  { name: "SQL", logo: sqlLogo },
  { name: "NumPy", logo: numpyLogo},
  { name: "Node", logo: nodeLogo },
  { name: "Git", logo: gitLogo },
  { name: "Next.js", logo: nextLogo },
  { name: "Flask", logo: flaskLogo },
  { name: "Pandas", logo: pandasLogo },
];

function ToolSlide({ name, logo }) {
  return (
    <div className="slide" id="tools">
      <div className="slide-inner">
        <Image
          src={logo}
          alt={`${name} logo`}
          className="slide-logo"
          width={80}
          height={80}
          priority
        />
      </div>
      <p className="slide-label">{name}</p>
    </div>
  );
}

export default function Tools() {
  return (
    <div className="tools-container" id="tools">
      <h2 className="tools-title">Tools</h2>
      <div className="carousel-wrapper">
        <div className="gradient-left" />
        <div className="slide-track">
          {[...tools, ...tools].map((tool, index) => (
            <ToolSlide key={`${tool.name}-${index}`} {...tool} />
          ))}
        </div>
        <div className="gradient-right" />
      </div>
    </div>
  );
}
