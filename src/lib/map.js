import "server-only";
import { geoBounds, geoEqualEarth, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import land from "world-atlas/land-110m.json";

const W = 1200;
const H = 560;

// A tight cluster of places gets a regional map; anything wider gets the world.
export function buildMap(places) {
  const points = { type: "MultiPoint", coordinates: places.map((p) => [p.lon, p.lat]) };
  const [[west, south], [east, north]] = geoBounds(points);
  const regional = east >= west && east - west < 70 && north - south < 50;

  let projection;
  if (regional) {
    const pad = (span) => Math.max(span * 0.15, 8);
    const x = pad(east - west);
    const y = pad(north - south);
    projection = geoMercator().fitSize([W, H], {
      type: "MultiPoint",
      coordinates: [
        [west - x, Math.max(south - y, -75)],
        [east + x, Math.min(north + y, 75)],
      ],
    });
  } else {
    projection = geoEqualEarth().fitSize([W, H], {
      type: "MultiPoint",
      coordinates: [[-170, 0], [179, 0], [0, 78], [0, -56]],
    });
  }
  projection.clipExtent([[0, 0], [W, H]]);

  return {
    width: W,
    height: H,
    path: geoPath(projection)(feature(land, land.objects.land)),
    places: places.map((p) => {
      const [x, y] = projection([p.lon, p.lat]);
      return { ...p, x: (x / W) * 100, y: (y / H) * 100 };
    }),
  };
}
