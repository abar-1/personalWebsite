import './Publications.css';

export default function Publications() {
  const publications = [
    {
      title: "Machine Learning Approaches for QAM-16 Demodulation: Evaluating Decision Trees and Random Forests as Hardware Alternatives (Bargaje, Stillman, Vijay, Ghosh, Kinney, Davids, Gurbani)",
      date: "October 2025",
      doi: "10.1109/RTC66985.2025.11211714",
      description: "Conference paper presented at IIT's Real-Time Communications Conference discussing machine learning emulations for hardware QAM demodulation."
    }
  ];

  return (
    <section className="section publications-section">
      <h2 className="section-title">Publications</h2>
      <div className="publications-list">
        {publications.map((pub, idx) => (
          <article key={idx} className="publication-card">
            <div className="publication-header">
              <h3 className="publication-title">{pub.title}</h3>
              <time className="publication-date">{pub.date}</time>
            </div>
            <p className="publication-description">{pub.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
