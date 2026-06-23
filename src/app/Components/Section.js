export default function Section({ id, index, label, description, tone = "base", children }) {
  return (
    <section
      id={id}
      className={`section${tone === "alt" ? " section--alt" : ""}`}
      aria-label={label}
    >
      <div className="container">
        <header className="section-head">
          <div className="section-headline">
            <span className="section-index" aria-hidden="true">
              {index}
            </span>
            <h2 className="section-title">{label}</h2>
          </div>
          {description && <p className="section-desc">{description}</p>}
        </header>
        <div className="section-body">{children}</div>
      </div>
    </section>
  );
}
