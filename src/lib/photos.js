import "server-only";
import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "public");

// Web formats only: HEIC straight off an iPhone will not show in most browsers.
export function photosIn(folder) {
  const dir = path.join(root, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort()
    .map((f) => ({
      src: `/${folder}/${encodeURIComponent(f)}`,
      alt: f.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " "),
    }));
}
