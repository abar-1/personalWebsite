import Image from "next/image";

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
export default function TopLists({ artists }) {
  if (!artists.length) return null;
  return (
    <div>
      <h3>Top artists</h3>
      <ul className="artists">
        {artists.slice(0, 6).map((a, i) => (
          <li key={i}><Artist artist={a} /></li>
        ))}
      </ul>
    </div>
  );
}
