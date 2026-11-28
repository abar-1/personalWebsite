// Everything the page says lives here.

export const person = {
  name: "Aneesh Bargaje",
  line: "Computer science and data science at Purdue, minor in finance. Private pilot.",
  seeking: "Graduating May 2028. Looking for software engineering and data science roles.",
  email: "abargaje@purdue.edu",
  socials: [
    ["GitHub", "https://github.com/abar-1"],
    ["LinkedIn", "https://www.linkedin.com/in/aneesh-bargaje-a345b7269/"],
  ],
  source: "https://github.com/abar-1/personalWebsite",
};

// Each paragraph is a list of plain strings and [words, stop] pairs.
// Clicking a pair flies the airplane there: a stop id below, or an airport
// or route id from flights.js.
export const about = [
  [
    "Right now I'm a marketing data science & analytics intern at ",
    ["Purdue's Daniels School of Business", "wl"],
    " and a software engineer at ",
    ["Purdue Instructional Innovations", "wl"],
    ". This summer I was at ",
    ["Flexco", "dg"],
    ", building a predictive-maintenance app for manufacturing machines that replaced a vendor's version and saved $150K upfront.",
  ],
  [
    "In tech I like search and retrieval, LLM tools that check their own work, and full-stack apps. Outside of academics/tech I fly, travel and listen to a lot of music. I got my private pilot license in May after training in a ",
    ["Cessna 172", "KLAF"],
    ", and I fly a ",
    ["Civil Air Patrol plane", "dpa-dkb"],
    " too.",
  ],
];

export const roles = [
  { company: "Purdue Daniels School of Business", at: "wl", title: "Marketing Data Science Intern", when: "Aug 2026 to now", body: "Data pipelines for competitive research, and admissions analysis for senior leadership.", tags: ["Data pipelines", "Analytics"] },
  { company: "Purdue Instructional Innovations", at: "wl", title: "Software Engineer Intern", when: "Jan 2026 to now", body: "Full-stack features for a learning platform used by 3,000+ students.", tags: ["Full stack", "EdTech"] },
  { company: "Flexco", at: "dg", title: "IT Intern", when: "May to Aug 2026", body: "A predictive-maintenance app fed by live machine data, and LLM document extraction.", tags: ["Manufacturing data", "LLMs"] },
  { company: "KLoBot", at: "elm", title: "Software Development Intern", when: "May to Aug 2025", body: "AI-powered search over law firms' SharePoint knowledge.", tags: ["Search", "AI"] },
];

// "when" is optional; add a graduation year if you want one shown.
export const education = [
  { school: "Purdue University", at: "wl", degree: "B.S. Computer Science and Data Science, minor in Finance", when: "Graduating May 2028" },
  { school: "Illinois Mathematics and Science Academy", at: "aur", degree: "High school", when: "" },
];

export const contact = "Email is the best way to reach me. Happy to talk about internships, projects, or flying.";

export const projects = [
  {
    title: "ResearchFindr",
    at: "wl",
    photos: "projects/researchfindr", // folder inside public/
    line: "Matches students with researchers",
    body: "Finds researchers who share your interests. Hybrid search with reranking and filtering ahead of the LLM raised match accuracy by about 20%.",
    stack: "Python, Sentence Transformers, Next.js, Supabase, FastAPI",
    href: null,
  },
  {
    title: "Activities Manager",
    at: "elm",
    photos: "projects/activities-manager", // folder inside public/
    line: "Event planning with live chat",
    body: "A full-stack app with real-time SignalR chat, photo uploads and authentication on a CQRS backend.",
    stack: "C#, ASP.NET Core, React, MobX, Entity Framework",
    href: "https://github.com/abar-1/fullStack",
  },
  {
    title: "MoodMusic",
    at: "aur",
    photos: "projects/moodmusic", // folder inside public/
    line: "Playlists from your expression",
    body: "Reads your expression from a webcam with a CNN, then adds 20 tracks that fit the mood to a Spotify playlist.",
    stack: "TensorFlow, Flask, React, Spotify API",
    href: "https://github.com/abar-1/musicSentiment",
  },
];

// Logos live in public/skills/<icon>.svg. "main: true" puts a skill in the
// highlighted row at the top of the section.
export const skills = [
  {
    title: "Languages",
    items: [
      { name: "Python", icon: "python", main: true },
      { name: "C#", icon: "csharp", main: true },
      { name: "TypeScript", icon: "typescript", main: true },
      { name: "SQL", icon: "sql", main: true },
      { name: "JavaScript", icon: "javascript" },
      { name: "Java", icon: "java" },
      { name: "R", icon: "r" },
      { name: "C", icon: "c" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css3" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "ASP.NET Core", icon: "dotnetcore", main: true },
      { name: "React", icon: "react", main: true },
      { name: "Next.js", icon: "nextjs", main: true },
      { name: "FastAPI", icon: "fastapi", main: true },
      { name: "Node.js", icon: "nodejs" },
      { name: "Flask", icon: "flask" },
      { name: "Vue", icon: "vuejs" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "LangChain", icon: "langchain" },
    ],
  },
  {
    title: "Tools and platforms",
    items: [
      { name: "Azure", icon: "azure", main: true },
      { name: "AWS", icon: "amazonwebservices", main: true },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub Actions", icon: "githubactions" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Snowflake", icon: "snowflake" },
      { name: "Postman", icon: "postman" },
      { name: "Salesforce", icon: "salesforce" },
      { name: "ServiceNow", icon: "servicenow" },
    ],
  },
];

// The "Places" view of the chart.
// "dg", "wl" and so on are the ids used by "at" above.
export const stops = [
  { id: "chi", name: "Chicago", note: "", lat: 41.88, lon: -87.63, label: "right" },
  { id: "elm", name: "Elmhurst", note: "", lat: 41.9, lon: -87.94, label: "up" },
  { id: "dg", name: "Downers Grove", note: "Flexco", lat: 41.79, lon: -88.01, label: "below" },
  { id: "aur", name: "Aurora", note: "High school, IMSA", lat: 41.76, lon: -88.32, label: "left" },
  { id: "wl", name: "West Lafayette", note: "Purdue", lat: 40.43, lon: -86.91, label: "below" },
];
export const homeBase = "wl";
