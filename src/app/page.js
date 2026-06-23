import TopNav from "./Components/TopNav";
import Hero from "./Components/Hero";
import Section from "./Components/Section";
import Experience from "./Components/Experience";
import Projects from "./Components/Projects";
import Education from "./Components/Education";
import Tools from "./Components/Tools";

export default function HomePage() {
  return (
    <>
      <TopNav />

      <main id="main-content">
        <Hero />

        <Section
          id="experience"
          index="01"
          label="Experience"
          description="Internships & research"
        >
          <Experience />
        </Section>

        <Section
          id="projects"
          index="02"
          label="Projects"
          description="Selected work"
          tone="alt"
        >
          <Projects />
        </Section>

        <Section
          id="education"
          index="03"
          label="Education"
          description="Background"
        >
          <Education />
        </Section>

        <Section
          id="skills"
          index="04"
          label="Skills"
          description="Tools I build with"
          tone="alt"
        >
          <Tools />
        </Section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="container footer-inner">
          <span className="footer-name">Aneesh Bargaje — Chicago, IL</span>
          <nav className="footer-links" aria-label="Contact">
            <a href="mailto:abargaje@purdue.edu">Email</a>
            <a href="https://github.com/abar-1" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aneesh-bargaje-a345b7269/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
