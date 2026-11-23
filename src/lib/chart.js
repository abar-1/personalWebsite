import "server-only";
import { geoMercator, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import us from "us-atlas/counties-10m.json";
import { photosIn } from "./photos";

const W = 640;
const H = 940;
const fix = (n) => +n.toFixed(1);

const day = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const named = (photos, alt) => photos.map((p, i) => ({ ...p, alt: `${alt}, photo ${i + 1}` }));
const withPhotos = (flights, folder, title) =>
  flights.map((f) => ({ ...f, day: day(f.date), photos: named(photosIn(`${folder}/${f.date}`), `${title}, ${day(f.date)}`) }));

// Every route or airport with photos, the featured one first.
export function albums(chart) {
  return [...chart.routes, ...chart.airports]
    .map((item) => {
      const photos = [...item.flights.flatMap((f) => f.photos), ...(item.photos ?? [])];
      const cover = photos.find((p) => item.cover && p.src.includes(`/${item.cover}`)) ?? photos[0];
      const days = item.flights.filter((f) => f.photos.length).map((f) => f.day);
      return { id: item.id, title: item.album ?? item.title ?? item.name, featured: item.featured, cover, count: photos.length, when: days.length === 1 ? days[0] : "" };
    })
    .filter((a) => a.count > 0)
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || b.count - a.count);
}

// Draws the base map once in chart units. The browser pans and zooms it.
export function buildChart({ stops, airports, routes, local }) {
  const all = [...stops, ...airports];
  const projection = geoMercator()
    .fitExtent([[60, 60], [W - 60, H - 60]], { type: "MultiPoint", coordinates: all.map((p) => [p.lon, p.lat]) })
    .clipExtent([[-700, -250], [W + 700, H + 250]]);
  const path = geoPath(projection).digits(1);
  const place = (p) => {
    const [x, y] = projection([p.lon, p.lat]);
    return { ...p, x: fix(x), y: fix(y) };
  };
  const spots = airports.map(place);
  const byId = Object.fromEntries(spots.map((a) => [a.id, a]));

  return {
    land: path(feature(us, us.objects.nation)),
    counties: path(mesh(us, us.objects.counties, (a, b) => a !== b)),
    states: path(mesh(us, us.objects.states, (a, b) => a !== b)),
    stops: stops.map(place),
    airports: spots.map((a) => ({
      ...a,
      flights: withPhotos(local[a.id] ?? [], `airports/${a.id}`, a.name).filter((f) => f.note || f.photos.length),
    })),
    routes: routes.map((r) => {
      const title = r.title ?? r.path.map((id) => byId[id].name.split(",")[0]).join(" to ");
      return {
        ...r,
        title,
        points: r.path.map((id) => [byId[id].x, byId[id].y]),
        flights: withPhotos(r.flights, `routes/${r.id}`, title),
        photos: named(photosIn(`routes/${r.id}`), title),
      };
    }),
    perDegree: fix(projection([-87, 40])[0] - projection([-88, 40])[0]),
    meridians: [-91, -90, -89, -88, -87, -86, -85, -84, -83].map((lon) => [`${-lon}°W`, fix(projection([lon, 40])[0])]),
    parallels: [38, 39, 40, 41, 42, 43].map((lat) => [`${lat}°N`, fix(projection([-87, lat])[1])]),
  };
}
