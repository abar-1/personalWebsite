"use client";

import Image from "next/image";
import { useState } from "react";

export default function TravelMap({ map }) {
  const [active, setActive] = useState(0);
  const place = map.places[active];
  return (
    <div className="travel">
      <div className="map" style={{ aspectRatio: `${map.width} / ${map.height}` }}>
        <svg viewBox={`0 0 ${map.width} ${map.height}`} aria-hidden="true">
          <path d={map.path} />
        </svg>
        {map.places.map((p, i) => (
          <button
            key={`${p.name}-${i}`}
            type="button"
            className="pin"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            aria-label={`${p.name}, ${p.country}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      <div className="travel__detail" aria-live="polite">
        {place.photo && (
          <div className="frame travel__photo">
            <Image key={place.photo} src={place.photo} alt={`${place.name}, ${place.country}`} fill sizes="(max-width: 640px) 100vw, 220px" />
          </div>
        )}
        <div>
          <h3>{place.name}</h3>
          <p className="muted">{[place.country, place.year].filter(Boolean).join(", ")}</p>
          {place.note && <p>{place.note}</p>}
        </div>
      </div>
      <ul className="chips">
        {map.places.map((p, i) => (
          <li key={`${p.name}-${i}`}>
            <button type="button" aria-pressed={i === active} onClick={() => setActive(i)}>{p.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
