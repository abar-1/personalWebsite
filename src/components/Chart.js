"use client";

import { useEffect, useRef, useState } from "react";
import Gallery from "./Gallery";

const ROSE = Array.from({ length: 72 }, (_, i) => i * 5);
const STOP_LABEL = {
  up: { x: 0, y: -18, anchor: "middle" },
  right: { x: 22, y: -8, anchor: "start" },
  below: { x: 0, y: 44, anchor: "middle" },
  left: { x: -46, y: -34, anchor: "middle" },
};
const PORT_LABEL = {
  up: { x: 0, y: -11, anchor: "middle" },
  right: { x: 11, y: 5, anchor: "start" },
  below: { x: 0, y: 21, anchor: "middle" },
  left: { x: -11, y: 5, anchor: "end" },
};
const LEG_MS = 950; // keep in step with --fly in globals.css
const SWAY = [-1, 0, 1]; // the travel map is drawn three times side by side so it wraps

// Smooth zoom between two views, each [centre x, centre y, width] in chart
// units (van Wijk and Nuij). It zooms out, pans, then zooms in, so the scale
// and position change together instead of the view swinging off course.
function zoomPath([ux0, uy0, w0], [ux1, uy1, w1]) {
  const rho = Math.SQRT2;
  const [dx, dy] = [ux1 - ux0, uy1 - uy0];
  const d2 = dx * dx + dy * dy;
  let at;
  let S;
  if (d2 < 1e-12) {
    S = Math.log(w1 / w0) / rho;
    at = (t) => [ux0 + t * dx, uy0 + t * dy, w0 * Math.exp(rho * t * S)];
  } else {
    const d1 = Math.sqrt(d2);
    const b0 = (w1 * w1 - w0 * w0 + 4 * d2) / (2 * w0 * 2 * d1);
    const b1 = (w1 * w1 - w0 * w0 - 4 * d2) / (2 * w1 * 2 * d1);
    const r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0);
    const r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    at = (t) => {
      const s = t * S;
      const u = (w0 / (2 * d1)) * (Math.cosh(r0) * Math.tanh(rho * s + r0) - Math.sinh(r0));
      return [ux0 + u * dx, uy0 + u * dy, (w0 * Math.cosh(r0)) / Math.cosh(rho * s + r0)];
    };
  }
  at.duration = Math.abs(S) * 1000;
  return at;
}
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Distance from a point to a line segment.
function toSegment([px, py], [ax, ay], [bx, by]) {
  const [dx, dy] = [bx - ax, by - ay];
  const len = dx * dx + dy * dy;
  const t = len ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len)) : 0;
  return Math.hypot(px - ax - t * dx, py - ay - t * dy);
}

