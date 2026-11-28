"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const clock = (ms) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

function Progress({ track }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const done = Math.max(0, Math.min(track.duration, now - track.startedAt));
  return (
    <span className="np__progress" aria-hidden="true">
      {clock(done)}
      <span className="np__line"><i style={{ transform: `scaleX(${done / track.duration})` }} /></span>
      {clock(track.duration)}
    </span>
  );
}

// A moving card while a song plays, a still one when nothing is on. demoTrack is for /dev/stress.
export default function NowPlaying({ demoTrack }) {
  const [track, setTrack] = useState(undefined); // undefined until the first answer

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      if (document.hidden) return;
      if (demoTrack !== undefined) return setTrack(demoTrack);
      try {
        const res = await fetch("/api/now-playing", { signal: controller.signal });
        if (!res.ok) throw new Error(`Now playing failed: ${res.status}`);
        setTrack((await res.json()).track);
      } catch {
        // Offline or failing: keep what is showing, or fall back to the message.
        if (!controller.signal.aborted) setTrack((now) => now ?? null);
      }
    };
    load();
    const timer = setInterval(load, 15000);
    document.addEventListener("visibilitychange", load);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", load);
      controller.abort();
    };
  }, [demoTrack]);

  if (track === undefined) return <div className="np np--idle" aria-hidden="true" />;
  if (track === null)
    return (
      <div className="np np--idle">
        <span className="np__record"><span className="np__label" /></span>
        <span className="np__text">
          <span className="np__title">Nothing playing right now</span>
        </span>
      </div>
    );

  const Tag = track.href ? "a" : "div";
  const link = track.href ? { href: track.href, target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Tag className="np" {...link}>
      {track.cover && <span className="np__wash" style={{ backgroundImage: `url("${track.cover}")` }} />}
      <span className="np__record">
        <span className="np__label">
          {track.cover && <Image src={track.cover} alt="" fill sizes="80px" unoptimized />}
        </span>
      </span>
      <span className="np__text">
        <span className="np__status">
          <span className="np__bars" aria-hidden="true"><i /><i /><i /><i /></span>
          Playing now
        </span>
        <span className="np__title">{track.title}</span>
        <span className="np__artist">{track.artist}</span>
        {track.duration > 0 && <Progress track={track} />}
      </span>
    </Tag>
  );
}
