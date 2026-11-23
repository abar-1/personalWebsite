// From the logbook. Tail numbers and instructor remarks are left off on purpose.
// KCMX in the logbook is a typo for KMCX, so those flights are under laf-mcx.

export const totals = { hours: "69.4", flights: 52 };

// label: which side of the dot the identifier sits on
export const airports = [
  { id: "KLAF", name: "Purdue University", lat: 40.4123, lon: -86.9369, label: "left" },
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

// Photos for a route go in public/routes/<id>/ and show up when it is clicked.
export const routes = [
  { id: "solo-cross-country", title: "Solo cross country", featured: true, path: ["KLAF", "KBMG", "KFWA", "KLAF"], flights: [["Apr 30, 2026", "3.5 hours solo"]] },
  { id: "laf-huf", path: ["KLAF", "KHUF"], flights: [["Apr 5, 2026", "Dual cross country"], ["Apr 26, 2026", "Solo"]] },
  { id: "laf-bak", path: ["KLAF", "KBAK"], flights: [["Apr 12, 2026", "Dual cross country"]] },
  { id: "laf-ikk", path: ["KLAF", "KIKK"], flights: [["Apr 14, 2026", "Dual cross country, instruments on the way back"]] },
  { id: "night-cross-country", title: "Night cross country", path: ["KLAF", "KOXI", "KGGP", "KLAF"], flights: [["Apr 20, 2026", "2.1 hours at night"]] },
  { id: "laf-mcx", path: ["KLAF", "KMCX"], flights: [["Mar 25, 2026", "Pattern work"], ["Mar 28, 2026", "Solo at Monticello"], ["Mar 29, 2026", "Dual"]] },
  { id: "laf-fkr", path: ["KLAF", "KFKR"], flights: [["Mar 13, 2026", "Dual"], ["Apr 29, 2026", "Dual"]] },
  { id: "laf-cfj", path: ["KLAF", "KCFJ"], flights: [["May 3, 2026", "Checkride prep"]] },
  { id: "laf-dnv", path: ["KLAF", "KDNV"], flights: [["May 20, 2026", "Checkride prep"]] },
  { id: "dpa-dkb", path: ["KDPA", "KDKB"], flights: [["Jul 11, 2026", "Proficiency flight"], ["Aug 20, 2026", "Pattern and maneuvers"]] },
  { id: "mto-1h2", path: ["KMTO", "1H2"], flights: [["Jun 24, 2024", "Out and back"], ["Jun 26, 2024", "Two flights"], ["Jun 27, 2024", "Pattern work"]] },
  { id: "mto-1h8", path: ["KMTO", "1H8"], flights: [["Jun 23, 2024", "Dual"]] },
];
