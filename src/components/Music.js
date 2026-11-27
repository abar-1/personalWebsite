import NowPlaying from "./NowPlaying";
import TopLists from "./TopLists";
import LiveTop from "./LiveTop";

export default function Music({ tracks, artists, live, demoTrack }) {
  const built = tracks.length > 0 || artists.length > 0;
  return (
    <div className="music">
      {live && <NowPlaying demoTrack={demoTrack} />}
      {built ? <TopLists tracks={tracks} artists={artists} /> : live && <LiveTop />}
    </div>
  );
}
