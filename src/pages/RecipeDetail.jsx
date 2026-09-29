import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Detail, { Section } from "../components/Detail";
import {
  asLines,
  findBySlug,
  imageSrc,
  labelOf,
  noteLines,
  RECIPE_LABELS,
  recipes,
} from "../lib/catalog";

const RecipeDetail = () => {
  const { slug } = useParams();
  const recipe = findBySlug(recipes, slug);

  useEffect(() => {
    document.title = recipe
      ? `${recipe.name} · Behind the Bar`
      : "Not on the menu · Behind the Bar";
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="page">
        <h1>Not on the menu</h1>
        <Link className="back" to="/recipes">
          All recipes
        </Link>
      </div>
    );
  }

  const facts = [
    ["Base", labelOf(RECIPE_LABELS, recipe.category)],
    ["Score", Number(recipe.score) > 0 ? `${recipe.score} / 5` : ""],
    ["Serving", recipe.servingSize],
    ["Prep", recipe.prepTime],
    ["Cook", recipe.cookingTime],
  ].filter(([, value]) => value);

  return (
    <Detail
      fallbackTo={recipe.draft ? "/recipes?status=draft" : "/recipes"}
      fallbackLabel={recipe.draft ? "Draft recipes" : "All recipes"}
      image={imageSrc("beverages", recipe.img)}
    >
      {recipe.draft ? (
        <p className="kicker">
          {recipe.refined === "n" ? "Draft · still a sketch" : "Draft"}
        </p>
      ) : null}
      <h1>{recipe.name}</h1>
      {facts.length > 0 ? (
        <dl className="meta">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <Section title="Ingredients" lines={asLines(recipe.ingredients)} />
      <Section title="Equipment" lines={asLines(recipe.equipment)} />
      <Section title="Directions" lines={asLines(recipe.directions)} />
      <Section title="Notes" lines={noteLines(recipe.notes)} />
    </Detail>
  );
};

export default RecipeDetail;
