export default function Section({ id, index, label, children }) {
  return (
    <section id={id} className="section" aria-label={label}>
      <div className="container">
        <div className="section-inner">
          <div className="section-rail">
            <span className="section-index">{index}</span>
            <span className="section-label">{label}</span>
          </div>
          <div className="section-body">{children}</div>
        </div>
      </div>
    </section>
  );
}