function Card({ title, line, note, item, routes = [], onRoute, onClose }) {
  const loose = item.photos ?? [];
  const heading = useRef(null);

  // The card sits in the chart, far from whatever opened it, so focus moves in
  // when it opens and goes back to the opener once it closes.
  useEffect(() => {
    const opener = document.activeElement;
    heading.current?.focus({ preventScroll: true });
    return () => {
      const lost = !document.activeElement || document.activeElement === document.body;
      if (lost && opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  return (
    <section className="flight" aria-label={title}>
      <header>
        <div>
          <h3 ref={heading} tabIndex={-1}>{title}</h3>
          <p className="muted">{line}</p>
        </div>
        <button type="button" className="flight__close" onClick={onClose}>Close</button>
      </header>
      {note && <p>{note}</p>}
      {item.flights.map((f) => (
        <div key={f.date} className="flight__entry">
          <p><span>{f.day}</span>{f.note && <span className="muted">{f.note}</span>}</p>
          {f.photos.length > 0 && <Gallery photos={f.photos} title={title} />}
        </div>
      ))}
      {loose.length > 0 && <Gallery photos={loose} title={title} />}
      {routes.length > 0 && (
        <>
        <p className="muted">Routes from here</p>
        <ul className="chips flight__routes">
          {routes.map((r) => (
            <li key={r.id}><button type="button" onClick={() => onRoute(r.id)}>{r.title.replace(`${title.split(",")[0]} to `, "")}</button></li>
          ))}
        </ul>
        </>
      )}
    </section>
  );
}

export default function Chart({ chart, home }) {
  const { stops, airports, routes, trips, globe, perDegree } = chart;
  const root = useRef(null);
  const timers = useRef([]);
  const homeStop = stops.find((s) => s.id === home);
  const [box, setBox] = useState({ w: 576, h: 900, ready: false });
  // Only a visitor's own action animates the camera. Loading and resizing do not.
  const [animate, setAnimate] = useState(false);
  const [mode, setMode] = useState("travel");
  // A camera the visitor set by zooming or dragging. Null follows the picked item.
  const [view, setView] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [tip, setTip] = useState(null); // { id, k }: the trip under the pointer and which copy
  // What is on screen while the camera flies. Between flights it matches the target.
  const [shown, setShown] = useState(null);
  const shownRef = useRef(null);
  const raf = useRef(0);
  // True while changing tabs: the old markers fade, the camera flies, then the new ones appear.
  const [switching, setSwitching] = useState(false);
  const modeRef = useRef("travel");
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  const switchTo = (next) => {
    if (modeRef.current !== next) setSwitching(true);
    setMode(next);
  };
  const drag = useRef(null);
  const [pick, setPick] = useState(null); // { kind: "stop" | "airport" | "route", id }
  const [hover, setHover] = useState(null);
  const [plane, setPlane] = useState({ x: homeStop.x, y: homeStop.y, turn: -60 });

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect;
      if (!w || !h) return;
      setAnimate(false);
      setView(null);
      setBox({ w, h, ready: true });
    });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const moveTo = ([x, y]) =>
    setPlane((now) => {
      if (Math.hypot(x - now.x, y - now.y) < 1) return now;
      const heading = (Math.atan2(y - now.y, x - now.x) * 180) / Math.PI;
      // Turn the short way round.
      const delta = ((((heading - now.turn) % 360) + 540) % 360) - 180;
      return { x, y, turn: now.turn + delta };
    });

  const fly = (points) => {
    timers.current.forEach(clearTimeout);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timers.current = (still ? points.slice(-1) : points).map((p, i) => setTimeout(() => moveTo(p), i * LEG_MS));
  };

  const go = (id) => {
    setAnimate(true);
    setView(null);
    const stop = stops.find((s) => s.id === id);
    const airport = airports.find((a) => a.id === id);
    const route = routes.find((r) => r.id === id);
    const trip = trips.find((t) => t.id === id);
    if (trip) {
      switchTo("travel");
      setPick({ kind: "trip", id });
      fly([[trip.x, trip.y]]);
    } else if (stop) {
      switchTo("travel");
      setPick({ kind: "stop", id });
      fly([[stop.x, stop.y]]);
    } else if (airport && !airport.flights.length && routes.filter((r) => r.path.includes(id)).length === 1) {
      // An airport on a single route has nothing of its own to show: open the route.
      go(routes.find((r) => r.path.includes(id)).id);
    } else if (airport) {
      switchTo("flights");
      setPick({ kind: "airport", id });
      fly([[airport.x, airport.y]]);
    } else if (route) {
      switchTo("flights");
      setPick({ kind: "route", id });
      fly(route.points);
    }
  };

  const overview = (next) => {
    setAnimate(true);
    setView(null);
    switchTo(next);
    setPick(null);
  };

  const reset = () => {
    overview(mode);
    // The button is about to hide, so keyboard focus moves to the view switch.
    root.current.querySelector('.chart__modes [aria-pressed="true"]')?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!pick) return;
    const onKey = (e) => {
      if (e.key !== "Escape" || document.querySelector("dialog[open]")) return;
      setAnimate(true);
      setView(null);
      setPick(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pick]);

  // Go wherever the visitor clicks.
  useEffect(() => {
    const page = root.current.parentElement;
    const onClick = (e) => {
      const at = e.target.closest?.("[data-at]")?.dataset.at;
      if (!at) return;
      if (e.target.closest("a.place")) e.preventDefault();
      go(at);
    };
    page.addEventListener("click", onClick);
    return () => {
      timers.current.forEach(clearTimeout);
      page.removeEventListener("click", onClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const route = pick?.kind === "route" ? routes.find((r) => r.id === pick.id) : null;
  const spot = route || !pick ? null : ({ stop: stops, trip: trips, airport: airports })[pick.kind].find((p) => p.id === pick.id);

  // Camera: screen pixels per chart unit, and where the chart's corner sits.
  const small = box.w < 500 || box.h < 400;
  const closeUp = (small ? 250 : 380) / perDegree;
  const frame = (points, { top, right, bottom, left }, most) => {
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    const w = box.w - left - right;
    const h = box.h - top - bottom;
    const s = Math.min(w / Math.max(x1 - x0, 1), h / Math.max(y1 - y0, 1), most);
    return { s, x: left + w / 2 - ((x0 + x1) / 2) * s, y: top + h / 2 - ((y0 + y1) / 2) * s };
  };
  const xy = (p) => [p.x, p.y];
  const tight = { top: 46, right: 46, bottom: 68, left: 46 };
  let fit;
  // A trip shows its region (about 40 degrees across), not a street-level close-up.
  const region = Math.min(box.w, box.h) / (40 * perDegree);
  if (spot?.id.startsWith("trip-")) fit = { s: region, x: box.w / 2 - spot.x * region, y: box.h / 2 - spot.y * region };
  else if (spot) fit = { s: closeUp, x: box.w / 2 - spot.x * closeUp, y: box.h / 2 - spot.y * closeUp };
  else if (route)
    fit = frame(route.points, small ? tight : { top: 110, right: 80, bottom: Math.min(370, box.h * 0.42 + 40), left: 80 }, closeUp);
  else if (mode === "flights")
    fit = frame(airports.map(xy), small ? tight : { top: 100, right: 60, bottom: 80, left: 60 }, closeUp);
  else fit = frame(trips.length ? trips.map(xy) : stops.map(xy), small ? tight : { top: 100, right: 80, bottom: 80, left: 40 }, closeUp);
  const camera = view ?? fit;

  // Fly the camera to its target along a zoom path, one frame at a time, so
  // the map and the markers on it always move together.
  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const from = shownRef.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const land = () => {
      shownRef.current = camera;
      setShown(camera);
      setSwitching(false);
    };
    if (!from || !animate || still) {
      shownRef.current = camera;
      raf.current = requestAnimationFrame(land);
      return () => cancelAnimationFrame(raf.current);
    }
    const toView = (c) => [(box.w / 2 - c.x) / c.s, (box.h / 2 - c.y) / c.s, box.w / c.s];
    const path = zoomPath(toView(from), toView(camera));
    const ms = Math.min(1400, Math.max(420, path.duration * 0.45));
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / ms);
      if (t === 1) return land();
      const [vx, vy, vw] = path(easeInOut(t));
      const s = box.w / vw;
      const next = { s, x: box.w / 2 - vx * s, y: box.h / 2 - vy * s };
      shownRef.current = next;
      setShown(next);
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera.s, camera.x, camera.y, animate, box.w, box.h]);
  const cam = animate && shown ? shown : camera;

  // Close enough in to see county lines and the home places. Leaving for the
  // world, they fade a little sooner so the zoom out stays clean.
  const near = cam.s >= closeUp * (mode === "flights" ? 0.1 : 0.2);

  // Keep the travel map on screen: wrap east to west, stop at the top and bottom.
  const bound = (c) => {
    if (!globe) return c;
    const { s } = c;
    let { x, y } = c;
    const centre = (box.w / 2 - x) / s;
    x += Math.round((centre - (globe.x0 + globe.w / 2)) / globe.w) * globe.w * s;
    const tall = (globe.bottom - globe.top) * s;
    y = tall <= box.h ? (box.h - tall) / 2 - globe.top * s : Math.min(-globe.top * s, Math.max(box.h - globe.bottom * s, y));
    return { s, x, y };
  };
  // Out to a little past one whole world across; the wrap fills the sides.
  const minZoom = globe ? box.w / (1.25 * globe.w) : Math.min(box.w, box.h) / (300 * perDegree);
  const maxZoom = closeUp * 2;
  const zoom = (k) => {
    const s = Math.min(maxZoom, Math.max(minZoom, camera.s * k));
    const [cx, cy] = [box.w / 2, box.h / 2];
    setAnimate(true);
    setView(bound({ s, x: cx - ((cx - camera.x) * s) / camera.s, y: cy - ((cy - camera.y) * s) / camera.s }));
  };

  // Markers keep one size on screen however far the chart is zoomed.
  const size = (small ? 0.72 : 1) / cam.s;
  const keep = { transform: `scale(${size})` };
  const press = (id) => ({
    role: "button",
    tabIndex: 0,
    onClick: () => go(id),
    onKeyDown: (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      go(id);
    },
  });
  // Routes cross and share airports, so a click opens whichever is truly nearest
  // rather than whichever happens to be drawn on top.
  const nearest = (e) => {
    const area = root.current.getBoundingClientRect();
    const at = [(e.clientX - area.left - cam.x) / cam.s, (e.clientY - area.top - cam.y) / cam.s];
    const port = airports
      .map((a) => ({ id: a.id, d: Math.hypot(at[0] - a.x, at[1] - a.y) * cam.s }))
      .sort((a, b) => a.d - b.d)[0];
    if (port.d <= 8) return port.id;
    const line = routes
      .map((r) => ({
        id: r.id,
        d: Math.min(...r.points.slice(1).map((q, i) => toSegment(at, r.points[i], q))) * cam.s,
        photos: r.photos.length + r.flights.reduce((n, f) => n + f.photos.length, 0),
      }))
      // Where two lines overlap, prefer the one with more photos.
      .sort((a, b) => (Math.abs(a.d - b.d) < 1.5 ? b.photos - a.photos : a.d - b.d))[0];
    if (line.d <= 14) return line.id;
    return port.d <= 18 ? port.id : null;
  };
  const onChartDown = (e) => {
    // Only the travel map pans and zooms. The flight log stays framed on the routes.
    if (e.button !== 0 || mode !== "travel") return;
    e.preventDefault(); // no text selection or page scroll while dragging
    drag.current = { x: e.clientX, y: e.clientY, cam, moved: false };
  };
  const onChartUp = () => {
    if (drag.current && !drag.current.moved) drag.current = null;
    setDragging(false);
  };
  const onChartClick = (e) => {
    if (drag.current?.moved) {
      drag.current = null;
      return;
    }
    if (mode === "flights") {
      const id = nearest(e);
      if (id) return go(id);
    } else if (e.target.closest('[role="button"]')) return;
    if (pick) overview(mode);
  };
  const onChartMove = (e) => {
    const d = drag.current;
    if (d && e.buttons === 1) {
      const [dx, dy] = [e.clientX - d.x, e.clientY - d.y];
      if (!d.moved && Math.hypot(dx, dy) < 5) return;
      if (!d.moved) {
        d.moved = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        setHover(null);
      }
      setAnimate(false);
      setView(bound({ ...d.cam, x: d.cam.x + dx, y: d.cam.y + dy }));
      return;
    }
    if (e.pointerType === "mouse") setHover(mode === "flights" ? nearest(e) : null);
  };
  const on = (kind, id) => pick?.kind === kind && pick.id === id;

  return (
    <aside ref={root} id="chart" className="chart" data-mode={mode} data-near={near} data-ready={box.ready} data-animate={animate} aria-label="Chart of places and flights">
      <svg onClick={onChartClick} onPointerDown={onChartDown} onPointerMove={onChartMove} onPointerUp={onChartUp} onPointerCancel={onChartUp} onPointerLeave={() => setHover(null)} style={{ cursor: dragging ? "grabbing" : hover ? "pointer" : undefined }}>
        <g className="camera" style={{ transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.s})` }}>
          {chart.world && SWAY.map((k) => <path key={k} className="chart__world" d={chart.world} transform={k ? `translate(${k * globe.w} 0)` : undefined} />)}
          <path className="chart__land" d={chart.land} />
          <path className="chart__counties" d={chart.counties} />
          <path className="chart__states" d={chart.states} />
          <g aria-hidden="true">
            {chart.meridians.map(([t, x]) => (
              <path key={t} className="chart__grid" d={`M${x} -250V1190`} />
            ))}
            {chart.parallels.map(([t, y]) => (
              <path key={t} className="chart__grid" d={`M-700 ${y}H1340`} />
            ))}
            <g className="chart__rose" transform={`translate(${homeStop.x} ${homeStop.y})`}>
              <circle r="62" />
              {ROSE.map((deg) => (
                <path key={deg} d={`M0 -62V${deg % 30 === 0 ? -54 : deg % 10 === 0 ? -57 : -59}`} transform={`rotate(${deg})`} />
              ))}
              {ROSE.filter((d) => d % 30 === 0).map((deg) => (
                <text key={deg} textAnchor="middle" transform={`rotate(${deg}) translate(0 -46)`}>{deg / 10}</text>
              ))}
            </g>
          </g>

          <g className="layer routes-layer" data-show={mode === "flights" && !switching} data-picked={Boolean(route)}>
            {[...routes].sort((a, b) => Number(Boolean(a.featured)) - Number(Boolean(b.featured)) || (on("route", a.id) ? 1 : -1)).map((r) => {
              const d = `M${r.points.map((p) => p.join(" ")).join("L")}`;
              const [a, b] = [r.points[1], r.points[2]];
              let angle = a && b ? (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI : 0;
              if (Math.abs(angle) > 90) angle += 180;
              return (
                <g key={r.id} className="route" data-featured={Boolean(r.featured)} aria-label={`Flight: ${r.title}, ${r.path.join(" ")}`} data-hover={hover === r.id} aria-pressed={on("route", r.id)} {...press(r.id)} onClick={undefined} tabIndex={mode === "flights" ? 0 : -1}>
                  <path className="route__line" d={d} />
                  {r.featured && (
                    <g transform={`translate(${(a[0] + b[0]) / 2} ${(a[1] + b[1]) / 2}) rotate(${angle})`}>
                      <text className="route__label keep" style={keep} y="20" textAnchor="middle">{r.title}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>

          <g className="layer" data-show={mode === "flights" && !switching}>
            {airports.map((a) => {
              const l = PORT_LABEL[a.label];
              return (
                <g key={a.id} transform={`translate(${a.x} ${a.y})`}>
                  <g className="port keep" style={keep} aria-label={`${a.id}, ${a.name}`} data-hover={hover === a.id} aria-pressed={on("airport", a.id)} {...press(a.id)} onClick={undefined} tabIndex={mode === "flights" ? 0 : -1}>
                    <title>{a.name}</title>
                    <circle r="12" fill="transparent" />
                    <circle className="port__dot" r="4.5" />
                    <text x={l.x} y={l.y} textAnchor={l.anchor}>{a.id}</text>
                  </g>
                </g>
              );
            })}
          </g>

          <g className="layer" data-show={mode === "travel" && near && !switching}>
            {stops.map((s) => {
              const l = STOP_LABEL[s.label];
              return (
                <g key={s.id} transform={`translate(${s.x} ${s.y})`}>
                  <g className="stop keep" style={keep} data-side={s.label} aria-label={[s.name, s.note].filter(Boolean).join(": ")} aria-pressed={on("stop", s.id)} {...press(s.id)} tabIndex={mode === "travel" && near ? 0 : -1}>
                    <circle className="stop__hit" r="22" fill="transparent" />
                    <circle className="stop__dot" r="7" />
                    <text className="stop__name" x={l.x} y={l.y} textAnchor={l.anchor}>{s.name}</text>
                    {s.note && <text className="stop__note" x={l.x} y={l.y + 19} textAnchor={l.anchor}>{s.note}</text>}
                  </g>
                </g>
              );
            })}
          </g>

          <g className="layer" data-show={mode === "travel" && !switching}>
            {(globe ? SWAY : [0]).flatMap((k) => trips.map((t) => (
              <g key={`${k}-${t.id}`} transform={`translate(${t.x + (k ? k * globe.w : 0)} ${t.y})`} aria-hidden={k ? true : undefined}>
                <g className="trip keep" style={keep} onPointerEnter={() => setTip({ id: t.id, k })} onPointerLeave={() => setTip(null)} onFocus={() => setTip({ id: t.id, k })} onBlur={() => setTip(null)} aria-label={`${t.name}, ${[t.country, t.year].filter(Boolean).join(", ")}`} aria-pressed={on("trip", t.id)} {...press(t.id)} tabIndex={mode === "travel" && !k ? 0 : -1}>
                  <title>{t.name}</title>
                  <circle r="12" fill="transparent" />
                  <circle className="trip__dot" r="5" />
                </g>
              </g>
            )))}
          </g>

          <g className="plane" aria-hidden="true" style={{ transform: `translate(${plane.x}px, ${plane.y}px)` }}>
            <g className="keep" style={keep}>
              <g className="plane__size" style={{ transform: `scale(${pick ? 1 : 0.75})` }}>
              <g className="plane__turn" style={{ transform: `rotate(${plane.turn}deg)` }}>
                <path className="plane__body" d="M-20 -13L-20 13Q-20 14 -21 14L-26 13L-27 -13L-21 -14Q-20 -14 -20 -13Z" />
                <path className="plane__body" d="M25 0C25 -4 21 -6 15 -6L-2 -5L-25 -2V2L-2 5L15 6C21 6 25 4 25 0Z" />
                <path className="plane__body" d="M11 -14V14L9 39Q9 41 7 41H2Q0 41 0 39L-3 14V-14L0 -39Q0 -41 2 -41H7Q9 -41 9 -39Z" />
                <path className="plane__red" d="M10.5 -22L9.3 -36H0.3L-1.4 -22ZM10.5 22L9.3 36H0.3L-1.4 22Z" />
                <path className="plane__blue" d="M-4 -1.2H-24V1.2H-4ZM16 -4.4L12.5 -4.6V4.6L16 4.4Z" />
                <path className="plane__prop" d="M26 -10V10" />
              </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

      {(() => {
        const t = !dragging && !switching && mode === "travel" && tip && trips.find((p) => p.id === tip.id);
        return t ? (
          <div className="chart__tip" aria-hidden="true" style={{ left: cam.x + (t.x + (tip.k ? tip.k * globe.w : 0)) * cam.s, top: cam.y + t.y * cam.s }}>
            <b>{t.name}</b>
            <span>{[t.country !== t.name && t.country, t.year].filter(Boolean).join(", ")}</span>
          </div>
        ) : null;
      })()}

      <div className="chart__modes" role="group" aria-label="What the chart shows">
        <button type="button" aria-pressed={mode === "travel"} onClick={() => overview("travel")}>Travel</button>
        <button type="button" aria-pressed={mode === "flights"} onClick={() => overview("flights")}>Flight log</button>
      </div>
      <button type="button" className="chart__reset" data-show={Boolean(pick || view)} inert={!pick && !view} onClick={reset}>Reset view</button>
      {mode === "travel" && <div className="chart__zoom" role="group" aria-label="Zoom">
        <button type="button" aria-label="Zoom in" disabled={camera.s >= maxZoom} onClick={() => zoom(1.6)}>+</button>
        <button type="button" aria-label="Zoom out" disabled={camera.s <= minZoom} onClick={() => zoom(1 / 1.6)}>&minus;</button>
      </div>}
      <p className="chart__note">Not for navigation</p>

      {route && (
        <Card key={route.id} title={route.title} line={route.path.join(" – ")} item={route} onClose={() => overview("flights")} />
      )}
      {pick?.kind === "trip" && spot && (
        <Card key={spot.id} title={spot.name} line={[spot.country, spot.year].filter(Boolean).join(", ")} note={spot.note} item={{ flights: [] }} onClose={() => overview("travel")} />
      )}
      {pick?.kind === "airport" && spot && (
        <Card key={spot.id} title={spot.name} line={spot.id} item={spot} routes={routes.filter((r) => r.path.includes(spot.id))} onRoute={go} onClose={() => overview("flights")} />
      )}
    </aside>
  );
}
