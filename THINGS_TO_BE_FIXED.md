# THINGS TO BE FIXED

Items that were found or discussed and deliberately left for later. Newest first. Nothing here is started.

## 0. Token audit: colors and typography (found 2026-10-02, nothing fixed yet)

Goal: no component uses a color or a font value that is not a defined token.

**Colors.** Every `var(--...)` reference resolves to a real token (353 tokens, none undefined). Hard-coded color values remaining:
- `Radio.css:4` `#6b778c` (group label). Not bound to a variable in Figma.
- `Radio.css:61` and `ListItem.css:56` `#fafbfc` (inner dot of a selected radio). Raw in Figma.
- `Loader.css:10-11` `#000`. Only used as a mask, never visible, but still a literal.
- Also `foundations/Colors.stories.tsx:18` uses `#0f172a` and `#ffffff` for label contrast on the Colors page.
- Done 2026-10-03: the required asterisk now uses the one token `errorBorderDefault` (`#e42525`) in Input, Textarea, Radio and Checkbox, matching the updated Text Input in Figma. Open in Figma: the Textarea Input asterisk and the Radio asterisk are still bound to variables from another library, and the asterisk text style (`body/md/medium`, Inter) is not a HOT text style.

**Typography.** The 12 Figma text styles exist only as CSS classes (`.text-label-small` and so on), and there are no CSS variables for them. No component uses those classes. Every component writes its font as literals (`font: weight size/line-height family`).
- 44 `font:` declarations across component and story files. 34 equal one of the Figma text styles but are written as literals. 10 match no text style (all are the 12px/16px medium helper label in the stories).
- `Avatar.css:18` uses 9px/13.5px for the small avatar. It is in Figma, but there is no text style for it.
- `Tabs.css` sets `font-weight` on its own in 3 places.

**Proposed fix (needs a yes):** add one CSS variable per text style, replace every literal font declaration with it, and decide the colors above (map each to the nearest token, or ask for tokens in Figma).

## 1. List item: standalone rows that are not in Figma

**Where:** Components → List item (Playground, Docs, All Variants). Files: `src/components/List/ListItem.stories.tsx`, `ListItem.mdx`.

**Problem:** the Figma "Lists" page only draws standalone rows with an avatar or with nothing on the left. The checkbox, radio and icon left elements exist in Figma only inside Dropdown rows. The standalone rows with a checkbox, radio or icon in the List item pages are my own compositions, not Figma designs. In the Playground, `leading: checkbox` is also always ticked and cannot be toggled.

**Proposed fix (needs a yes from the designer):** remove the checkbox, radio and icon options from the standalone List item Playground and Docs, so the page shows only what the Figma Lists page draws. Keep them working inside Dropdown, where Figma uses them.

**Related, already fixed on the same day:** rows with a description now show a chevron on the right (not a check), and a row with nothing on either side is 36px tall.

## Other open items from earlier in the work

- **Cross-check repeated components.** Compare the places where one component sits inside another against the original: Dropdown footer buttons vs Button, Dropdown search field vs Input, and anything else that repeats. Not started.
- **Radio rows in Dropdown.** They still get the grey row hover. The Radio page in Figma has no hover design, so there was nothing to match. Decide whether radio rows should behave like checkbox rows.
- **Dropdown selected state.** Figma does not show how a selected row looks in the plain, avatar and icon styles, so none is drawn.
- **Checkbox no longer follows the Figma Checkbox page.** By decision, it uses the dropdown checkbox interaction (thin grey border off, solid blue on, no hover or press change). The Figma Checkbox page has not been updated to match.
- **Not built yet:** Tags input and Phone input (they were waiting on Tag and Dropdown, which now exist), and Compact Button.
- **Figma file oddities, left as they are:** icon name typos (`calander`, `clipbord`, `massage`), near-duplicate icons, the invisible 100×100 frame in the Tab hover variant, hidden check and cross icons in every Switch variant, and a faint search icon colour in the Dropdown Menu radio style.
- **Unexplained "Storybook published!" message** seen in the first Storybook session. Nothing was published on purpose. Ask whether anyone clicked a publish or share option.
