import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Detail, { Section } from "../components/Detail";
import {
  cleanAbv,
  findBySlug,
  imageSrc,
  labelOf,
  noteLines,
  SPIRIT_LABELS,
  spirits,
  stockLabel,
} from "../lib/catalog";

const BottleDetail = () => {
  const { slug } = useParams();
  const spirit = findBySlug(spirits, slug);

  useEffect(() => {
    document.title = spirit
      ? `${spirit.name} · Behind the Bar`
      : "Not on the shelf · Behind the Bar";
  }, [spirit]);

  if (!spirit) {
    return (
      <div className="page">
        <h1>Not on the shelf</h1>
        <Link className="back" to="/shelf">
          The shelf
        </Link>
      </div>
    );
  }

  const ppm = (spirit.ppm || "").trim();
  const facts = [
    ["Style", spirit.type],
    ["Category", labelOf(SPIRIT_LABELS, spirit.category)],
    ["Detail", (spirit.subcategory || "").trim()],
    ["Size", spirit.size],
    ["ABV", cleanAbv(spirit.abv)],
    ["Origin", spirit.locale],
    ["On hand", stockLabel(spirit.count)],
    ["Peat", ppm && ppm !== "0" ? `${ppm} ppm` : ""],
    ["Mash bill", (spirit.mashbill || "").trim()],
  ].filter(([, value]) => value);

  return (
    <Detail
      fallbackTo="/shelf"
      fallbackLabel="The shelf"
      image={imageSrc("liquors", spirit.img)}
    >
      <h1>{spirit.name}</h1>
      <dl className="meta">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <Section title="Notes" lines={noteLines(spirit.notes)} />
    </Detail>
  );
};

export default BottleDetail;
