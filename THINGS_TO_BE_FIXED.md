# THINGS TO BE FIXED

Items that were found or discussed and deliberately left for later. Newest first. Nothing here is started.

## 0. Token audit: colors and typography (found 2026-10-02, nothing fixed yet)

Goal: no component uses a color or a font value that is not a defined token.

**Colors.** Every `var(--...)` reference resolves to a real token (353 tokens, none undefined). Hard-coded color values remaining:
- `MainNav.tsx` Hiver logo yellow `#FDB022` (no token in Figma). Added 2026-10-07.
- `src/index.css`, `App.css` (leftover Vite starter styles, unused by components) and `.storybook/hotTheme.ts` (Storybook UI theme) also hold raw colors. Not part of the design system; delete or leave.
- `Radio.css:4` `#6b778c` (group label). Not bound to a variable in Figma.
- `Radio.css:61` and `ListItem.css:56` `#fafbfc` (inner dot of a selected radio). Raw in Figma.
- `Loader.css:10-11` `#000`. Only used as a mask, never visible, but still a literal.
- Also `foundations/Colors.stories.tsx:18` uses `#0f172a` and `#ffffff` for label contrast on the Colors page.
- Done 2026-10-03: the required asterisk now uses the one token `errorBorderDefault` (`#e42525`) in Input, Textarea, Radio and Checkbox, matching the updated Text Input in Figma. Open in Figma: the Textarea Input asterisk and the Radio asterisk are still bound to variables from another library, and the asterisk text style (`body/md/medium`, Inter) is not a HOT text style.

**Typography.** The 12 Figma text styles exist only as CSS classes (`.text-label-small` and so on), and there are no CSS variables for them. No component uses those classes. Every component writes its font as literals (`font: weight size/line-height family`).
- 44 `font:` declarations across component and story files. 34 equal one of the Figma text styles but are written as literals. 10 match no text style (all are the 12px/16px medium helper label in the stories).
- Added 2026-10-07: the Admin sidebar section headings use 13px/18px medium (`AdminSidebar.css`), which is not one of the 12 text styles. Story-page labels use 12px/16px medium, which also matches no style (the Figma 12px styles use an 18px line height).
- `Avatar.css:18` uses 9px/13.5px for the small avatar. It is in Figma, but there is no text style for it.
- `Tabs.css` sets `font-weight` on its own in 3 places.

**Proposed fix (needs a yes):** add one CSS variable per text style, replace every literal font declaration with it, and decide the colors above (map each to the nearest token, or ask for tokens in Figma).

## 0a. Molecules (Patterns) and Table: open points (2026-10-07)

Check these when we go through each component.
- **Hover states are my own.** Figma draws no hover for the Admin sidebar, the Main nav or the Table row action buttons. Chosen: sidebar items `slateSurfaceSubtle100Hover`; nav icons `slateSurfaceDark600`; row action buttons `slateSurfaceSubtle100Hover`. Row action icon colour (`slateIconsActive`) and divider colour (`slateBorderLight`) are also assumed.
- **Admin sidebar spacing.** In Figma the AI group sits 4px further left than the other groups (heading at 8px, items without the 4px inset). I aligned all groups. Decide whether to match Figma exactly or fix Figma.
- **Main nav icons not in the icon set.** The Conversations inbox glyph and the help-in-chat glyph are drawn inside `MainNav.tsx` from Figma's shapes. They do not appear on the Icons page. Decide whether to add them to the Figma icon set.
- **Main nav avatar colour.** Figma shows a red avatar (Pastel Red). The Avatar component has only the light blue, so the nav uses the plain Avatar. Add a `color` prop to Avatar if red is wanted.
- **Table status toggle.** Uses our Switch, while Figma draws a lighter plain toggle.
- **Pill bolt icon.** The lightning bolt in the RT/FRT Pill is not in the HOT icon set, so it is drawn inside `Pill.tsx` from the Figma shape (12px, from the original HOT Design System file). Decide whether to add it to the icon set. Overdue uses `errorSurfaceDisabled` as Figma binds it, an odd name for an active red.
- **Empty state icons are a separate 24px set.** The Figma empty states use 24px icons with a 2px outline (Untitled UI style), not the HOT 14/16px icons. They live in `src/patterns/EmptyState/emptyStateIcons.ts`, copied from Figma. Decide whether to merge them into the main icon set. The AI Agents icon is on a 20px grid and is drawn inline.
- **Empty state placeholder text.** Four Figma empty states still have placeholder text: Tags and Business hours ("small description"), No conversation found ("Have a description here") and Notifications ("Write a description here"). Kept as drawn. Needs real copy from the designer. Also: the Select-an-item state uses the open-mail icon.
- **Admin sidebar icon choices.** Icons were matched by shape (for example Knowledge Hub = `file`, Apps = `apps1`). Confirm against the Figma icon names.

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
