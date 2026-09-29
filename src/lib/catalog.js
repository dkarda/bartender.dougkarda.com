import beverages from "../data/beverages.json";
import liquorInventory from "../data/liquor-inventory.json";
import wineInventory from "../data/wine-inventory.json";
import amazonBar from "../data/amazon-bar.json";

export const RECIPE_LABELS = {
  gin: "Gin",
  whiskey: "Whiskey",
  rum: "Rum",
  vodka: "Vodka",
  tequilaMezcal: "Tequila & mezcal",
  other: "Other",
  ingredient: "Ingredients",
  beer: "Beer",
  cachaca: "Cachaça",
  genever: "Genever",
  rye: "Rye",
  na: "Non-alcoholic",
};

export const RECIPE_ORDER = Object.keys(RECIPE_LABELS);

export const SPIRIT_LABELS = {
  bourbon: "Bourbon",
  scotch: "Scotch",
  irish: "Irish",
  rye: "Rye",
  americanwhiskey: "American whiskey",
  japanesewhiskey: "Japanese whiskey",
  canadianwhiskey: "Canadian whiskey",
  australianwhiskey: "Australian whiskey",
  flavoredwhiskey: "Flavored whiskey",
  liqueur: "Liqueur",
  rum: "Rum",
  tequila: "Tequila",
  mezcal: "Mezcal",
  gin: "Gin",
  vodka: "Vodka",
  genever: "Genever",
  cachaca: "Cachaça",
  sake: "Sake",
  pisco: "Pisco",
  other: "Other",
};

export const WHISKEY_CATEGORIES = [
  "bourbon",
  "scotch",
  "irish",
  "rye",
  "americanwhiskey",
  "japanesewhiskey",
  "canadianwhiskey",
  "australianwhiskey",
  "flavoredwhiskey",
];

export const WINE_LABELS = {
  red: "Red",
  white: "White",
  sparkling: "Sparkling",
  rose: "Rosé",
  dessert: "Dessert",
  orange: "Orange",
};

export const SHOP_LABELS = {
  book: "Books",
  drinkware: "Glassware",
  barware: "Bar tools",
  ingredients: "Ingredients",
  cleaning: "Cleaning",
};

export function labelOf(map, key) {
  if (!key) return "";
  return map[key] || key;
}

export function isWhiskeyCategory(category) {
  return WHISKEY_CATEGORIES.includes(category);
}

export function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function assignSlugs(items, nameOf) {
  const seen = new Map();
  const result = [];
  for (const item of items) {
    const name = nameOf(item).trim();
    if (!name) continue;
    const base = slugify(name) || "item";
    const taken = seen.get(base) ?? 0;
    seen.set(base, taken + 1);
    result.push({
      ...item,
      name,
      slug: taken === 0 ? base : `${base}-${taken + 1}`,
    });
  }
  return result;
}

export function imageSrc(folder, file) {
  if (!file || file === ".webp") return null;
  const name = String(file).includes(".") ? String(file) : `${file}.webp`;
  return `/images/${folder}/${encodeURI(name)}`;
}

export function noteLines(notes) {
  if (!Array.isArray(notes)) return [];
  return notes
    .map((note) => (typeof note === "string" ? note : note?.note))
    .map((note) => (note || "").trim())
    .filter(Boolean);
}

export function asLines(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => String(item).trim()).filter(Boolean);
}

export function cleanAbv(abv) {
  const value = (abv || "").trim();
  if (!value || value === "%") return "";
  return value;
}

export function stockLabel(count) {
  const amount = Number(count);
  if (!Number.isFinite(amount) || amount <= 0) return "Finished";
  if (amount === 1) return "1 bottle";
  return `${amount} bottles`;
}

export function inStock(item) {
  return Number(item.count) > 0;
}

export function matchesQuery(query, parts) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return parts.filter(Boolean).join(" ").toLowerCase().includes(needle);
}

export function orderedKeys(order, present) {
  const known = order.filter((key) => present.includes(key));
  const extras = present.filter((key) => key && !order.includes(key));
  return [...known, ...extras];
}

export const recipes = assignSlugs(
  beverages,
  (item) => (item.title || "").trim() || (item.temptitle || "").trim()
).map((item) => ({
  ...item,
  draft: !(item.title || "").trim(),
}));

export const spirits = assignSlugs(liquorInventory, (item) => item.title || "");

export const wines = assignSlugs(wineInventory, (item) =>
  [item.producer, item.brand, item.year].filter(Boolean).join(" ")
);

export const shop = [...amazonBar].sort((a, b) =>
  a.product.localeCompare(b.product)
);

export function findBySlug(items, slug) {
  return items.find((item) => item.slug === slug) ?? null;
}

export const counts = {
  published: recipes.filter((recipe) => !recipe.draft).length,
  drafts: recipes.filter((recipe) => recipe.draft).length,
  spirits: spirits.filter(inStock).length,
  wines: wines.filter(inStock).length,
  shop: shop.length,
};
