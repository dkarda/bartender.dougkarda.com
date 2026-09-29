import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import { ChipButton, ChipLink } from "../components/Chips";
import {
  imageSrc,
  inStock,
  isWhiskeyCategory,
  labelOf,
  matchesQuery,
  orderedKeys,
  SPIRIT_LABELS,
  stockLabel,
  WHISKEY_CATEGORIES,
  WINE_LABELS,
  spirits,
  wines,
} from "../lib/catalog";
import { useParamSetter } from "../lib/useParamSetter";

const spiritOrder = Object.keys(SPIRIT_LABELS);
const wineOrder = Object.keys(WINE_LABELS);

const Shelf = () => {
  const location = useLocation();
  const [params, update] = useParamSetter();
  const kind = params.get("kind") === "wine" ? "wine" : "spirits";
  const family = params.get("family") || "";
  const category = params.get("category") || "";
  const showFinished = params.get("stock") === "all";
  const query = params.get("q") || "";
  const from = `${location.pathname}${location.search}`;

  useEffect(() => {
    document.title =
      kind === "wine" ? "Wine · Behind the Bar" : "The shelf · Behind the Bar";
  }, [kind]);

  const spiritPool = showFinished ? spirits : spirits.filter(inStock);
  const winePool = showFinished ? wines : wines.filter(inStock);
  const otherSpiritKeys = orderedKeys(
    spiritOrder,
    [
      ...new Set(
        spiritPool
          .map((item) => item.category)
          .filter((key) => key && !isWhiskeyCategory(key))
      ),
    ]
  );
  const whiskeyKeys = orderedKeys(
    WHISKEY_CATEGORIES,
    [
      ...new Set(
        spiritPool
          .map((item) => item.category)
          .filter((key) => isWhiskeyCategory(key))
      ),
    ]
  );
  const wineKeys = orderedKeys(
    wineOrder,
    [...new Set(winePool.map((item) => item.category).filter(Boolean))]
  );
  const whiskeyOpen = family === "whiskey" || isWhiskeyCategory(category);

  const visibleSpirits = spiritPool
    .filter((item) => {
      if (category) return item.category === category;
      if (family === "whiskey") return isWhiskeyCategory(item.category);
      return true;
    })
    .filter((item) =>
      matchesQuery(query, [
        item.name,
        item.type,
        item.locale,
        item.subcategory,
        labelOf(SPIRIT_LABELS, item.category),
      ])
    )
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const visibleWines = winePool
    .filter((item) => !category || item.category === category)
    .filter((item) =>
      matchesQuery(query, [
        item.name,
        item.producer,
        item.brand,
        item.year,
        item.type,
        item.locale,
        labelOf(WINE_LABELS, item.category),
      ])
    )
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

  const visible = kind === "wine" ? visibleWines : visibleSpirits;
  const noun = kind === "wine" ? "wines" : "bottles";

  return (
    <div className="page">
      <h1>{kind === "wine" ? "The wine rack" : "The shelf"}</h1>
      <p className="lede">
        {kind === "wine"
          ? "Bottles in the rack."
          : "Everything poured at the bar, in one list."}
      </p>
      <div className="search">
        <label htmlFor="shelf-search">Search</label>
        <input
          id="shelf-search"
          type="search"
          value={query}
          placeholder={kind === "wine" ? "Producer, region, or grape" : "Name, style, or place"}
          onChange={(event) => update({ q: event.target.value }, true)}
        />
      </div>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Collection">
          <ChipLink pressed={kind === "spirits"} to="/shelf">
            Spirits
          </ChipLink>
          <ChipLink pressed={kind === "wine"} to="/shelf?kind=wine">
            Wine
          </ChipLink>
        </div>
        <div className="chips" role="group" aria-label="Stock">
          <ChipButton
            pressed={!showFinished}
            onClick={() => update({ stock: "" })}
          >
            In stock
          </ChipButton>
          <ChipButton
            pressed={showFinished}
            onClick={() => update({ stock: "all" })}
          >
            Include finished
          </ChipButton>
        </div>
      </div>
      {kind === "spirits" ? (
        <>
          <div className="chips" role="group" aria-label="Spirit">
            <ChipButton
              pressed={!family && !category}
              onClick={() => update({ family: "", category: "" })}
            >
              All
            </ChipButton>
            <ChipButton
              pressed={whiskeyOpen}
              onClick={() => update({ family: "whiskey", category: "" })}
            >
              Whiskey
            </ChipButton>
            {otherSpiritKeys.map((key) => (
              <ChipButton
                key={key}
                pressed={category === key}
                onClick={() => update({ family: "", category: key })}
              >
                {labelOf(SPIRIT_LABELS, key)}
              </ChipButton>
            ))}
          </div>
          {whiskeyOpen ? (
            <div className="chips subchips" role="group" aria-label="Whiskey style">
              <ChipButton
                pressed={family === "whiskey" && !category}
                onClick={() => update({ family: "whiskey", category: "" })}
              >
                All whiskey
              </ChipButton>
              {whiskeyKeys.map((key) => (
                <ChipButton
                  key={key}
                  pressed={category === key}
                  onClick={() => update({ family: "whiskey", category: key })}
                >
                  {labelOf(SPIRIT_LABELS, key)}
                </ChipButton>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <div className="chips" role="group" aria-label="Wine color">
          <ChipButton
            pressed={!category}
            onClick={() => update({ category: "" })}
          >
            All
          </ChipButton>
          {wineKeys.map((key) => (
            <ChipButton
              key={key}
              pressed={category === key}
              onClick={() => update({ category: key })}
            >
              {labelOf(WINE_LABELS, key)}
            </ChipButton>
          ))}
        </div>
      )}
      <p className="result-count">
        {visible.length === 0
          ? "Nothing matches."
          : `${visible.length} ${visible.length === 1 ? noun.replace(/s$/, "") : noun}`}
      </p>
      <div className="catalog-grid">
        {kind === "wine"
          ? visibleWines.map((wine) => (
              <CatalogCard
                key={wine.slug}
                to={`/wines/${wine.slug}`}
                state={{ from }}
                img={imageSrc("wines", wine.img)}
                title={wine.producer || wine.name}
                badge={!inStock(wine) ? "Finished" : ""}
                meta={[wine.year, wine.brand, wine.type].filter(Boolean).join(" · ")}
              />
            ))
          : visibleSpirits.map((spirit) => (
              <CatalogCard
                key={spirit.slug}
                to={`/bottles/${spirit.slug}`}
                state={{ from }}
                img={imageSrc("liquors", spirit.img)}
                title={spirit.name}
                badge={!inStock(spirit) ? "Finished" : ""}
                meta={[spirit.type, Number(spirit.count) > 1 ? stockLabel(spirit.count) : ""]
                  .filter(Boolean)
                  .join(" · ")}
              />
            ))}
      </div>
    </div>
  );
};

export default Shelf;
