import { getNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

// The CDN holds each answer for 10s, so visitors share one Spotify request.
const headers = { "Cache-Control": "public, s-maxage=10" };

export async function GET() {
  try {
    return Response.json({ track: await getNowPlaying() }, { headers });
  } catch (error) {
    console.error(error);
    return Response.json({ track: null }, { headers });
  }
}
