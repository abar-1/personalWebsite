/**
 * Wraps numeric/metric tokens (91.4%, 3000+, ~30%, 200+, 16 …) in a bold,
 * tabular-figure span so quantified results stand out to a skimming recruiter.
 */
export function emphasizeMetrics(text) {
  const parts = text.split(/(~?\d[\d.,]*%?\+?)/g);
  return parts.map((part, i) =>
    /^~?\d[\d.,]*%?\+?$/.test(part) ? (
      <span key={i} className="metric">
        {part}
      </span>
    ) : (
      part
    )
  );
}
