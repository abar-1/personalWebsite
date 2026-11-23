// One-time helper that prints your Spotify refresh token.
// 1. Create an app at developer.spotify.com/dashboard (needs Spotify Premium).
// 2. Add the redirect URI http://127.0.0.1:8888/callback
// 3. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local, then run:
//    node --env-file=.env.local scripts/spotify-token.mjs
import http from "node:http";
import { randomUUID } from "node:crypto";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local first.");
  process.exit(1);
}

const redirect_uri = "http://127.0.0.1:8888/callback";
const state = randomUUID();
const query = new URLSearchParams({
  client_id: id,
  response_type: "code",
  redirect_uri,
  state,
  scope: "user-top-read user-read-currently-playing",
});

http
  .createServer(async (req, res) => {
    const url = new URL(req.url, redirect_uri);
    if (url.pathname !== "/callback") return res.writeHead(404).end();
    if (url.searchParams.get("state") !== state || !url.searchParams.get("code")) {
      return res.writeHead(400).end("Authorization failed. Check the terminal and try again.");
    }
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ grant_type: "authorization_code", code: url.searchParams.get("code"), redirect_uri }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(data);
      res.writeHead(500).end("Spotify refused the request. See the terminal.");
      process.exit(1);
    }
    res.end("Done. You can close this tab.");
    console.log(`\nAdd this to .env.local and your host's environment:\nSPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    process.exit(0);
  })
  .listen(8888, "127.0.0.1", () => console.log(`Open this link:\nhttps://accounts.spotify.com/authorize?${query}`));
