import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Photo({ src }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div className="catalog-card-fallback" aria-hidden="true" />;
  }
  return <img src={src} alt="" onError={() => setFailed(true)} />;
}

export default function Detail({ fallbackTo, fallbackLabel, image, children }) {
  const location = useLocation();
  const backTo = location.state?.from || fallbackTo;

  return (
    <article className="page">
      <Link className="back" to={backTo}>
        {location.state?.from ? "Back" : fallbackLabel}
      </Link>
      <div className="detail">
        <div className="detail-photo">
          <Photo src={image} />
        </div>
        <div className="detail-panel">{children}</div>
      </div>
    </article>
  );
}

export function Section({ title, lines }) {
  if (!lines?.length) return null;
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {lines.map((line, index) => (
          <li key={`${index}-${line}`}>{line}</li>
        ))}
      </ul>
    </section>
  );
}
