"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Projects.css";
import Reveal from "./Reveal";

import moodMusic from "../assets/projects/moodMusic.png";
import ecom2 from "../assets/projects/ecom2.png";
import ecom1 from "../assets/projects/ecom1.png";
import ecom3 from "../assets/projects/ecom3.png";
import ecom4 from "../assets/projects/ecom4.png";
import ecom5 from "../assets/projects/ecom5.png";
import Activities from "../assets/projects/Activities.png";
import Landing from "../assets/projects/Landing.png";
import Events from "../assets/projects/Events.png";
import Photos from "../assets/projects/Photos.png";
import Profile from "../assets/projects/Profile.png";
import ActivityDetails from "../assets/projects/ActivityDetails.png";

const projects = [
  {
    title: "MoodMusic",
    category: "DS / ML",
    images: [moodMusic],
    description:
      "ML-based web app that generates a Spotify playlist based on user mood and genre.",
    bullets: [
      "Uses a CNN to classify facial expressions from webcam input.",
      "Clusters songs by valence and energy using a large Spotify dataset.",
      "Maps song clusters to moods via Russell's Circumplex Model.",
      "Adds 20 mood-matched tracks to user's Spotify playlist using Spotify API.",
    ],
    tech: ["Flask", "React", "TensorFlow", "Spotify API"],
    github: "https://github.com/abar-1/musicSentiment",
  },
  {
    title: "Fullstack Activities Manager",
    category: "Full-stack",
    images: [Landing, Activities, ActivityDetails, Profile, Photos, Events],
    description:
      "Full-stack app with real-time chat, photo uploads, and dynamic pagination.",
    bullets: [
      "Developed using ASP.NET Core, C#, React, and MobX with secure authentication.",
      "Integrated real-time SignalR chat, photo uploads, and dynamic pagination/filtering.",
      "Built modular backend using CQRS with MediatR, Entity Framework Core, and SQL Server.",
    ],
    tech: ["ASP.NET", "React", "MobX", "SignalR", "SQL Server"],
    github: "https://github.com/abar-1/fullStack",
  },
  {
    title: "Ecommerce Website",
    category: "Web",
    images: [ecom1, ecom2, ecom3, ecom4, ecom5],
    description:
      "Fully functional e-commerce clothing store with server-side rendering and responsive design.",
    bullets: [
      "Built with Next.js featuring server-side rendering and responsive design.",
      "Implemented secure user authentication and data storage using Firebase.",
      "Integrated Stripe payments via Netlify serverless functions for real-time checkout.",
      "Managed global state with Redux Toolkit, Redux-Saga, and Redux Persist.",
    ],
    tech: ["Next.js", "Redux", "Stripe API", "Firebase"],
    github: "https://github.com/abar-1/ecommerceWeb",
  },
];

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M2.5 8.5L8.5 2.5M8.5 2.5H3.5M8.5 2.5V7.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProjectCard({ project, projectIndex, onFullscreen }) {
  const preview = project.images?.[0];

  return (
    <article className="project-card reveal">
      {preview && (
        <button
          type="button"
          className="project-thumb"
          onClick={() => onFullscreen(projectIndex, 0)}
          aria-label={`View ${project.title} screenshots`}
        >
          <Image
            src={preview}
            alt={`${project.title} preview`}
            width={520}
            height={280}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          {project.images.length > 1 && (
            <span className="project-thumb-count">
              {project.images.length} screenshots
            </span>
          )}
        </button>
      )}

      <div className="project-body">
        <div className="project-head">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-cat">{project.category}</span>
        </div>

        <p className="project-desc">{project.description}</p>

        <ul className="project-bullets">
          {project.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <div className="project-foot">
          <div className="tag-row">
            {project.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Code
              <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

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
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [fullscreenProject]);

  return (
    <>
      <Reveal className="projects-grid" stagger>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            projectIndex={index}
            onFullscreen={openFullscreen}
          />
        ))}
      </Reveal>

      {fullscreenProject !== null &&
        projects[fullscreenProject]?.images?.length > 0 && (
          <div className="fullscreen-modal" onClick={closeFullscreen}>
            <button className="close-btn" onClick={closeFullscreen} type="button" aria-label="Close gallery">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
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
                      alt={`Project fullscreen ${imgIdx + 1}`}
                      width={1200}
                      height={800}
                      style={{ objectFit: "contain", width: "100%", height: "100%" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
    </>
  );
}
