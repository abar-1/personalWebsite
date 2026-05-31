import PersonalCard from "./Components/PersonalCard";
import Tools from "./Components/Tools";
import BottomNav from "./Components/BottomNav";
import Projects from "./Components/Projects";
import Selector from "./Components/selector";
import Publications from "./Components/Publications";

export default function HomePage() {
  return (
    <>
      <div className="landing">
        <PersonalCard />
      </div>

      <Tools />
      <Selector />
      <Publications />
      <Projects />
      <BottomNav />
    </>
  );
}
