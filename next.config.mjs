/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Spotify album art
    remotePatterns: [{ protocol: "https", hostname: "i.scdn.co", pathname: "/image/**" }],
  },
};

export default nextConfig;
