import Image from "next/image";
import Chart from "./Chart";
import Gallery from "./Gallery";
import Icon from "./Icons";
import Music from "./Music";
import CopyEmail from "./CopyEmail";
import { albums, buildChart } from "@/lib/chart";
import avatar from "@/app/assets/avatar.jpg";

const external = { target: "_blank", rel: "noopener noreferrer" };

export default function Portfolio({ data }) {
  const { person, log, stops, homeBase, about, roles, projects, skills, education, contact, flying, places, artists, live } = data;
  const trips = places.map((p, i) => ({ ...p, id: `trip-${i}` }));
  const chart = buildChart({ stops, airports: log.airports, routes: log.routes, local: log.local, trips });
  const shown = albums(chart);
  const others = chart.routes.filter((r) => !shown.some((a) => a.id === r.id));

  return (
    <main className="page">
      <Chart chart={chart} home={homeBase} />
      <div className="content">
      <header className="top">
        <Image className="avatar" src={avatar} alt="" width={144} height={144} priority />
        <div>
          <h1>{person.name}</h1>
          <p className="muted">{person.line}</p>
          {person.seeking && <p className="seeking">{person.seeking}</p>}
        </div>
        <nav className="links" aria-label="Contact and profiles">
          {person.socials.map(([text, href]) => (
            <a key={text} className="round" href={href} aria-label={text} title={text} {...external}><Icon name={text} /></a>
          ))}
          <a className="round" href={`mailto:${person.email}`} aria-label="Email" title="Email"><Icon name="Email" /></a>
        </nav>
        <p className="more">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M9 3v12M4 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>More about me below: <a href="#music">what I listen to</a>, <a href="#flying">my flying photos</a> and <a href="#contact">how to reach me</a></span>
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
          <ul className="roles roles--timeline">
            {roles.map((r, i) => (
              <li key={i} data-at={r.at} data-now={/now/i.test(r.when) || undefined}>
                <div className="row">
                  <h3>{r.at ? <button type="button">{r.company}</button> : r.company}</h3>
                  <span className="muted">{r.when}</span>
                </div>
                <p className="role__title">{r.title}</p>
                {r.body && <p className="role__body">{r.body}</p>}
                {r.tags?.length > 0 && (
                  <ul className="tags">
                    {r.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {education?.length > 0 && (
        <section id="education">
          <h2>Education</h2>
          <ul className="roles">
            {education.map((e) => (
              <li key={e.school} data-at={e.at}>
                <div className="row">
                  <h3>{e.at ? <button type="button">{e.school}</button> : e.school}</h3>
                  {e.when && <span className="muted">{e.when}</span>}
                </div>
                <p className="muted">{e.degree}</p>
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

      {skills?.length > 0 && (
        <section id="skills">
          <h2>Skills</h2>
          <ul className="skills__main">
            {skills.flatMap((g) => g.items.filter((s) => s.main)).map((s) => (
              <li key={s.name} className="skill skill--main">
                <span className="skill__logo"><Image src={`/skills/${s.icon}.svg`} alt="" width={36} height={36} unoptimized /></span>
                <b>{s.name}</b>
              </li>
            ))}
          </ul>
          <div className="skills__groups">
            {skills.map((g) => {
              const rest = g.items.filter((s) => !s.main);
              return rest.length > 0 && (
                <div key={g.title}>
                  <h3 className="muted">{g.title}</h3>
                  <ul className="skills__list">
                    {rest.map((s) => (
                      <li key={s.name} className="skill">
                        <span className="skill__logo"><Image src={`/skills/${s.icon}.svg`} alt="" width={20} height={20} unoptimized /></span>
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section id="music">
        <h2>Listening to</h2>
        {artists.length > 0 || live ? (
          <Music artists={artists} live={live} demoTrack={data.demoTrack} />
        ) : (
          <div className="soon">
            <p className="muted">My top artists from Spotify will show up here.</p>
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
          {log.totals.hours} hours, {log.totals.flights} flights and {log.airports.length} airports so far.
          {shown.length > 0 && " Open an album to fly that route on the map."}
        </p>
        {shown.length > 0 && (
          <ul className="albums">
            {shown.map((a) => (
              <li key={a.id} data-featured={Boolean(a.featured)}>
                <button type="button" className="album" data-at={a.id}>
                  <Image src={a.cover.src} alt="" fill sizes={a.featured ? "(max-width: 899px) 100vw, 900px" : "(max-width: 519px) 100vw, 450px"} />
                  <span className="album__text">
                    <b>{a.title}</b>
                    <span>{[a.when, `${a.count} ${a.count === 1 ? "photo" : "photos"}`].filter(Boolean).join(", ")}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {others.length > 0 && (
          <>
            <h3 className="flying__more">More routes</h3>
            <ul className="chips flying__routes">
              {others.map((r) => (
                <li key={r.id}>
                  <button type="button" data-at={r.id}>{r.path.join(" – ")}</button>
                </li>
              ))}
            </ul>
          </>
        )}
        {flying.length > 0 && <Gallery photos={flying} title="Flying" />}
      </section>

      <section id="contact" className="contact">
        <h2>Get in touch</h2>
        {contact && <p className="contact__lead">{contact}</p>}
        <div className="contact__actions">
          <CopyEmail email={person.email} />
          {person.socials.map(([text, href]) => (
            <a key={text} className="contact__link" href={href} {...external}><Icon name={text} />{text}</a>
          ))}
          <a className="contact__link" href={`mailto:${person.email}?subject=${encodeURIComponent("Résumé request")}`}><Icon name="Résumé" />Résumé on request</a>
        </div>
        <footer className="foot muted">
          <p>
            I built this site with Next.js and drew the flight chart from scratch with D3 and real map data.
            {person.source && <> <a className="link" href={person.source} {...external}>See the source on GitHub</a>.</>}
          </p>
          <p>© {new Date().getFullYear()} {person.name}</p>
        </footer>
      </section>
      </div>
    </main>
  );
}
