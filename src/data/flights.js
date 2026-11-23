// From the logbook. Tail numbers and instructor remarks are left off on purpose.
// KCMX in the logbook is a typo for KMCX, so those flights are under laf-mcx.

export const totals = { hours: "69.4", flights: 52 };

// label: which side of the dot the identifier sits on
export const airports = [
  { id: "KLAF", cover: "1737-2877941d", album: "Around Purdue", name: "Purdue University", lat: 40.4123, lon: -86.9369, label: "left" },
  { id: "KMTO", name: "Mattoon, IL", lat: 39.4779, lon: -88.2792, label: "up" },
  { id: "1H8", name: "Casey, IL", lat: 39.3025, lon: -88.0041, label: "right" },
  { id: "1H2", name: "Effingham, IL", lat: 39.0704, lon: -88.5335, label: "below" },
  { id: "06C", name: "Schaumburg, IL", lat: 41.9893, lon: -88.1012, label: "right" },
  { id: "KFKR", name: "Frankfort, IN", lat: 40.2734, lon: -86.5622, label: "right" },
  { id: "KMCX", name: "Monticello, IN", lat: 40.7088, lon: -86.7668, label: "left" },
  { id: "KHUF", name: "Terre Haute, IN", lat: 39.4515, lon: -87.3076, label: "below" },
  { id: "KBAK", name: "Columbus, IN", lat: 39.2619, lon: -85.8963, label: "right" },
  { id: "KIKK", name: "Kankakee, IL", lat: 41.0714, lon: -87.8463, label: "left" },
  { id: "KOXI", name: "Knox, IN", lat: 41.3301, lon: -86.6648, label: "up" },
  { id: "KGGP", name: "Logansport, IN", lat: 40.7113, lon: -86.3745, label: "right" },
  { id: "KBMG", name: "Bloomington, IN", lat: 39.146, lon: -86.6167, label: "below" },
  { id: "KFWA", name: "Fort Wayne, IN", lat: 40.9785, lon: -85.1951, label: "up" },
  { id: "KCFJ", name: "Crawfordsville, IN", lat: 39.9756, lon: -86.9199, label: "right" },
  { id: "KDNV", name: "Danville, IL", lat: 40.1997, lon: -87.5955, label: "left" },
  { id: "KDPA", name: "DuPage, IL", lat: 41.9078, lon: -88.2486, label: "below" },
  { id: "KDKB", name: "DeKalb, IL", lat: 41.9339, lon: -88.7057, label: "up" },
];

// Photos for a flight go in public/routes/<id>/<date>/ and show up when the
// route is clicked. "cover" is the start of the file name used on its album.
// `npm run photos` can sort them there for you.
export const routes = [
  { id: "solo-cross-country", cover: "1324-824fa45c", title: "Solo cross country", featured: true, path: ["KLAF", "KBMG", "KFWA", "KLAF"], flights: [{ date: "2026-04-30", note: "3.5 hours solo" }] },
  { id: "laf-huf", path: ["KLAF", "KHUF"], flights: [{ date: "2026-04-05", note: "Dual cross country" }, { date: "2026-04-26", note: "Solo" }] },
  { id: "laf-bak", cover: "1130-f25d0b75", path: ["KLAF", "KBAK"], flights: [{ date: "2026-04-12", note: "Dual cross country" }] },
  { id: "laf-ikk", path: ["KLAF", "KIKK"], flights: [{ date: "2026-04-14", note: "Dual cross country, instruments on the way back" }] },
  { id: "night-cross-country", cover: "2128-255a3d0d", title: "Night cross country", path: ["KLAF", "KOXI", "KGGP", "KLAF"], flights: [{ date: "2026-04-20", note: "2.1 hours at night", night: true }] },
  { id: "laf-mcx", cover: "1644-161a2a72", path: ["KLAF", "KMCX"], flights: [{ date: "2026-03-25", note: "Pattern work" }, { date: "2026-03-28", note: "Solo at Monticello" }, { date: "2026-03-29", note: "Dual" }] },
  { id: "laf-fkr", path: ["KLAF", "KFKR"], flights: [{ date: "2026-03-13", note: "Dual" }, { date: "2026-04-29", note: "Dual" }] },
  { id: "laf-cfj", path: ["KLAF", "KCFJ"], flights: [{ date: "2026-05-03", note: "Checkride prep" }] },
  { id: "laf-dnv", path: ["KLAF", "KDNV"], flights: [{ date: "2026-05-20", note: "Checkride prep" }] },
  { id: "dpa-dkb", cover: "1123-d24d0410", path: ["KDPA", "KDKB"], flights: [{ date: "2026-07-11", note: "Proficiency flight" }, { date: "2026-08-20", note: "Pattern and maneuvers" }] },
  { id: "mto-1h2", path: ["KMTO", "1H2"], flights: [{ date: "2024-06-24", note: "Out and back" }, { date: "2024-06-26", note: "Two flights" }, { date: "2024-06-27", note: "Pattern work" }] },
  { id: "mto-1h8", path: ["KMTO", "1H8"], flights: [{ date: "2024-06-23", note: "Dual" }] },
];

// Flights that stayed at one airport. Photos go in public/airports/<id>/<date>/.
// Only the ones with a note or photos are listed on the site.
export const local = {
  "06C": [
    { date: "2025-06-25" }, { date: "2025-06-28" }, { date: "2025-06-29" }, { date: "2025-06-30" },
    { date: "2025-07-02", note: "First solo" },
  ],
  "1H8": [{ date: "2024-06-28" }],
  KLAF: [
    { date: "2026-02-25" }, { date: "2026-02-28" }, { date: "2026-03-01" }, { date: "2026-03-06" },
    { date: "2026-03-23" }, { date: "2026-03-26" }, { date: "2026-04-06" },
    { date: "2026-04-08", night: true, note: "Night landings" },
    { date: "2026-04-09" }, { date: "2026-04-16" },
    { date: "2026-04-19", note: "Towered solo" },
    { date: "2026-04-20" }, { date: "2026-04-22" }, { date: "2026-05-01" }, { date: "2026-05-02" },
    { date: "2026-05-07" }, { date: "2026-05-20" }, { date: "2026-05-21" },
    { date: "2026-05-22", note: "Private pilot checkride" },
  ],
};
