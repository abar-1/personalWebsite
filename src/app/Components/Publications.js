import './Publications.css';

export default function Publications() {

  const publications = [
    {
      title: "Machine Learning Approaches for QAM-16 Demodulation: Evaluating Decision Trees and Random Forests as Hardware Alternatives (Bargaje, Stillman, Vijay, Ghosh, Kinney, Davids, Gurbani)",
      date: "October 2025",
      doi: "10.1109/RTC66985.2025.11211714",
      description: "Conference Paper presented at IIT's Real-Time Communications Conference disucssing machine learnig emaulations for hardware QAM demodulation."

    }
  ];
  return (
    <div className='container'>
        <h2 className="tools-title">Publications</h2>
        <div className="cards">
          {publications.map((pub, idx) => (
            <div key={idx} className="publication-card">
            <div className="publication-header">
                <div>
                <h3 className="publication-title">{pub.title}</h3>
                </div>
                <p className="publication-date">{pub.date}</p>
            </div>
            <p className="pub-content">{pub.description} </p>
            </div>
        ))}
        </div>
        
    </div>
  )
}
