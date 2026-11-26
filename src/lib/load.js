import "server-only";
import * as site from "@/data/site";
import * as log from "@/data/flights";
import { places } from "@/data/travel";
import { picks } from "@/data/music";
import { photosIn } from "./photos";
import { getTop, spotifyConfigured } from "./spotify";

export async function loadData() {
  const top = await getTop();
  return {
    ...site,
    log,
    places,
    projects: site.projects.map((p) => ({ ...p, pictures: photosIn(p.photos) })),
    flying: photosIn("flying"),
    tracks: top?.tracks ?? picks,
    artists: top?.artists ?? [],
    live: spotifyConfigured,
  };
}
