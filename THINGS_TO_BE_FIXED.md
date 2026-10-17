# THINGS TO BE FIXED

Only things that need action: something is built but needs another look, a decision, or a missing piece. Nothing that is already fixed or that only records what was done. Tick or delete an item when it is done.

## 1. Tokens and typography

- [ ] **Raw colours in components.** Map each to a token or ask for a token in Figma: Hiver logo yellow `#FDB022` (`MainNav.tsx`); Radio group label `#6b778c` (`Radio.css`); selected radio dot `#fafbfc` (`Radio.css`, `ListItem.css`); Loader mask `#000`; label colours `#0f172a` and `#ffffff` on the Colors page. Leftover Vite styles (`src/index.css`, `App.css`) and the Storybook theme (`.storybook/hotTheme.ts`) also hold raw colours: delete or leave.
- [ ] **Main nav background `#2e3641` is not a token.** Copied from the Omni_Master-Components Main Nav (the DS token would be `slateSurfaceDarkest`, `#334155`). Decide which dark is right and bind it to a token in Figma. The nav hover colour (`slateSurfaceDark600`) is my choice.
- [ ] **Asterisk in Figma.** The Textarea and Radio asterisks are still bound to variables from another library, and its text style (`body/md/medium`, Inter) is not a HOT text style.
- [ ] **Text styles are not variables.** The 12 Figma text styles exist only as CSS classes nobody uses; about 44 `font:` declarations are written as literals (34 equal a text style, 10 match none). No-match cases: the 12px/16px medium helper label in the stories, Admin sidebar headings (13px/18px), the small Avatar letter (9px/13.5px), and `Tabs.css` setting `font-weight` in 3 places. The Sub-nav and Shared Inboxes CSS add 7 more literals. Needs a yes: add one CSS variable per text style and replace the literals.

## 2. Decisions and Figma checks for built components

- [ ] **Hover states I chose (Figma draws none):** Admin sidebar items `slateSurfaceSubtle100Hover`; Main nav icons `slateSurfaceDark600`; Table row action buttons `slateSurfaceSubtle100Hover`; Sub-nav and Conversations sidebar `slateSurfaceSlate150`. Confirm one hover token for all, and the Table row action icon colour (`slateIconsActive`) and divider colour (`slateBorderLight`).
- [ ] **Selected-state tokens differ.** The Sub-nav uses `blueSurfaceSubtle` and `blueBorderDark`; the Admin and Conversations sidebars use `primarySurfaceSubtle` and `primarySurfaceDefault`. Same pixels, two token families. The Sub-nav selected item also sets its weight with `font-weight`, not a text style.
- [ ] **Admin sidebar spacing.** In Figma the AI group sits 4px further left than the other groups. All groups are aligned here. Match Figma or fix Figma.
- [ ] **Admin sidebar icon choices** were matched by shape (for example Knowledge Hub = `file`, Apps = `apps1`). Confirm against the Figma icon names.
- [ ] **Main nav avatar** is recoloured with `--avatar-bg`. Switch to the new Avatar `color` prop (red) if the shade matches Figma.
- [ ] **Table status toggle** uses our Switch; Figma draws a lighter plain toggle.
- [ ] **Empty state placeholder text.** Tags, Business hours ("small description"), No conversation found ("Have a description here") and Notifications ("Write a description here") still have Figma's placeholder text. Needs real copy. The Select-an-item state uses the open-mail icon: confirm. The Conversations empty state uses the DS Conversations icon at 1.5px, so it is lighter than the other 2px empty-state icons: decide whether it needs its own `emptystate_conversations`.
- [ ] **Chat inbox icon** (speech circle with three dots): check the Admin sidebar and empty states still look right.
- [ ] **Page layout.** The Home page has no minimum width: below about 700px the content gets very narrow.
- [ ] **Click ripple.** The product ripples on List items, the Main nav and the sidebars; here only Buttons and Tabs do. Decide.
- [ ] **Secondary Button hover** follows the product (grey fill, grey border), not Figma (blue text and border while pressed). The other variants follow Figma. Decide which is right.
- [ ] **Places that cannot use the Button component** yet: the plus-and-arrow split button in the Conversations sidebar (needs a SplitButton), the Input "Copy"-style action, the Tag remove cross (12px), the clickable SLA alert bar. The Modal close icon is 16px (Figma 14px) because the Button's icon slot is 16px.
- [ ] **Cross-check repeated components** against the original: Dropdown footer buttons vs Button, Dropdown search vs Input, and anything else that repeats. Not started.
- [ ] **Radio rows in Dropdown** get the grey row hover; the Radio page has no hover design. Decide whether radio rows behave like checkbox rows.
- [ ] **Checkbox** follows the dropdown checkbox interaction by decision; the Figma Checkbox page has not been updated to match.
- [ ] **Compact Button** is not built.
- [ ] **List item standalone rows.** The checkbox, radio and icon rows in the List item Playground, Docs and All Variants are my own compositions: Figma's Lists page only draws avatar or no left element. In the Playground, `leading: checkbox` is always ticked. Needs a yes from the designer: remove those options from the standalone List item pages and keep them inside Dropdown.

