// Decides which flight a photo belongs to from when and where it was taken.

const NM = 3440.065;
const rad = (d) => (d * Math.PI) / 180;

// Nautical miles from a point to a leg, on a flat map, which is plenty at this scale.
function toLeg(p, a, b) {
  const k = Math.cos(rad(p.lat));
  const flat = (q) => [rad(q.lon - p.lon) * k * NM, rad(q.lat - p.lat) * NM];
  const [ax, ay] = flat(a);
  const [bx, by] = flat(b);
  const [dx, dy] = [bx - ax, by - ay];
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / len)) : 0;
  return Math.hypot(ax + t * dx, ay + t * dy);
}

export const distance = (point, path) =>
  path.length === 1
    ? toLeg(point, path[0], path[0])
    : Math.min(...path.slice(1).map((b, i) => toLeg(point, path[i], b)));

// Every flight in the log as one flat list.
export function listFlights({ airports, routes, local }) {
  const at = Object.fromEntries(airports.map((a) => [a.id, a]));
  return [
    ...routes.flatMap((r) =>
      r.flights.map((f) => ({ ...f, key: `routes/${r.id}/${f.date}`, path: r.path.map((id) => at[id]) }))
    ),
    ...Object.entries(local).flatMap(([id, flights]) =>
      flights.map((f) => ({ ...f, key: `airports/${id}/${f.date}`, path: [at[id]], isLocal: true }))
    ),
  ];
}

const dayBefore = (date) => new Date(Date.parse(`${date}T00:00:00Z`) - 864e5).toISOString().slice(0, 10);

const NEAR = 25; // miles off the route still counts as that flight
const CLEAR = 8; // how much closer one flight must be to beat another

// photo: { date: "YYYY-MM-DD", hour: 0-23 or null, gps: { lat, lon } or null }
export function matchPhoto(photo, flights) {
  if (!photo.date) return { status: "review", why: "no date in the photo" };

  let options = flights.filter((f) => f.date === photo.date);
  if (!options.length && photo.hour !== null && photo.hour < 4)
    options = flights.filter((f) => f.night && f.date === dayBefore(photo.date));
  if (!options.length) return { status: "review", why: `no flight logged on ${photo.date}` };

  if (photo.gps) {
    const far = options.map((f) => ({ f, d: distance(photo.gps, f.path) })).sort((a, b) => a.d - b.d);
    options = far.filter((o) => o.d <= NEAR).map((o) => o.f);
    if (!options.length)
      return { status: "review", why: `right day, but taken ${Math.round(far[0].d)} NM from the route`, guess: far[0].f.key };
    if (options.length === 1) return { status: "match", key: options[0].key, why: "date and location" };
    // Away from the shared airport, it can only be the one that went somewhere.
    const near = far.filter((o) => o.d <= NEAR);
    if (near[1].d - near[0].d >= CLEAR) return { status: "match", key: near[0].f.key, why: "date and closest route" };
  } else if (options.length === 1) {
    return { status: "match", key: options[0].key, why: "date only, no location" };
  }

  // Two flights that day: a night flight and a day flight are told apart by the clock.
  if (photo.hour !== null) {
    const dark = photo.hour >= 20 || photo.hour < 5;
    const byClock = options.filter((f) => Boolean(f.night) === dark);
    if (byClock.length === 1 && options.some((f) => f.night))
      return { status: "match", key: byClock[0].key, why: "date and time of day" };
  }
  return { status: "review", why: "more than one flight fits", guess: options.map((f) => f.key).join(" or ") };
}
