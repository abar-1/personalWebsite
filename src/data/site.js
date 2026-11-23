// Everything the page says lives here.

export const person = {
  name: "Aneesh Bargaje",
  line: "Computer science and data science at Purdue, minor in finance. Private pilot.",
  email: "abargaje@purdue.edu",
  // Button appears once the file exists at public/Aneesh_Bargaje_Resume.pdf
  resume: "Aneesh_Bargaje_Resume.pdf",
  socials: [
    ["GitHub", "https://github.com/abar-1"],
    ["LinkedIn", "https://www.linkedin.com/in/aneesh-bargaje-a345b7269/"],
  ],
};

// Each paragraph is a list of plain strings and [words, stop] pairs.
// Clicking a pair flies the airplane there: a stop id below, or an airport
// or route id from flights.js.
export const about = [
  [
    "Right now I'm a data science intern at ",
    ["Purdue's Daniels School of Business", "wl"],
    " and a software engineer at ",
    ["Purdue Instructional Innovations", "wl"],
    ". This summer I was at ",
    ["Flexco", "dg"],
    ", building a machine-inspection app that replaced a vendor's version and saved $150K upfront.",
  ],
  [
    "In tech I like search and retrieval, LLM tools that check their own work, and full-stack apps. Away from it I fly, travel and listen to a lot of music. I got my private pilot license in May after training in a ",
    ["Cessna 172", "KLAF"],
    ", and I fly a ",
    ["Civil Air Patrol plane", "dpa-dkb"],
    " too.",
  ],
];

export const roles = [
  { company: "Purdue Daniels School of Business", at: "wl", title: "Marketing Data Science Intern", when: "Aug 2026 to now", body: "Data pipelines for competitive research, and admissions analysis for senior leadership." },
  { company: "Purdue Instructional Innovations", at: "wl", title: "Software Engineer Intern", when: "Jan 2026 to now", body: "Full-stack features for a learning platform used by 3,000+ students." },
  { company: "Flexco", at: "dg", title: "IT Intern", when: "May to Aug 2026", body: "A predictive-maintenance app fed by live machine data, and LLM document extraction." },
  { company: "KLoBot", at: "elm", title: "Software Development Intern", when: "May to Aug 2025", body: "AI-powered search over law firms' SharePoint knowledge." },
];

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
