"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./BottomNav.css";
import homeIcon from "../assets/home.png";
import toolIcon from "../assets/tools.png";
import projectIcon from "../assets/project.png";
import expIcon from "../assets/exp.png";

const navItems = [
    { name: "Home", icon: homeIcon},
    { name: "Techstack", icon: toolIcon},
    { name: "Experience", icon: expIcon},
    { name: "Projects", icon: projectIcon}

];

const links = [
    "#home",
    "#tools",
    "#experience",
    "#projects"
]

export default function BottomNav() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav">
        {navItems.map((item, index) => (
          <div
            key={item.name}
            className={`nav-button-wrapper ${
              hoveredIndex === index
                ? "hovered"
                : hoveredIndex !== null &&
                  (hoveredIndex === index - 1 || hoveredIndex === index + 1)
                ? "adjacent"
                : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href={links[index]}><Image src={item.icon} alt={item.name} className="nav-icon" /></a>
            <span className="nav-label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}