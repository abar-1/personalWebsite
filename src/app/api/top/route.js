import { getTop } from "@/lib/spotify";

export const dynamic = "force-dynamic";

// Top lists change slowly: the CDN keeps a good answer for an hour and can serve
// it stale for a day while it refreshes. Failures are never cached.
const cached = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };
const uncached = { "Cache-Control": "no-store" };

export async function GET(request) {
  const url = new URL(request.url);
  // A query string would get its own CDN cache entry and skip the shared one.
  if (url.search) {
    url.search = "";
    return Response.redirect(url, 308);
  }

  const top = await getTop();
  if (!top) return Response.json({ error: "unavailable" }, { status: 502, headers: uncached });
  return Response.json(top, { headers: cached });
}
