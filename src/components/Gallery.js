"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Thumbnails that open full screen. Swipe, arrow keys or buttons move between them.
export default function Gallery({ photos, title }) {
  const dialog = useRef(null);
  const track = useRef(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const jump = (i, behavior) => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior });
  const show = (i) => {
    setIndex(i);
    setOpen(true);
    dialog.current.showModal();
    requestAnimationFrame(() => requestAnimationFrame(() => jump(i, "instant")));
  };
  const step = (by, behavior) => {
    const next = Math.max(0, Math.min(photos.length - 1, index + by));
    setIndex(next);
    jump(next, behavior);
  };
  const smooth = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth");
  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    step(e.key === "ArrowRight" ? 1 : -1, "instant");
  };

  return (
    <>
      <ul className="thumbs">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" onClick={() => show(i)} aria-label={`View ${title}, ${p.alt}, full screen`}>
              <Image src={p.src} alt="" fill sizes="240px" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="viewer"
        aria-label={`${title} pictures`}
        onClose={() => setOpen(false)}
        onKeyDown={onKeyDown}
      >
        {open && (
          <div
            ref={track}
            className="viewer__track"
            onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          >
            {photos.map((p) => (
              <div key={p.src} className="viewer__slide" onClick={(e) => e.target === e.currentTarget && dialog.current.close()}>
                <div className="viewer__frame">
                  <Image src={p.src} alt={`${title}, ${p.alt}`} fill sizes="100vw" />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="viewer__bar">
          {photos.length > 1 && (
            <>
              <button type="button" onClick={() => step(-1, smooth())} disabled={index === 0}>Previous</button>
              <span aria-live="polite">{index + 1} of {photos.length}</span>
              <button type="button" onClick={() => step(1, smooth())} disabled={index === photos.length - 1}>Next</button>
            </>
          )}
          <button type="button" onClick={() => dialog.current.close()}>Close</button>
        </div>
      </dialog>
    </>
  );
}
