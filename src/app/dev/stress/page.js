import { notFound } from "next/navigation";
import Portfolio from "@/components/Portfolio";
import { loadData } from "@/lib/load";
import { stress } from "@/data/stress";

const modes = [["demo", "Demo data"], ["worst", "Worst case"], ["empty", "Empty"], ["one", "One"], ["many", "Many"], ["playing", "Playing"], ["silent", "Not playing"]];

export default async function Stress({ searchParams }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { data: mode = "demo" } = await searchParams;
  return (
    <>
      <Portfolio data={stress(await loadData(), mode)} />
      <nav style={{ position: "fixed", bottom: 12, left: "50%", transform: "translateX(-50%)", zIndex: 99, display: "flex", padding: 3, borderRadius: 99, background: "#ddd", font: "12px system-ui", whiteSpace: "nowrap" }}>
        {modes.map(([id, text]) => (
          <a key={id} href={`?data=${id}`} style={{ padding: "6px 10px", borderRadius: 99, color: "#222", background: id === mode ? "#fff" : "none" }}>{text}</a>
        ))}
      </nav>
    </>
  );
}
