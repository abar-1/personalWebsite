"use client";
import { useState, useEffect } from 'react';

import './selector.css';
import Experience from './Experience';
import Education from './Education';


export default function Selector() {
    const [selected, setSelected] = useState("experience");

    const handleClick = (newVal) => {
        if(selected === newVal) {
            return
        }else {
            setSelected(newVal);
        }
        
    }

    useEffect(() => {
        console.log(selected);
    },[selected])
  return (
    
    <div className="container1">
        <div className="optionButtons">
            <button className={selected === 'experience' ? "selection active1" : "selection"} onClick={() => handleClick("experience")}>
                Experience
            </button>
            <button className={selected === 'education' ? "selection active1" : "selection"} onClick={() => handleClick("education")}>
                Education
            </button>
        </div>
        <div className="content">
            {selected === "experience" ? (
                <Experience />
            ) : 
            (
                <Education />
            )}
        </div>
    </div>
  )
}
