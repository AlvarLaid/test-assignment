# Changelog

## v0.1.0 - Feat: estimate appropriate burger joint image size

- Roughly estimate the appropriate burger joint image size based on the actual viewport. This is meant to ensure that the user does not see overly pixellated image at differet screen sizes. A reasonable difference between actual image and fetched image is OK.
- NB! I did choose to use `ResizeObserver` here instead of checking the width during the fetch because that way we can be sure that we don't incurr any unncessary reflows. Essentially instead of checking the width on each request we just listen for actual resizing of the burger joints list and save the estimated image size there.

## v0.0.2 - Chore: refactor CSS

- Use grid for app shell
- Use CSS varibles for colors and rename variables to make more sense in the context they are used in. Decided against using sass maps for readability sake, if this was a larger application then I would likely separate tokens by categories (colors, spacing, etc.) and place them under `styles/tokens/` folder

## v0.0.1 - Fix: burger joing list item spacing

- Placement of burger joint list items was visually inconsistent, specifically elements did not scale gracefully and the last row of elements did not align with rest of the items. Burger joint list items are now divided into three columns with equal spacing between columns and rows.
