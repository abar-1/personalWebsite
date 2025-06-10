import React from 'react';
import Image from 'next/image';
import "./Projects.css";
import moodMusic from "../assets/moodMusic.png";

const flaskLogo = "https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white";
const reactLogo = "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black";
const tfLogo = "https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white";
const githubLogo = "https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=FFFFFF";
const pythonLogo = "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white";

export default function Projects() {

    
    const projects = [
        {
            title: "MoodMusic",
            image: moodMusic,
            description: [
                "ML-based web app that creates a Spotify playlist based on user mood and genre",
                "Uses a CNN to classify facial expressions from webcam input",
                "Clusters songs by valence and energy using a large Spotify dataset",
                "Maps song clusters to moods via Russell's Circumplex Model",
                "Adds 20 mood-matched tracks to user’s Spotify playlist using Spotify API"
            ],
            techstack: [flaskLogo, reactLogo, tfLogo],
            link: "https://github.com/abar-1/musicSentiment"
        },
        // {
        //     title: "NCAA Game Results Predictions",
        //     description: "Used Python, TensorFlow, and Elo ratings to develop a predictive model for women's NCAA basketball game outcomes. Cleaned and transformed raw game data, engineered performance-based embeddings, and applied StratifiedKFold cross-validation to assess model robustness. Built team rankings via Elo and used a neural network to estimate win probabilities from team stat differentials. Findings informed strategies for team evaluation and game planning.",
        //     techstack: [pythonLogo, tfLogo],
        //     link: "https://github.com/abar-1/WhartonComp"

        // },
        

    ]
    return (
        <div>
            <h1 className="header" id="projects">Projects</h1>
            <section className="projects-section">
                {projects.map((proj, idx) => (
                    <div key={idx} className="project-card">
                        <div className="title">
                            <h1>{proj.title}</h1>
                        </div>
                        <div className="project-image">
                            <Image 
                                src={proj.image} 
                                alt={`Project ${idx} preview`}
                                width={500}
                                height={300}
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                        <div className="project-description">
                            <ul >
                            {proj.description.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>                           

                            ))}
                            </ul>
                        </div>
                        <div className="project-toolsandlink">
                            {proj.techstack.map((logo, i) => (
                                <img 
                                    src={logo} 
                                    key={i} 
                                    alt="Tech Logo"
                                    style={{ height: '25px', margin: '0 5px' }}
                                />
                            ))}
                            <a href={proj.link} target="_blank" rel="noopener noreferrer">
                                <Image 
                                    src={githubLogo} 
                                    alt="Github Logo"
                                    width={30}
                                    height={30}
                                />
                            </a>
                        </div>

                    </div>
                ))}

            </section>
        </div>
    );
}