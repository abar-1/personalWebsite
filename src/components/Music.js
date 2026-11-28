import NowPlaying from "./NowPlaying";
import TopLists from "./TopLists";
import LiveTop from "./LiveTop";

export default function Music({ artists, live, demoTrack }) {
  const built = artists.length > 0;
  return (
    <div className="music">
      {live && <NowPlaying demoTrack={demoTrack} />}
      {built ? <TopLists artists={artists} /> : live && <LiveTop />}
    </div>
  );
}
