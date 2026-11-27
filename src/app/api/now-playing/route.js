import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

// The CDN holds each answer for 10s, so visitors share one Spotify request.
const cached = { "Cache-Control": "public, s-maxage=10" };
const uncached = { "Cache-Control": "no-store" };

// A light per-instance limit for anyone calling the function directly. The CDN
// cache absorbs normal traffic, so real visitors never get near it.
const WINDOW_MS = 60_000;
const LIMIT = 30;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, entry] of hits) if (now - entry.start > WINDOW_MS) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

export async function GET(request) {
  const url = new URL(request.url);
  // A query string would get its own CDN cache entry and skip the shared one.
  if (url.search) {
    url.search = "";
    return Response.redirect(url, 308);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ track: null }, { status: 429, headers: { ...uncached, "Retry-After": "60" } });
  }

  try {
    return Response.json({ track: await getNowPlaying() }, { headers: cached });
  } catch (error) {
    console.error(error);
    return Response.json({ track: null }, { headers: cached });
  }
}
