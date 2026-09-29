import { useEffect } from "react";
import CatalogCard from "../components/CatalogCard";
import { ChipButton } from "../components/Chips";
import {
  imageSrc,
  labelOf,
  matchesQuery,
  orderedKeys,
  SHOP_LABELS,
  shop,
} from "../lib/catalog";
import { useParamSetter } from "../lib/useParamSetter";

const shopOrder = Object.keys(SHOP_LABELS);

const Shop = () => {
  const [params, update] = useParamSetter();
  const query = params.get("q") || "";
  const group = params.get("group") || "";

  useEffect(() => {
    document.title = "The store · Behind the Bar";
  }, []);

  const groups = orderedKeys(
    shopOrder,
    [...new Set(shop.map((item) => item.subcategory).filter(Boolean))]
  );
  const visible = shop
    .filter((item) => !group || item.subcategory === group)
    .filter((item) =>
      matchesQuery(query, [
        item.product,
        item.caption,
        labelOf(SHOP_LABELS, item.subcategory),
      ])
    );

  return (
    <div className="page">
      <h1>The store</h1>
      <p className="lede">
        Amazon links for products I use at home to make drinks. The affiliate
        program pays me a few pennies and does not change the price.
      </p>
      <div className="search">
        <label htmlFor="shop-search">Search</label>
        <input
          id="shop-search"
          type="search"
          value={query}
          placeholder="Jigger, glass, book"
          onChange={(event) => update({ q: event.target.value }, true)}
        />
      </div>
      <div className="chips" role="group" aria-label="Kind of product">
        <ChipButton pressed={!group} onClick={() => update({ group: "" })}>
          All
        </ChipButton>
        {groups.map((key) => (
          <ChipButton
            key={key}
            pressed={group === key}
            onClick={() => update({ group: key })}
          >
            {labelOf(SHOP_LABELS, key)}
          </ChipButton>
        ))}
      </div>
      <p className="result-count">
        {visible.length === 0
          ? "Nothing matches."
          : visible.length === 1
            ? "1 product"
            : `${visible.length} products`}
      </p>
      <div className="catalog-grid">
        {visible.map((item) => (
          <CatalogCard
            key={item.affiliateLink}
            variant="product"
            href={item.affiliateLink}
            img={imageSrc("affiliate/bar", item.img)}
            title={item.product}
            meta={item.caption}
            badge={labelOf(SHOP_LABELS, item.subcategory)}
          />
        ))}
      </div>
    </div>
  );
};

export default Shop;
