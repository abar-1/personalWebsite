"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import "./Projects.css";
import moodMusic from "../assets/projects/moodMusic.png";
import ecom2 from '../assets/projects/ecom2.png';
import ecom1 from '../assets/projects/ecom1.png';
import ecom3 from '../assets/projects/ecom3.png';
import ecom4 from '../assets/projects/ecom4.png';
import ecom5 from '../assets/projects/ecom5.png';
import Activities from '../assets/projects/Activities.png';
import Landing from '../assets/projects/Landing.png';
import Events from '../assets/projects/Events.png';
import Photos from '../assets/projects/Photos.png';
import Profile from '../assets/projects/Profile.png';
import ActivityDetails from '../assets/projects/ActivityDetails.png';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import react from 'react';

const flaskLogo = "https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white";
const reactLogo = "https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black";
const tfLogo = "https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white";
const githubLogo = "https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=FFFFFF";
const pythonLogo = "https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white";
const nextLogo = "https://img.shields.io/badge/Next.js-black?logo=next.js";
const reduxLogo = "https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux";
const stripeLogo = "https://img.shields.io/badge/StripeAPI-635BFF?style=flat&logo=stripe&logoColor=black";
const firebaseLogo = "https://img.shields.io/badge/Firebase-DD2C00?style=flat&logo=firebase&logoColor=white";
const dotnetLogo ="https://img.shields.io/badge/Asp.NET-512BD4?style-flat&logo=.NET&logoColor=white";
const mobxLogo = "https://img.shields.io/badge/MobX-FF9955?style-flat&logo=MobX&logoColor=white";

export default function Projects() {
    const [fullscreenProject, setFullscreenProject] = useState(null);
    const [fullscreenIndex, setFullscreenIndex] = useState(0);

    const openFullscreen = (projectIndex, imageIndex = 0) => {
        setFullscreenProject(projectIndex);
        setFullscreenIndex(imageIndex);
    };

    const closeFullscreen = () => {
        setFullscreenProject(null);
        setFullscreenIndex(0);
    };

    useEffect(() => {
        if (fullscreenProject !== null) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [fullscreenProject]);

    const projects = [
        {
            title: "MoodMusic",
            images: [moodMusic],
            description: [
                "ML-based web app that generates a Spotify playlist based on user mood and genre",
                "Uses a CNN to classify facial expressions from webcam input",
                "Clusters songs by valence and energy using a large Spotify dataset",
                "Maps song clusters to moods via Russell's Circumplex Model",
                "Adds 20 mood-matched tracks to user’s Spotify playlist using Spotify API"
            ],
            techstack: [flaskLogo, reactLogo, tfLogo],
            link: "https://github.com/abar-1/musicSentiment"
        },
        {
            title: "Ecommerce Website",
            images: [ecom1, ecom2, ecom3, ecom4, ecom5],
            description: [
                "Built a fully functional e-commerce clothing store with Next.js, featuring server-side rendering and responsive design.",
                "Implemented secure user authentication and data storage using Firebase.",
                "Integrated Stripe payments via Netlify serverless functions for real-time checkout.",
                "Managed global state with Redux Toolkit, Redux-Saga, and Redux Persist for cart and user sessions.",
                "Developed modular React components with CSS Modules and interactive product carousels."
            ],
            techstack: [nextLogo, reduxLogo, stripeLogo, firebaseLogo],
            link: "https://github.com/abar-1/ecommerceWeb"
        },
        {
            title: "Fullstack Activities Manager",
            images: [Landing, Activities, ActivityDetails, Profile, Photos, Events],
            description: [
                "Developed a full-stack Activities Manager app using ASP.NET Core, C#, React, and MobX, implementing secure authentication, user profiles, and activity CRUD operations.",
                "Integrated real-time SignalR chat, photo uploads, and dynamic pagination/filtering logic for a responsive user experience.",
                "Built a modular backend using CQRS with MediatR, Entity Framework Core, and SQL Server, following clean architecture principles."
            ],
            techstack: [dotnetLogo, reactLogo, mobxLogo],
            link: "https://github.com/abar-1/fullStack"
        }
        

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
                            <div className="swiper-container">
                                <Swiper
                                    modules={[Navigation, Pagination, A11y]}
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                    className="swiper"
                                >
                                    {proj.images.map((img, imgIdx) => (
                                        <SwiperSlide key={imgIdx}>
                                            <Image
                                                src={img}
                                                alt={`Project ${idx} preview`}
                                                width={500}
                                                height={300}
                                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                                priority
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button 
                                    className="fullscreen-btn"
                                    onClick={() => openFullscreen(idx)}
                                    title="View fullscreen"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                                    </svg>
                                </button>
                            </div>
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

            {/* Fullscreen Modal */}
            {fullscreenProject !== null && (
                <div className="fullscreen-modal" onClick={closeFullscreen}>
                    <button className="close-btn" onClick={closeFullscreen}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <Swiper
                            modules={[Navigation, Pagination, A11y]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            className="fullscreen-swiper"
                            initialSlide={fullscreenIndex}
                        >
                            {projects[fullscreenProject].images.map((img, imgIdx) => (
                                <SwiperSlide key={imgIdx}>
                                    <Image
                                        src={img}
                                        alt={`Project ${fullscreenProject} fullscreen`}
                                        width={1200}
                                        height={800}
                                        style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                        priority
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
}