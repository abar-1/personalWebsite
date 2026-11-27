"use client";

import { useEffect, useState } from "react";
import TopLists from "./TopLists";

// Used when the page was built without top lists (Spotify didn't answer during
// the build): fetch them once in the browser from the cached API route.
export default function LiveTop() {
  const [top, setTop] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/top", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setTop(data))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!top) return null;
  return <TopLists tracks={top.tracks ?? []} artists={top.artists ?? []} />;
}
