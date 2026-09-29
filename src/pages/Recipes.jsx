import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import { ChipButton } from "../components/Chips";
import {
  imageSrc,
  labelOf,
  matchesQuery,
  noteLines,
  orderedKeys,
  RECIPE_LABELS,
  RECIPE_ORDER,
  recipes,
} from "../lib/catalog";
import { useParamSetter } from "../lib/useParamSetter";

const Recipes = () => {
  const location = useLocation();
  const [params, update] = useParamSetter();
  const query = params.get("q") || "";
  const category = params.get("category") || "";
  const status = params.get("status") === "draft" ? "draft" : "published";
  const sort = params.get("sort") === "score" ? "score" : "name";

  useEffect(() => {
    document.title =
      status === "draft" ? "Draft recipes · Behind the Bar" : "Recipes · Behind the Bar";
  }, [status]);

  const pool = recipes.filter((recipe) =>
    status === "draft" ? recipe.draft : !recipe.draft
  );
  const categoryKeys = orderedKeys(
    RECIPE_ORDER,
    [...new Set(pool.map((recipe) => recipe.category).filter(Boolean))]
  );
  const visible = pool.filter((recipe) => {
    if (category && recipe.category !== category) return false;
    return matchesQuery(query, [
      recipe.name,
      labelOf(RECIPE_LABELS, recipe.category),
      ...(recipe.ingredients || []),
      ...noteLines(recipe.notes),
    ]);
  });
  const sorted = [...visible].sort((a, b) => {
    if (sort === "score") {
      const byScore = (Number(b.score) || 0) - (Number(a.score) || 0);
      if (byScore) return byScore;
    }
    return a.name.localeCompare(b.name, undefined, { numeric: true });
  });

  return (
    <div className="page">
      <h1>{status === "draft" ? "Draft recipes" : "Recipes"}</h1>
      <p className="lede">
        {status === "draft"
          ? "Some of these are close. Some are only a starting point."
          : "Drinks I make, with the method I actually use."}
      </p>
      <div className="search">
        <label htmlFor="recipe-search">Search</label>
        <input
          id="recipe-search"
          type="search"
          value={query}
          placeholder="Name, spirit, or ingredient"
          onChange={(event) => update({ q: event.target.value }, true)}
        />
      </div>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Which recipes">
          <ChipButton
            pressed={status === "published"}
            onClick={() => update({ status: "" })}
          >
            Published
          </ChipButton>
          <ChipButton
            pressed={status === "draft"}
            onClick={() => update({ status: "draft" })}
          >
            Drafts
          </ChipButton>
        </div>
        <div className="chips" role="group" aria-label="Sort">
          <ChipButton pressed={sort === "name"} onClick={() => update({ sort: "" })}>
            Name
          </ChipButton>
          <ChipButton
            pressed={sort === "score"}
            onClick={() => update({ sort: "score" })}
          >
            Score
          </ChipButton>
        </div>
      </div>
      <div className="chips" role="group" aria-label="Base spirit">
        <ChipButton pressed={!category} onClick={() => update({ category: "" })}>
          All
        </ChipButton>
        {categoryKeys.map((key) => (
          <ChipButton
            key={key}
            pressed={category === key}
            onClick={() => update({ category: key })}
          >
            {labelOf(RECIPE_LABELS, key)}
          </ChipButton>
        ))}
      </div>
      <p className="result-count">
        {sorted.length === 0
          ? "Nothing matches."
          : sorted.length === 1
            ? "1 recipe"
            : `${sorted.length} recipes`}
      </p>
      <div className="catalog-grid">
        {sorted.map((recipe) => (
          <CatalogCard
            key={recipe.slug}
            to={`/recipes/${recipe.slug}`}
            state={{ from: `${location.pathname}${location.search}` }}
            img={imageSrc("beverages", recipe.img)}
            title={recipe.name}
            badge={recipe.draft && recipe.refined === "n" ? "Sketch" : ""}
            meta={[
              labelOf(RECIPE_LABELS, recipe.category),
              sort === "score" && Number(recipe.score) > 0 ? `${recipe.score}/5` : "",
            ]
              .filter(Boolean)
              .join(" · ")}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
