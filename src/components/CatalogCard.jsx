import { useState } from "react";
import { Link } from "react-router-dom";

export default function CatalogCard({
  to,
  state,
  href,
  img,
  title,
  meta,
  badge,
  variant,
}) {
  const [failed, setFailed] = useState(false);
  const className = variant === "product" ? "catalog-card product" : "catalog-card";
  const body = (
    <>
      {img && !failed ? (
        <img src={img} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="catalog-card-fallback" aria-hidden="true" />
      )}
      <div className="catalog-card-copy">
        {badge ? <span className="badge">{badge}</span> : null}
        <p className="card-title">{title}</p>
        {meta ? <p className="card-meta">{meta}</p> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {body}
      </a>
    );
  }

  return (
    <Link className={className} to={to} state={state}>
      {body}
    </Link>
  );
}
