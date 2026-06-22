"use client";

import Reveal from "./Reveal";
import { emphasizeMetrics } from "./emphasize";

const publications = [
  {
    title:
      "Machine Learning Approaches for QAM-16 Demodulation: Evaluating Decision Trees and Random Forests as Hardware Alternatives",
    authors: "Bargaje, Stillman, Vijay, Ghosh, Kinney, Davids, Gurbani",
    venue: "IIT's Real-Time Communications Conference",
    date: "October 2025",
    description:
      "Conference paper discussing machine learning emulations for hardware QAM demodulation. Demonstrated that decision tree and random forest models can decode 16 QAM signals with 91.4% accuracy, potentially replacing dedicated hardware.",
  },
];

export default function Publications() {
  return (
    <Reveal className="entry-list">
      {publications.map((pub) => (
        <article key={pub.title}>
          <h3 className="writing-title">{pub.title}</h3>
          <p className="writing-meta">
            {pub.authors} &middot;{" "}
            <span className="venue">{pub.venue}</span> &middot; {pub.date}
          </p>
          <p className="writing-abstract">{emphasizeMetrics(pub.description)}</p>
        </article>
      ))}
    </Reveal>
  );
}
