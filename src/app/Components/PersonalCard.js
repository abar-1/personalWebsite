"use client";
import React from 'react';
import Image from 'next/image';
import './personalCard.css';

import profile from '../assets/IMG_3352.png';

export default function PersonalCard() {
    const name = "ANEESH";

    console.log('PROFILE:', profile);

    return (
        <div className="container" id="home">
            <div className="pfp">
                <Image
                    src={profile}
                    alt="profile pic"
                    className="your-classname"
                    width={300}
                    height={400}
                    priority // (optional: load early)
                />

            </div>
            <div>
                <div>
                    <h1>
                        <span className="bold"> Hi</span>, I&apos;m&nbsp;
                        <span className="word">
                            {name.split("").map((letter, index) => (
                                <span key={index} className="char">{letter}</span>
                            ))}
                        </span>
                    </h1>
                </div>
                <p>ds + cs @ purdue 📚</p>
                <p> afrotc cadet, aspiring space force officer 🎖️ </p>
                <p>software development intern @ KLoBot, research intern @ iit 🏢</p>
                <p> interested in cyber and ml 💻</p>
                <p>chicago 📍</p>
                <div className="socials">
                    <a href="https://www.linkedin.com/in/aneesh-bargaje-a345b7269/" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" alt="linkedin" />
                    </a>
                    ·
                    <a href="https://github.com/abar-1" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=FFFFFF" alt="github" />
                    </a>
                    ·
                    <a href="https://www.instagram.com/b._aneesh/?next=%2F" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="instagram" />
                    </a>
                    · <a href="mailto:abargaje@purdue.edu">abargaje [at] purdue [dot] edu</a>
                </div>

                
            </div>
        </div>
    );
}
