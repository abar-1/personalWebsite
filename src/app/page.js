import "./globals.css";
import PersonalCard from "./Components/PersonalCard";
import Tools from "./Components/Tools";
import Experience from "./Components/Experience";
import BottomNav from "./Components/BottomNav";
import Projects from "./Components/Projects";


export default function HomePage() {
    return (
        <html lang="en">
        <head>
          <title>Aneesh&apos;s Portfolio</title>
        </head>
        <body>
         
          <div className="landing">
          <PersonalCard />
          <Tools />
          </div>
          
          <Experience />
          <Projects />
          <BottomNav />        
        </body>
      </html>
    );
  }