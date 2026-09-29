import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Detail from "../components/Detail";
import {
  cleanAbv,
  findBySlug,
  imageSrc,
  labelOf,
  stockLabel,
  WINE_LABELS,
  wines,
} from "../lib/catalog";

const WineDetail = () => {
  const { slug } = useParams();
  const wine = findBySlug(wines, slug);

  useEffect(() => {
    document.title = wine
      ? `${wine.name} · Behind the Bar`
      : "Not in the rack · Behind the Bar";
  }, [wine]);

  if (!wine) {
    return (
      <div className="page">
        <h1>Not in the rack</h1>
        <Link className="back" to="/shelf?kind=wine">
          The wine rack
        </Link>
      </div>
    );
  }

  const facts = [
    ["Vintage", wine.year],
    ["Producer", wine.producer],
    ["Bottling", (wine.brand || "").trim()],
    ["Grape", wine.type],
    ["Color", labelOf(WINE_LABELS, wine.category)],
    ["Origin", wine.locale],
    ["ABV", cleanAbv(wine.abv)],
    ["On hand", stockLabel(wine.count)],
  ].filter(([, value]) => value);

  return (
    <Detail
      fallbackTo="/shelf?kind=wine"
      fallbackLabel="The wine rack"
      image={imageSrc("wines", wine.img)}
    >
      <h1>{wine.producer || wine.name}</h1>
      <dl className="meta">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </Detail>
  );
};

export default WineDetail;
