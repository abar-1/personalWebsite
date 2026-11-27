import Image from "next/image";

function Track({ track }) {
  const inner = (
    <>
      {track.image && <Image src={track.image} alt="" width={40} height={40} unoptimized />}
      <span>
        <b>{track.title}</b>
        <span className="muted">{track.artist}</span>
      </span>
    </>
  );
  return track.href ? (
    <a className="track" href={track.href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className="track">{inner}</div>
  );
}

function Artist({ artist }) {
  const inner = (
    <>
      <span className="artist__photo">
        {artist.image && <Image src={artist.image} alt="" fill sizes="200px" unoptimized />}
      </span>
      <b>{artist.name}</b>
    </>
  );
  return artist.href ? (
    <a className="artist" href={artist.href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className="artist">{inner}</div>
  );
}

// Shared by the server render and the in-browser fallback.
export default function TopLists({ tracks, artists }) {
  return (
    <>
      {artists.length > 0 && (
        <div>
          <h3>Top artists</h3>
          <ul className="artists">
            {artists.slice(0, 6).map((a, i) => (
              <li key={i}><Artist artist={a} /></li>
            ))}
          </ul>
        </div>
      )}
      {tracks.length > 0 && (
        <div>
          <h3>Top songs this month</h3>
          <ul className="tracks">
            {tracks.slice(0, 4).map((t, i) => (
              <li key={i}><Track track={t} /></li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
