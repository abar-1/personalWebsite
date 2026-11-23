// Worst-case data for /dev/stress. Never loaded by the real page.
const place = (name, country, lat, lon, rest = {}) => ({ name, country, lat, lon, ...rest });

export function stress(base, mode) {
  if (mode === "silent") return { ...base, live: true, demoTrack: null };
  if (mode === "playing")
    return {
      ...base,
      live: true,
      demoTrack: { title: "Aladdin Sane (1913-1938-197?) (2013 Remaster, Live at the Nassau Veterans Memorial Coliseum)", artist: "David Bowie, Queen, The Royal Philharmonic Concert Orchestra", href: "https://open.spotify.com", cover: null, duration: 200000, startedAt: Date.now() - 60000 },
    };
  if (mode === "worst") {
    return {
      ...base,
      person: { ...base.person, email: "bartholomew.fitzgerald@northwind-industries-holdings.example.com" },
      about: [["At ", ["Friedrich-Alexander-Universität Erlangen-Nürnberg Benachrichtigungseinstellungen", "wl"], "."], ["X"]],
      roles: [
        { company: "Friedrich-Alexander-Universität Erlangen-Nürnberg", title: "Senior Product Design Engineer, Platform Infrastructure", when: "Aug 2024 to Oct 2025", body: base.roles[0].body.repeat(3) },
        { company: "X", title: "Intern", when: "Now", body: "" },
      ],
      projects: [
        { title: "customer-feedback-from-enterprise-onboarding", when: "July 2026 to now", body: "See https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved", line: "Invitation and notification settings for enterprise administrators", stack: base.projects.map((p) => p.stack).join(", "), href: "https://example.com" },
        { title: "Q", when: null, body: "<script>alert(1)</script> &amp; **bold**", stack: "", href: null },
      ],
      places: [
        place("Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch", "Wales, United Kingdom", 53.22, -4.2, { year: "2025", note: "A village on Anglesey with the longest place name in Europe, visited in the rain." }),
        place("Suva", "Fiji", -18.14, 178.44),
        place("Reykjavík", "Iceland", 64.15, -21.94, { year: "2023" }),
        place("Chicago", "United States", 41.88, -87.63, { photo: "/missing.jpg" }),
        place("West Lafayette", "United States", 40.43, -86.91),
        place("Downers Grove", "United States", 41.81, -88.01),
        place("Ushuaia", "Argentina", -54.8, -68.3),
        place("東京", "日本", 35.68, 139.69),
      ],
      flying: [],
      live: false,
      tracks: [
        { title: "Aladdin Sane (1913-1938-197?) (2013 Remaster, Live at the Nassau Veterans Memorial Coliseum)", artist: "David Bowie, Queen, The Royal Philharmonic Concert Orchestra", href: "https://open.spotify.com" },
        { title: "4", artist: "J", href: null },
        { title: "夜に駆ける", artist: "YOASOBI" },
      ],
      artists: [{ name: "King Gizzard & The Lizard Wizard" }, { name: "Ólafur Arnalds" }],
    };
  }
  if (mode === "empty")
    return { ...base, about: [], roles: [], projects: [], places: [], flying: [], tracks: [], artists: [] };
  if (mode === "one")
    return {
      ...base,
      roles: base.roles.slice(0, 1),
      projects: base.projects.slice(0, 1),
      places: [place("Chicago", "United States", 41.88, -87.63, { year: "2024" })],
      tracks: [{ title: "One Song", artist: "One Artist" }],
      artists: [],
    };
  if (mode === "many")
    return {
      ...base,
      roles: Array.from({ length: 12 }, (_, i) => ({ ...base.roles[i % 5] })),
      places: Array.from({ length: 40 }, (_, i) => place(`Place ${i + 1}`, "Country", -50 + ((i * 37) % 115), -160 + ((i * 53) % 320))),
      tracks: Array.from({ length: 50 }, (_, i) => ({ title: `Song ${i + 1}`, artist: "Artist" })),
    };
  return base;
}
