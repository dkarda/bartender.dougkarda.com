# Behind the Bar

Catalog of recipes, bottles, wines, and shop links. JSON lives in `src/data/`. Photos live in `static/images/` (Vite copies that folder into `dist/` on build). Do not put photos in `public/` — this repo ignores anything named `public`.

Preview: `npm run dev`  
Publish: `npm run build`, then deploy the contents of `dist/` so `index.html` and `dist/images/` go to the host together.

## Files

| Collection | JSON | Photos | `img` value |
| --- | --- | --- | --- |
| Recipes | `src/data/beverages.json` | `static/images/beverages/` | `negroni.webp` |
| Bottles | `src/data/liquor-inventory.json` | `static/images/liquors/` | `aviation-gin.webp` |
| Wine | `src/data/wine-inventory.json` | `static/images/wines/` | `merkin-chupacabra.webp` |
| Shop | `src/data/amazon-bar.json` | `static/images/affiliate/bar/` | `oxo-jigger` (no extension) |

The page address is built from the name (`title` / `temptitle`, bottle title, or wine producer + brand + year). Changing that name changes the URL.

## Add or edit a recipe

1. Open `src/data/beverages.json`.
2. Copy an existing object and fill it in.
3. Drop the photo in `static/images/beverages/` as WebP. Set `"img"` to that filename, including `.webp`.
4. Published drinks use `"title"`. Drafts use `"temptitle"` and leave `"title"` empty (`""`).
5. Optional: `"refined": "n"` marks a draft as a sketch. `"score"` is a number, usually 0–5. `"category"` is one of `gin`, `whiskey`, `rum`, `vodka`, `tequilaMezcal`, `other`, `ingredient`, `beer`, `cachaca`, `genever`, `rye`, `na`.
6. `equipment`, `ingredients`, `directions`, and `notes` are arrays of strings.
7. Save, run `npm run dev` to check `/recipes` (or `/recipes?status=draft`), then publish.

## Add or edit a bottle

1. Open `src/data/liquor-inventory.json`.
2. Copy an existing object.
3. Drop the photo in `static/images/liquors/`. Set `"img"` to the filename, including `.webp`.
4. `"count"` is how many bottles are on the shelf. `1` or more shows under In stock. `0` or less is hidden until Include finished is on.
5. `"category"` is one of `bourbon`, `scotch`, `irish`, `rye`, `americanwhiskey`, `japanesewhiskey`, `canadianwhiskey`, `australianwhiskey`, `flavoredwhiskey`, `liqueur`, `rum`, `tequila`, `mezcal`, `gin`, `vodka`, `genever`, `cachaca`, `sake`, `pisco`, `other`. Use those spellings — a typo puts the bottle in its own chip.
6. Notes are objects: `"notes": [{ "note": "tasting note here" }]`. Empty `"note"` strings are ignored.
7. Check `/shelf`, or `/shelf?family=whiskey` for whiskey.

## Add or edit a wine

1. Open `src/data/wine-inventory.json`.
2. Copy an existing object.
3. Drop the photo in `static/images/wines/`. Set `"img"` to the filename, including `.webp`. Never use `".webp"` or a blank `img` — the card will have no photo.
4. `"count"` works the same as bottles. `"category"` is `red`, `white`, `sparkling`, `rose`, `dessert`, or `orange`.
5. Check `/shelf?kind=wine`.

## Add or edit a shop link

1. Open `src/data/amazon-bar.json`.
2. Copy an existing object. Keep `"category": "bar"`.
3. `"subcategory"` is `book`, `drinkware`, `barware`, `ingredients`, or `cleaning`.
4. Drop the photo in `static/images/affiliate/bar/` as `your-file.webp`. Set `"img"` to `your-file` with **no** extension.
5. Check `/shop`.

## Publish

1. Confirm the JSON is valid (no trailing commas).
2. Confirm the photo filename matches `img`.
3. `npm run build`.
4. Upload everything in `dist/` to the site root, including `dist/images/`. A new photo will not appear if only `index.html` is uploaded.
5. Hard-refresh the live page. Recipes, bottles, and wines are baked into the JavaScript at build time, so an old `dist/assets/*.js` will still show old JSON even if you updated `src/data/`.
