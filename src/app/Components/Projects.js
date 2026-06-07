"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Projects.css";

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
    featured: true,
    category: "ml",
  },
  {
    title: "QAM-16 ML Demodulator",
    images: [],
    description:
      "Machine learning system that decodes 16-QAM signals, potentially replacing hardware demodulators.",
    bullets: [
      "Built decision tree and random forest models to decode 16 QAM signals.",
      "Achieved 91.4% accuracy with Gaussian and impulse noise.",
      "Presented at IIT's Real-Time Communications Conference, October 2025.",
    ],
    tech: ["Python", "scikit-learn", "NumPy", "Matplotlib"],
    featured: true,
    category: "ml",
  },
  {
    title: "Ecommerce Website",
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
    category: "web",
  },
  {
    title: "Fullstack Activities Manager",
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
    category: "fullstack",
  },
];

const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

const categoryLabels = {
  ml: { label: "DS / ML", color: "var(--accent)" },
  web: { label: "Web", color: "#38bdf8" },
  fullstack: { label: "Fullstack", color: "#34d399" },
};

function CategoryBadge({ category }) {
  if (!category) return null;
  const info = categoryLabels[category];
  if (!info) return null;
  return (
    <span
      style={{
        fontSize: "0.6875rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: info.color,
        background: "rgba(139, 92, 246, 0.12)",
        padding: "0.2rem 0.5rem",
        borderRadius: "0.25rem",
        border: `1px solid rgba(139, 92, 246, 0.25)`,
      }}
    >
      {info.label}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ProjectImageCarousel({ images, onFullscreen, projectIndex }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="project-image-carousel">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="project-swiper"
      >
        {images.map((img, imgIdx) => (
          <SwiperSlide key={imgIdx}>
            <Image
              src={img}
              alt={`Project preview ${imgIdx + 1}`}
              width={400}
              height={220}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="fullscreen-btn"
        onClick={() => onFullscreen(projectIndex, 0)}
        title="View fullscreen"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      </button>
    </div>
  );
}

function FeaturedCard({ project, projectIndex, onFullscreen }) {
  return (
    <div className="project-featured" style={{ flex: "1 1 300px", minWidth: 0 }}>
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, var(--accent), #6366f1)",
        }}
      />
      {project.images?.length > 0 && (
        <ProjectImageCarousel
          images={project.images}
          onFullscreen={onFullscreen}
          projectIndex={projectIndex}
        />
      )}
      <div style={{ padding: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.75rem",
            gap: "0.5rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
            {project.title}
          </h3>
          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center", flexShrink: 0 }}>
            <CategoryBadge category={project.category} />
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                style={{ display: "flex", alignItems: "center", color: "var(--text-muted)" }}
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 1rem 0" }}>
          {project.description}
        </p>
        <ul style={{ margin: "0 0 1rem 0", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {project.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
              {b}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, projectIndex, onFullscreen }) {
  return (
    <div className="project-card-enhanced">
      {project.images?.length > 0 && (
        <ProjectImageCarousel
          images={project.images}
          onFullscreen={onFullscreen}
          projectIndex={projectIndex}
        />
      )}
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.625rem", gap: "0.5rem" }}>
          <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
            {project.title}
          </h3>
          <div style={{ display: "flex", gap: "0.375rem", flexShrink: 0 }}>
            <CategoryBadge category={project.category} />
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }}
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>
        <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 0.875rem 0" }}>
          {project.description}
        </p>
        <ul style={{ margin: "0 0 0.875rem 0", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {project.bullets.slice(0, 3).map((b, i) => (
            <li key={i} style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
              {b}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const featuredRef = useRef(null);
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

  useEffect(() => {
    const featured = featuredRef.current;
    if (!featured) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = Array.from(featured.children);
    cards.forEach((c) => {
      c.style.opacity = "0";
      c.style.transform = "translateY(20px)";
      c.style.transition =
        "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(featured);
    return () => observer.disconnect();
  }, []);

  const getProjectIndex = (project) => projects.indexOf(project);

  return (
    <>
      <section id="projects" ref={sectionRef} style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <p className="section-label" style={{ margin: 0 }}>Projects</p>
            <svg width="80" height="16" viewBox="0 0 80 16" fill="none" aria-hidden="true" style={{ opacity: 0.4 }}>
              <path
                d="M0 8 Q5 2 10 8 Q15 14 20 8 Q25 2 30 8 Q35 14 40 8 Q45 2 50 8 Q55 14 60 8 Q65 2 70 8 Q75 14 80 8"
                stroke="var(--accent)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div
            ref={featuredRef}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}
          >
            {featuredProjects.map((p) => (
              <FeaturedCard
                key={p.title}
                project={p}
                projectIndex={getProjectIndex(p)}
                onFullscreen={openFullscreen}
              />
            ))}
          </div>

          {otherProjects.length > 0 && (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1.2 },
                768: { slidesPerView: 1.5 },
              }}
              style={{ paddingBottom: "2.5rem" }}
            >
              {otherProjects.map((p) => (
                <SwiperSlide key={p.title}>
                  <ProjectCard
                    project={p}
                    projectIndex={getProjectIndex(p)}
                    onFullscreen={openFullscreen}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {fullscreenProject !== null && projects[fullscreenProject]?.images?.length > 0 && (
        <div className="fullscreen-modal" onClick={closeFullscreen}>
          <button className="close-btn" onClick={closeFullscreen} type="button">
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
