import "server-only";
import { geoMercator, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import us from "us-atlas/counties-10m.json";
import { photosIn } from "./photos";

const W = 640;
const H = 940;
const fix = (n) => +n.toFixed(1);

// Draws the base map once in chart units. The browser pans and zooms it.
export function buildChart({ stops, airports, routes }) {
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
    airports: spots,
    routes: routes.map((r) => ({
      ...r,
      title: r.title ?? r.path.map((id) => byId[id].name.split(",")[0]).join(" to "),
      points: r.path.map((id) => [byId[id].x, byId[id].y]),
      photos: photosIn(`routes/${r.id}`),
    })),
    perDegree: fix(projection([-87, 40])[0] - projection([-88, 40])[0]),
    meridians: [-91, -90, -89, -88, -87, -86, -85, -84, -83].map((lon) => [`${-lon}°W`, fix(projection([lon, 40])[0])]),
    parallels: [38, 39, 40, 41, 42, 43].map((lat) => [`${lat}°N`, fix(projection([-87, lat])[1])]),
  };
}
