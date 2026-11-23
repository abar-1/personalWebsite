import Image from "next/image";
import Chart from "./Chart";
import TravelMap from "./TravelMap";
import Gallery from "./Gallery";
import Icon from "./Icons";
import Music from "./Music";
import { buildMap } from "@/lib/map";
import { buildChart } from "@/lib/chart";
import avatar from "@/app/assets/avatar.jpg";

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function Portfolio({ data }) {
  const { person, log, stops, homeBase, about, roles, projects, resume, flying, places, tracks, artists, live } = data;
  const map = places.length ? buildMap(places) : null;

  return (
    <main className="page">
      <Chart chart={buildChart({ stops, airports: log.airports, routes: log.routes })} home={homeBase} />
      <div className="content">
      <header className="top">
        <Image className="avatar" src={avatar} alt="" width={144} height={144} priority />
        <div>
          <h1>{person.name}</h1>
          <p className="muted">{person.line}</p>
        </div>
        <nav className="links" aria-label="Contact and profiles">
          {person.socials.map(([text, href]) => (
            <a key={text} className="round" href={href} aria-label={text} title={text} {...external}><Icon name={text} /></a>
          ))}
          <a className="round" href={`mailto:${person.email}`} aria-label="Email" title="Email"><Icon name="Email" /></a>
          {resume && <a className="round" href={resume} aria-label="Résumé" title="Résumé" {...external}><Icon name="Résumé" /></a>}
        </nav>
        <p className="more">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 3v12M4 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>More about me below: <a href="#music">my music</a> and <a href="#flying">my flying photos</a></span>
        </p>
      </header>

      {about.length > 0 && (
        <section>
          <h2>About</h2>
          <div className="about">
            {about.map((parts, i) => (
              <p key={i}>
                {parts.map((part, j) =>
                  typeof part === "string" ? part : (
                    <a key={j} href="#chart" className="place" data-at={part[1]}>{part[0]}</a>
                  )
                )}
              </p>
            ))}
          </div>
        </section>
      )}

      {roles.length > 0 && (
        <section>
          <h2>Experience</h2>
          <ul className="roles">
            {roles.map((r, i) => (
              <li key={i} data-at={r.at}>
                <div className="row">
                  <h3>{r.at ? <button type="button">{r.company}</button> : r.company}</h3>
                  <span className="muted">{r.when}</span>
                </div>
                <p className="muted">{r.title}</p>
                {r.body && <p>{r.body}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          <div className="projects">
            {projects.map((p) => (
              <details key={p.title}>
                <summary data-at={p.at}>
                  <span className="summary__text">
                    <b>{p.title}</b>
                    {p.line && <span className="muted">{p.line}</span>}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3.5 6 8 10.5 12.5 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="projects__body">
                  <p>{p.body}</p>
                  {p.pictures?.length > 0 && <Gallery photos={p.pictures} title={p.title} />}
                  {p.stack && <p className="muted">{p.stack}</p>}
                  {p.href && <a className="link" href={p.href} {...external}>See the code</a>}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      <section id="music">
        <h2>Listening to</h2>
        {tracks.length > 0 || live ? (
          <Music tracks={tracks} artists={artists} live={live} demoTrack={data.demoTrack} />
        ) : (
          <div className="soon">
            <p className="muted">My top artists and songs from Spotify will show up here.</p>
            <ul className="tracks" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <li key={i} className="track"><i /><span><i /><i /></span></li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section id="flying">
        <h2>Flying</h2>
        <p className="flying__lead">
          {log.totals.hours} hours, {log.totals.flights} flights and {log.airports.length} airports so far. Pick a route to fly it on the map.
        </p>
        <ul className="chips flying__routes">
          {log.routes.map((r) => (
            <li key={r.id}>
              <button type="button" data-at={r.id} data-featured={Boolean(r.featured)}>{r.title ?? r.path.join(" – ")}</button>
            </li>
          ))}
        </ul>
        {flying.length > 0 ? (
          <Gallery photos={flying} title="Flying" />
        ) : (
          <div className="soon">
            <p className="muted">Photos from the cockpit are on the way.</p>
            <ul className="photos-soon" aria-hidden="true"><li /><li /><li /></ul>
          </div>
        )}
      </section>

      {map && (
        <section>
          <h2>Places I&rsquo;ve been</h2>
          <TravelMap map={map} />
        </section>
      )}
      </div>
    </main>
  );
}
