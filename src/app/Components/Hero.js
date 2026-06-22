"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * Interactive particle field — a torus-knot woven from points that
 * react to the cursor. Rendered in the site's ink-blue palette.
 * The animation loop mutates typed arrays with scalar math (no
 * per-frame object allocation) so it stays smooth with many points.
 * ------------------------------------------------------------------ */
function ParticleField() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Scale particle density to the viewport / device.
    const isSmall = window.innerWidth < 768;
    const particleCount = isSmall ? 14000 : 30000;

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 220, 32);
    const tkPos = torusKnot.attributes.position;
    const tkCount = tkPos.count;

    const color = new THREE.Color();
    for (let i = 0; i < particleCount; i++) {
      const v = i % tkCount;
      const x = tkPos.getX(v);
      const y = tkPos.getY(v);
      const z = tkPos.getZ(v);
      const i3 = i * 3;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      // Ink-blue palette: hue jitter across cyan→indigo, varied lightness.
      const hue = 0.56 + Math.random() * 0.12; // ~202°–245°
      const light = 0.45 + Math.random() * 0.3;
      color.setHSL(hue, 0.85, light);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    torusKnot.dispose();

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const clock = new THREE.Clock();
    let raf = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const mx = mouse.x * 3;
      const my = mouse.y * 3;

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        let px = positions[ix];
        let py = positions[iy];
        let pz = positions[iz];

        let vx = velocities[ix];
        let vy = velocities[iy];
        let vz = velocities[iz];

        // Cursor repulsion (scalar — no allocations).
        const dx = px - mx;
        const dy = py - my;
        const dz = pz; // mouse z = 0
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < 2.25 && distSq > 1e-6) {
          const dist = Math.sqrt(distSq);
          const force = ((1.5 - dist) * 0.01) / dist;
          vx += dx * force;
          vy += dy * force;
          vz += dz * force;
        }

        // Spring back to the woven shape, then damp.
        vx += (originalPositions[ix] - px) * 0.001;
        vy += (originalPositions[iy] - py) * 0.001;
        vz += (originalPositions[iz] - pz) * 0.001;
        vx *= 0.95;
        vy *= 0.95;
        vz *= 0.95;

        positions[ix] = px + vx;
        positions[iy] = py + vy;
        positions[iz] = pz + vz;
        velocities[ix] = vx;
        velocities[iy] = vy;
        velocities[iz] = vz;
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(renderFrame);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    if (reduce) {
      // Static render, gentle tilt, no interaction loop.
      points.rotation.x = 0.3;
      points.rotation.y = 0.4;
      renderer.render(scene, camera);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      raf = requestAnimationFrame(renderFrame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas" aria-hidden="true" />;
}

const links = [
  { label: "GitHub", href: "https://github.com/abar-1", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aneesh-bargaje-a345b7269/",
    external: true,
  },
  { label: "Email", href: "mailto:abargaje@purdue.edu", external: false },
];

export default function Hero() {
  const reduce = useReducedMotion();

  const ease = [0.2, 0.65, 0.3, 0.9];
  const rise = (delay) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease },
  });

  const name = "Aneesh Bargaje";

  return (
    <section id="home" className="hero">
      <ParticleField />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <motion.p
          className="hero-eyebrow"
          {...rise(0.2)}
        >
          DS&middot;ML&nbsp;/&nbsp;Software Engineer
        </motion.p>

        <h1 className="hero-name" aria-label={name}>
          {name.split(" ").map((word, wi) => (
            <span key={wi} className="hero-name-word">
              {word.split("").map((char, ci) => (
                <motion.span
                  key={ci}
                  initial={{ opacity: 0, y: reduce ? 0 : 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduce ? 0 : 1.1,
                    delay: reduce ? 0 : 0.4 + (wi * 6 + ci) * 0.04,
                    ease,
                  }}
                  style={{ display: "inline-block" }}
                  aria-hidden="true"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p className="hero-lede" {...rise(1.1)}>
          Data Science + Computer Science @ Purdue&nbsp;&rsquo;29. I build ML
          systems and the software around them — from forecasting and applied ML
          to full-stack engineering.
        </motion.p>

        <motion.div className="hero-status" {...rise(1.3)}>
          <span className="dot" aria-hidden="true" />
          Seeking SWE / AI&middot;ML / Data Science internships&nbsp;&middot;&nbsp;Chicago, IL
        </motion.div>

        <motion.div className="hero-actions" {...rise(1.5)}>
          <a href="#experience" className="btn btn-primary">
            View work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 2.5v9M7 11.5L3.5 8M7 11.5L10.5 8"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="btn btn-ghost"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 1 : 0.6 }}
        transition={{ delay: reduce ? 0 : 2.4, duration: 1 }}
      >
        <span>Scroll</span>
        <span className="line" />
      </motion.div>
    </section>
  );
}