## 3. Modal

- [ ] **Four Figma modals not built:** Add a note and AI Summarizer (rich note editor with its own icon row and 28px buttons), Create a tag (colour swatch picker), Sign in with your own work email (blue info block with a title). The editor and the swatch picker need to be designed as components first.
- [ ] **Two reds.** The Button page's Error button is `errorBorderDefault` (#e42525); the modals use `errorSurfaceDefault` (#b81717). The modal overrides the Button. Decide which red is right and make both agree.
- [ ] **Modal red button has no hover or pressed colour.** The Figma Error/Surface scale is back to front ("Default" #b81717 is darker than "Dark"). Fix the token scale in the DS, then add hover and pressed to the modal's red button and check the Button page's Error hover.
- [ ] **To confirm:** buttons are 36px in Figma (not one of our heights 28, 32, 40), so the modal overrides them; scrim and shadow were not drawn in Figma; "Create a tag" header has 20px side padding, the others 16px (I used 16px); the radio group is 8px shorter than Figma (SLA Settings modal is 212px, not 220px); the Add Members field is a select-style input in Figma and a plain Input here.

## 4. Conversations sidebar

- [ ] Hover and selected colours are mine; Figma only draws the resting rows. The open inbox cards and the Active variant were not read.
- [ ] The plus-and-arrow button has a raw drop shadow (`rgba(0,0,0,0.08)`) copied from Figma.
- [ ] The Personal row has a count in Figma that is hidden (opacity 0).
- [ ] Slack, Voice and Email use the same views as Chat: not confirmed. Voice stays a plain row until its views are defined. The total capping at "99+" and Pending showing a count are my guesses.
- [ ] Counts are Inter in Figma; the sidebar uses the system font token.

## 5. Main nav menus

- [ ] The menus are placed by hand (`Flyout` in `MainNav.tsx`): move to the `Popover` component.
- [ ] Menu rows are their own markup, because List item and Dropdown rows are smaller (32px at the time) and look different.
- [ ] Nothing opens from the rows with a right arrow (Team Availability, Admin Panel, My Settings, Switch Account, all Help Center rows) or from "Your availability"; they only call `onMenuSelect`.
- [ ] The Help Center menu has no border or shadow in Figma; here it has the avatar menu's, so it shows on white. The 200ms fade and the hover colour (`slateSurfaceSlate150`) are my choices.
- [ ] The menus are not in the Docs page.

## 6. Sub-nav and Shared Inboxes page

- [ ] **Alignment after the spacing change.** The Shared Inboxes heading (now 24px high with 12px padding) no longer lines up with the Admin sidebar's 50px title row or the 60px bar over the page content. Check against Figma.
- [ ] The back arrow and the small arrow beside the title only call `onBack` and `onTitleClick`; nothing in Figma says what they open.
- [ ] The arrow beside the heading is a boxed button in Email, Slack and Chat, a bare arrow in SMS and WhatsApp, and missing in Voice. The data keeps this as drawn: it may be Figma frames that were not updated.
- [ ] WhatsApp has two "General settings" rows in Figma (the first labelled "Configuration"); read as Members, Configuration, General settings. Confirm.
- [ ] Icons: Slack Channels uses the DS `slackchannel`, whose # is drawn slightly differently; Messages (Voice) uses the Conversation Rules drawing; Automations and Settings use the same gear.
- [ ] The title row's border on the back button is a raw black placeholder in Figma, so none is drawn.
- [ ] "Shared Inboxes" heading uses `slateTextTitle`; Figma binds `slateTextBody` there.
- [ ] The switch menu follows a product screenshot, not a Figma design (the link given holds only the arrow button): sizes, 200ms fade and placement are mine. It is placed by hand: move to `Popover`. Long addresses are cut with an ellipsis.
- [ ] **Table on the Shared Inboxes page differs from Figma:** header 48px (Figma 50.5), header fill `slateSurfaceSubtle` (Figma `slateSurfaceSubtle100Hover`), outer corners 12px (Figma 8px), rows 64px (Figma 63px, 62px for the last). The Table component came from the Table page: decide which Figma is right.
- [ ] The page heading bar (60px, line under it) is plain markup: there is no page-header component.
- [ ] The settings pages (Members, Auto Assignment and so on) are not built: the content shows only the page name, centred ("SLA page").
- [ ] Deleting an inbox has no confirmation. "Create [Inbox]" does nothing yet (the create flow is not built). The heading arrow does nothing.
- [ ] The inbox's settings heading is the channel name; the inbox name only shows in the placeholder, because the Sub-nav frames show no inbox name (only Email has an address line).

## 7. Right panel

- [ ] **Sections drawn as plain rows** (their own layouts are not built): Previous conversations (conversation item), Notes, Insights (AI summary card), Activity (timeline) and the "View All" link. The Playground shows them that way.
- [ ] **Notes section** (Slack and WhatsApp) is not built per its Figma design: read the Notes frames in "Right panel by channel", build the note box and empty state, and reuse the "Add a note" box from `ActivityNotes` so both share one component.
- [ ] **Activity & Notes gaps:** the section header icon in Figma (clock with a back arrow) is not in the DS, so `clock` stands in; the ticket event icon in Figma differs from the DS Ticket icon; the note box and the day divider are plain markup (no note input or divider component); the line colour uses the `--slate150` primitive, as Figma binds it.
- [ ] **Tab bar** is a local copy: the Tabs component has no icon-only tab and is 36px tall. Replace it when Tabs can do icon-only at 48px. The Email frame's second icon on the right is not built. The hover colour and tooltip are mine.
- [ ] **Customize widgets:** the flyout is placed by hand (move to `Popover`); it keeps its own 8px under the title and 40px rows (override in `RightPanel.css`): decide whether it follows the Dropdown's 6px; hidden sections lose their open or closed state; its look may differ from the Figma flyout; the `reorderable` option is not in Figma and not in the Dropdown's Docs page.
- [ ] **Reordering sections:** keyboard reordering is not built; the new order is only remembered while the panel is on screen (`onReorder` gives it to the page). The same goes for the ticked sections (`onVisibleChange`).
- [ ] **Small differences from Figma:** an open Contact section is 4px taller (Figma has no gap before its last row); the panel draws one line between sections where Figma draws one above and one below each. The 250ms open and close slide and the hover on open sections are mine.
- [ ] **"Add" tag chip:** no clickable chip component exists, so a Tag sits inside a plain button.
- [ ] **Right panel database:** each field's icon was chosen by meaning, not read from Figma: check them. Voice's right panel is not built. Sub-section names and fields are example content: the real ones per channel are not defined.
- [ ] **Assignee and Status:** check against Figma: the dropdown width (Assignee 260px, Status 160px, right edge lined up with the value), the row heights inside them and the avatar colour given to each example person. The trigger shows a plain person icon (no round fill) when "None" is chosen. The chosen value is only remembered while the panel is on screen.
- [ ] **Dropdown not rechecked after the latest changes:** the country list in the phone input (its 6px flag gap is an estimate, not measured), and both right-panel dropdowns next to the Figma dropdown frames. The round icon fill (`iconBackground`) is the same colour as a row's hover fill, so it blends in when the row is hovered.

## 8. Input

- [ ] **Three differences from the Input Fields page in Figma:** the small size's focused and error corners are 6px in Figma (8px here); the With CTA field stays white on hover in Figma (turns grey here); the "https://" text prefix turns grey when disabled in Figma (stays `Slate/Text/Subtle` here).
- [ ] **Type checking:** `tsc -p .` checks nothing in this repo; use `tsc -p tsconfig.app.json` (currently no errors).

## 9. Icons

- [ ] **Still hand-drawn in components** (also drawn in the Figma frame 7162:9248): Checkbox tick and List item checkbox tick (8×6, 1.5 stroke); Checkbox dash (8×2); Tag remove cross (12px, 0.95 stroke); the 44px success check circle in the Modal story. Decide for each: use a DS icon (`Tick`, a dash, `Close` at 14px) or add the drawing to the DS.
- [ ] **Figma cleanup on the Icons page:** the frame 7162:9248 (it still holds the Bolt Filled drawing, which is not needed in Figma, and the drawings above) and the red test frame 7163:12.
- [ ] **Figma file oddities, left as they are:** icon name typos (`calander`, `clipbord`, `massage`), near-duplicate icons, the invisible 100×100 frame in the Tab hover variant, hidden check and cross icons in every Switch variant, a faint search icon colour in the Dropdown Menu radio style.

## 10. Other

- [ ] **Unexplained "Storybook published!" message** seen in the first Storybook session. Nothing was published on purpose. Ask whether anyone clicked a publish or share option.
- [ ] **Storybook pull request** [storybookjs/storybook#36853](https://github.com/storybookjs/storybook/pull/36853) (fixes a broken link in their README) is open. Watch for maintainer comments.
- [ ] **Commit history:** earlier commits in this repo carry a `Co-Authored-By: Claude` line. Say if they should be removed (needs a history rewrite and a force push).
