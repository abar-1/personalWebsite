"use client";
import React from 'react';
import './personalCard.css';

export default function PersonalCard() {
    const name = "ANEESH";

    return (
        <div className="container">
            <div className="pfp">
                <img src="https://media.licdn.com/dms/image/v2/D5603AQGMO-97LyMqCw/profile-displayphoto-shrink_400_400/B56ZbuUBUaHUAg-/0/1747754948812?e=1754524800&v=beta&t=7pfDPvrMjidyrBCUzDN_SASE6Yn-3VGGjphtR8qEUOI" alt="profile pic"></img>
            </div>
            <div>
                <div >
                    <h1>
                        <span className="bold"> Hi</span>, I'm&nbsp;
                        <span className="word">
                            {name.split("").map((letter, index) => (
                                <span key={index} className="char">{letter}</span>
                            ))}
                        </span>
                    </h1>
                </div>
                <p>Incoming freshman @ purdue, ds + cs 💻</p>
                <p>Chicago, IL 📍</p>

                <button href="#contact"> Message</button>
            </div>
        </div>
    );
}
