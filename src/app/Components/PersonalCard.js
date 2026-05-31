"use client";
import React from 'react';
import Image from 'next/image';
import './personalCard.css';

import profile from '../assets/IMG_3352.png';

export default function PersonalCard() {
    return (
        <div className="hero" id="home">
            <div className="hero-photo">
                <Image
                    src={profile}
                    alt="Aneesh Bargaje"
                    width={120}
                    height={120}
                    priority
                />
            </div>
            <div className="hero-content">
                <h1 className="hero-name">Aneesh Bargaje</h1>
                <p className="hero-tagline">
                    Software engineer and data scientist interested in building systems
                    that turn data into business decisions — from forecasting to applied ML.
                </p>
                <ul className="hero-meta">
                    <li>Data Science + Computer Science @ Purdue &apos;29</li>
                    <li>Software Development Intern @ KLoBot</li>
                    <li>ML Research Intern @ Illinois Institute of Technology</li>
                    <li>Chicago, IL</li>
                </ul>
                <div className="hero-links">
                    <a
                        href="https://www.linkedin.com/in/aneesh-bargaje-a345b7269/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                    <span className="hero-links-sep">·</span>
                    <a href="https://github.com/abar-1" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <span className="hero-links-sep">·</span>
                    <a href="mailto:abargaje@purdue.edu">Email</a>
                </div>
            </div>
        </div>
    );
}
