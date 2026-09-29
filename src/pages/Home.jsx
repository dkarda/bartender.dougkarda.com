import { useEffect } from "react";
import { Link } from "react-router-dom";
import CatalogCard from "../components/CatalogCard";
import { counts, imageSrc, labelOf, RECIPE_LABELS, recipes } from "../lib/catalog";

const Home = () => {
  useEffect(() => {
    document.title = "Behind the Bar";
  }, []);

  const fives = recipes
    .filter((recipe) => !recipe.draft && recipe.img && Number(recipe.score) === 5)
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const step = Math.max(1, Math.floor(fives.length / 6));
  const featured = Array.from({ length: 6 }, (_, index) => fives[index * step]).filter(Boolean);

  return (
    <div className="page">
      <h1>Behind the bar</h1>
      <p className="lede">
        A catalog of the drinks I make, the bottles on the shelf, and the tools
        I use to make the work easier.
      </p>
      <div className="doors">
        <Link className="door" to="/recipes">
          <span className="door-kicker">Recipes</span>
          <strong>{counts.published}</strong>
          <span>{counts.drafts} drafts still in progress</span>
        </Link>
        <Link className="door" to="/shelf">
          <span className="door-kicker">Shelf</span>
          <strong>{counts.spirits}</strong>
          <span>{counts.wines} wines in the rack</span>
        </Link>
        <Link className="door" to="/shop">
          <span className="door-kicker">Shop</span>
          <strong>{counts.shop}</strong>
          <span>Tools and books I actually use</span>
        </Link>
      </div>
      <h2 className="section-title">From the recipe book</h2>
      <div className="catalog-grid">
        {featured.map((recipe) => (
          <CatalogCard
            key={recipe.slug}
            to={`/recipes/${recipe.slug}`}
            state={{ from: "/" }}
            img={imageSrc("beverages", recipe.img)}
            title={recipe.name}
            meta={labelOf(RECIPE_LABELS, recipe.category)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
