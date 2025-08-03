"use client";
import React from 'react';
import './personalCard.css';

export default function PersonalCard() {
    const name = "ANEESH";

    return (
        <div className="container" id="home">
            <div className="pfp">
                <img src="https://media.licdn.com/dms/image/v2/D5603AQGMO-97LyMqCw/profile-displayphoto-shrink_400_400/B56ZbuUBUaHUAg-/0/1747754948812?e=1754524800&v=beta&t=7pfDPvrMjidyrBCUzDN_SASE6Yn-3VGGjphtR8qEUOI" alt="profile pic"></img>
            </div>
            <div>
                <div>
                    <h1>
                        <span className="bold"> Hi</span>, Im&nbsp;
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
