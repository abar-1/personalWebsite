// Sorts photos into the flight they were taken on.
//
//   1. Put originals (HEIC, JPG or PNG) in photos-inbox/
//   2. npm run photos              shows where each photo would go, changes nothing
//   3. npm run photos -- --apply   copies web-sized versions into public/
//
// Originals are never moved or changed. Published copies carry no metadata, so
// locations stay private. For photos it cannot place, add photos-inbox/overrides.json:
//   { "IMG_1234.HEIC": "routes/laf-huf/2026-04-26", "IMG_9.JPG": "skip" }
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import exifr from "exifr";
import sharp from "sharp";
import * as log from "../src/data/flights.js";
import { listFlights, matchPhoto } from "./match-photo.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const inbox = process.env.PHOTOS_INBOX ?? path.join(root, "photos-inbox");
const out = process.env.PHOTOS_OUT ?? path.join(root, "public");
const apply = process.argv.includes("--apply");

if (!fs.existsSync(inbox)) {
  fs.mkdirSync(inbox);
  console.log("Created photos-inbox/. Put your photos in it and run this again.");
  process.exit(0);
}

const overridesFile = path.join(inbox, "overrides.json");
const overrides = fs.existsSync(overridesFile) ? JSON.parse(fs.readFileSync(overridesFile, "utf8")) : {};
const flights = listFlights(log);
const keys = new Set(flights.map((f) => f.key));

const files = fs
  .readdirSync(inbox, { recursive: true })
  .map(String)
  .filter((f) => !path.basename(f).startsWith(".") && /\.(heic|heif|jpe?g|png|webp)$/i.test(f))
  .sort();

async function readPhoto(file) {
  let meta = {};
  try {
    // Plain strings keep the clock time where the photo was taken.
    meta = (await exifr.parse(file, { reviveValues: false, gps: true, tiff: true, exif: true, xmp: false, iptc: false })) ?? {};
  } catch {
    // No readable metadata: fall through to the file name.
  }
  const stamp = String(meta.DateTimeOriginal ?? meta.CreateDate ?? "");
  let when = stamp.match(/^(\d{4})[:-](\d\d)[:-](\d\d)[ T](\d\d):?(\d\d)/);
  // File names such as IMG_20260430_141500.jpg or 2026-04-30 14.15.00.png
  when ??= path.basename(file).match(/(20\d\d)[-_]?(\d\d)[-_]?(\d\d)(?:[-_ T]+(\d\d)[-_.:]?(\d\d))?/);
  const date = when && Number(when[2]) <= 12 && Number(when[3]) <= 31 ? `${when[1]}-${when[2]}-${when[3]}` : null;
  const { latitude: lat, longitude: lon } = meta;
  const located = Number.isFinite(lat) && Number.isFinite(lon) && (lat !== 0 || lon !== 0);
  return {
    date,
    hour: date && when[4] ? Number(when[4]) : null,
    time: date && when[4] ? `${when[4]}${when[5]}` : "0000",
    gps: located ? { lat, lon } : null,
  };
}

async function publish(file, key, time) {
  const dir = path.join(out, key);
  const id = createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 8);
  const target = path.join(dir, `${time}-${id}.jpg`);
  if (fs.existsSync(target)) return false;
  fs.mkdirSync(dir, { recursive: true });
  let source = file;
  let temp = null;
  try {
    if (/\.hei[cf]$/i.test(file)) {
      temp = fs.mkdtempSync(path.join(os.tmpdir(), "photo-"));
      source = path.join(temp, "photo.jpg");
      execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "95", file, "--out", source], { stdio: "ignore" });
    }
    // sharp drops all metadata, including location, unless told to keep it.
    await sharp(source)
      .rotate()
      .resize(2000, 2000, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(target);
  } finally {
    if (temp) fs.rmSync(temp, { recursive: true, force: true });
  }
  return true;
}

const placed = {};
const review = [];
let skipped = 0;
for (const name of files) {
  const file = path.join(inbox, name);
  const photo = await readPhoto(file);
  const forced = overrides[name] ?? overrides[path.basename(name)];
  let result;
  if (forced === "skip") {
    skipped++;
    continue;
  }
  if (forced) result = keys.has(forced) ? { status: "match", key: forced, why: "your override" } : { status: "review", why: `override "${forced}" is not a flight` };
  else result = matchPhoto(photo, flights);
  if (result.status === "match") (placed[result.key] ??= []).push({ name, file, photo, why: result.why });
  else review.push({ name, ...result });
}

for (const [key, list] of Object.entries(placed).sort()) {
  console.log(`\n${key}`);
  for (const p of list) console.log(`  ${p.name}  (${p.why})`);
}
if (review.length) {
  console.log("\nNeeds you (add to photos-inbox/overrides.json):");
  for (const r of review) console.log(`  ${r.name}: ${r.why}${r.guess ? ` (maybe ${r.guess})` : ""}`);
}

const total = Object.values(placed).flat();
console.log(`\n${files.length} photos: ${total.length} placed, ${review.length} need you, ${skipped} skipped.`);
if (!apply) {
  console.log("Nothing was changed. Run npm run photos -- --apply to publish the placed ones.");
} else {
  let added = 0;
  let failed = 0;
  for (const [key, list] of Object.entries(placed))
    for (const p of list) {
      try {
        if (await publish(p.file, key, p.photo.time)) added++;
      } catch (error) {
        failed++;
        console.error(`  could not convert ${p.name}: ${error.message}`);
      }
    }
  console.log(`Added ${added} new, ${total.length - added - failed} already there${failed ? `, ${failed} failed` : ""}.`);
  if (failed) process.exitCode = 1;
}
