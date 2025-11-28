import "./globals.css";
import PersonalCard from "./Components/PersonalCard";
import Tools from "./Components/Tools";
import Experience from "./Components/Experience";
import BottomNav from "./Components/BottomNav";
import Projects from "./Components/Projects";
import Selector from "./Components/selector";
import Publications from "./Components/Publications";


export default function HomePage() {
    return (
        <html lang="en">
        <head>
          <link rel="icon" type="image/x-icon" href="https://media.licdn.com/dms/image/v2/D5603AQGMO-97LyMqCw/profile-displayphoto-shrink_400_400/B56ZbuUBUaHUAg-/0/1747754948812?e=1754524800&v=beta&t=7pfDPvrMjidyrBCUzDN_SASE6Yn-3VGGjphtR8qEUOI" />
          <title>Aneesh&apos;s Portfolio</title>
          <meta name="description" content="Aneesh's personal portfolio showcasing projects, publications, and experience." />
          <meta name="keywords" content="Aneesh, Bargaje, Portfolio, Projects, Publications, Experience, Developer, Aneesh Bargaje" />
          <meta name="author" content="Aneesh Bargaje" />
          <meta property="og:title" content="Aneesh Bargaje | Portfolio" />
          <meta property="og:description" content="ML, cybersecurity, software projects, and aviation research." />
          <meta property="og:type" content="website"></meta>
        </head>
        <body>
         
          <div className="landing">
            <PersonalCard />
            <Tools />
          </div>

          <Publications />

          <Selector />
          
          
          <Projects />
          <BottomNav />        
        </body>
      </html>
    );
  }