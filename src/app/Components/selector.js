"use client";
import { useState } from 'react';
import './selector.css';
import Experience from './Experience';
import Education from './Education';

export default function Selector() {
    const [selected, setSelected] = useState("experience");

    const handleClick = (newVal) => {
        if (selected !== newVal) {
            setSelected(newVal);
        }
    };

    return (
        <section className="section selector-section">
            <div className="selector-toggle">
                <button
                    className={`selector-btn ${selected === 'experience' ? 'selector-btn-active' : ''}`}
                    onClick={() => handleClick("experience")}
                >
                    Experience
                </button>
                <button
                    className={`selector-btn ${selected === 'education' ? 'selector-btn-active' : ''}`}
                    onClick={() => handleClick("education")}
                >
                    Education
                </button>
            </div>
            <div className="selector-content">
                {selected === "experience" ? <Experience /> : <Education />}
            </div>
        </section>
    );
}
