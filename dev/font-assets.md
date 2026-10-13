# Font assets and provenance

The four `src/fonts/hv-*.woff2` files combine the Latin, Latin Extended and Vietnamese
subsets from the pinned Fontsource packages in `package-lock.json`:

- Be Vietnam Pro 400/600 normal → Huyen Vi Sans.
- Cormorant Garamond 500 normal/italic → Huyen Vi Serif.

The derivatives retain the upstream copyright/license metadata; family/name records are
renamed to avoid distributing modified fonts under a reserved upstream name.
Both OFL licenses are included alongside the font files. `next/font/local` serves/preloads
these files locally. Four merged font requests replace eighteen subset requests.
The original package WOFF files are also used by the server-side OpenGraph renderer.

Builds use the checked-in assets and do not require Python or font-generation tooling.
To refresh them after an intentional Fontsource upgrade, merge each family's Latin,
Latin Extended and Vietnamese WOFF subset with FontTools `Merger`, rename name-table
IDs 1/3/4/6/16 to the derivative family, then save as WOFF2 with Brotli support.
Preserve upstream licenses and test Vietnamese glyphs, line metrics and OG output.
