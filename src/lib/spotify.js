import "server-only";
import { unstable_cache } from "next/cache";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret, SPOTIFY_REFRESH_TOKEN: refresh } = process.env;

export const spotifyConfigured = Boolean(id && secret && refresh);

let cached = null;

async function accessToken() {
  if (cached && cached.expires > Date.now()) return cached.token;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refresh }),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`Spotify token request failed: ${res.status}`);
  const data = await res.json();
  cached = { token: data.access_token, expires: Date.now() + (data.expires_in - 60) * 1000 };
  return cached.token;
}

async function get(path, options) {
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${await accessToken()}` },
    signal: AbortSignal.timeout(5000),
    ...options,
  });
  if (res.status === 204) return null;
  if (!res.ok) throw new Error(`Spotify ${path} failed: ${res.status}`);
  return res.json();
}

const toTrack = (t) => ({
  title: t.name,
  artist: t.artists.map((a) => a.name).join(", "),
  href: t.external_urls?.spotify ?? null,
  image: t.album?.images?.at(-1)?.url ?? null,
  cover: t.album?.images?.[0]?.url ?? null,
});

// Refreshed hourly. It throws on failure so a bad answer is never cached.
const fetchTop = unstable_cache(
  async () => {
    const artists = await get("/me/top/artists?time_range=medium_term&limit=6", { cache: "no-store" });
    return {
      artists: artists.items.map((a) => ({
        name: a.name,
        href: a.external_urls?.spotify ?? null,
        image: (a.images?.find((i) => i.width <= 400) ?? a.images?.[0])?.url ?? null,
      })),
    };
  },
  ["spotify-top-artists"],
  { revalidate: 3600 }
);

// Returns null on any failure so the page falls back to the hand-picked list.
export async function getTop() {
  if (!spotifyConfigured) return null;
  try {
    return await fetchTop();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getNowPlaying() {
  if (!spotifyConfigured) return null;
  const data = await get("/me/player/currently-playing", { cache: "no-store" });
  if (!data?.is_playing || data.currently_playing_type !== "track" || !data.item) return null;
  return {
    ...toTrack(data.item),
    duration: data.item.duration_ms,
    // When the song began, so the page can work out progress on its own.
    startedAt: Date.now() - (data.progress_ms ?? 0),
  };
}
