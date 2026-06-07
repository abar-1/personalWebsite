import PersonalCard from "./Components/PersonalCard";
import Tools from "./Components/Tools";
import BottomNav from "./Components/BottomNav";
import Projects from "./Components/Projects";
import Selector from "./Components/selector";
import Publications from "./Components/Publications";
import ScrollProgress from "./Components/ScrollProgress";
import MouseGlow from "./Components/MouseGlow";
import MiniHeader from "./Components/MiniHeader";

function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <MouseGlow />
      <MiniHeader />
      <BottomNav />

      <main id="main-content" role="main">
        <PersonalCard />
        <SectionDivider />
        <Tools />
        <SectionDivider />
        <Selector />
        <SectionDivider />
        <Projects />
        <Publications />
      </main>

      <footer
        style={{
          padding: "2rem 0",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
          Aneesh Bargaje · Chicago, IL ·{" "}
          <a href="mailto:abargaje@purdue.edu" style={{ color: "var(--accent)", textDecoration: "none" }}>
            abargaje@purdue.edu
          </a>
        </p>
      </footer>
    </>
  );
}
