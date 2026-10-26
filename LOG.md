# LOG

What was built, what was decided and what was fixed, day by day. Newest at the bottom. Sources: the git history (commit dates and messages), the dated notes that were kept in `THINGS_TO_BE_FIXED.md` while the work happened, and the working sessions themselves. Where a note gives an earlier date than the commit that carried the work, the note's date is used and the commit is named.

Dates are written day and month (for example 17-Oct) because the work is all in 2026; the year gets added everywhere once we are in 2027.

Each entry is marked **Built**, **Decided** (who chose what, and why where it is known) or **Fixed**. This file is the history; open items live in `THINGS_TO_BE_FIXED.md`.

Nothing is recorded for the days before the first commit except what the notes dated 02-Oct and 03-Oct say. The first commit holds everything built up to that point.

## Before the first commit

- **02-Oct, Built:** a token audit of colours and typography. Every `var(--…)` resolved to a real token; the hard-coded values and the literal font declarations were listed.
- **03-Oct, Fixed:** the required asterisk now uses one token, `errorBorderDefault`, in Input, Textarea, Radio and Checkbox, matching the updated Text Input in Figma.

## 05-Oct

- `7bad58d` **Built:** the HOT design system Storybook, from Figma.
  - Foundations pages: Colors, Typography, Icons.
  - Tokens (`tokens.css`, `typography.css`) and the scripts that generate them, and the icon data, from Figma exports.
  - Components: Avatar, Badge, Button, Checkbox, Dropdown, Input, List item, Loader, Radio, Switch, Tabs, Tag, Textarea, Tooltip.
  - Storybook set-up and theme.

## 07-Oct

- `65b8c27` **Built:** Table with row actions, Admin sidebar, Main nav, and the RT/FRT pill.
- `4a46b07` **Built:** Empty state pattern with 19 states from Figma.
  - **Decided:** the empty-state icons stay a separate 24px set with a 2px outline (Figma draws them that way), not the 14/16px HOT icons.
- `3455577` **Built:** pill and alert merged into one SLA component; docs slimmed down; 300ms tooltip delay.
- `defcc59` **Built:** Modal, with a single Playground.
  - **Decided:** Modal buttons are 36px tall as drawn in Figma (not one of the Button heights), so the modal overrides them. The modal uses the darker red (`errorSurfaceDefault`) from its own Figma frames, not the Button page's red. The red button's hover and pressed colours were removed, because the Figma Error/Surface scale is back to front.
- `7654642` **Built:** Conversations sidebar; Main nav aligned to the Omni_Master-Components file; tooltip updates.
  - **Decided:** the Main nav follows the Omni_Master file (50px wide, its own dark background, 24×26.875 logo, red avatar) rather than the tokens. Hover and selected colours for the sidebars are my choice, because Figma draws only resting rows.
- `0c624ac` **Built:** Page layout (Home page and Admin panel variants), Conversations sidebar inbox views that open with an animation, and sample data shared between stories.
  - **Decided:** widths: Main nav 50, sidebars 240, Right panel 320, content flexible. Inbox rows show the total when closed, an arrow in its place on hover, no total when open (behaviour from the designer's description). The total caps at "99+".
- **Built:** Chat inbox icon replaced from the DS file (14, 16 and 24px).
- **Fixed:** List item rows with a description show a chevron on the right (not a tick), and a row with nothing on either side is 36px tall.

## 08-Oct

- `851cd2e` **Built:** click ripple on every Button variant and on Tabs; the "filled" button renamed `secondary-filled`.
  - **Decided:** the ripple is copied from the product (a circle growing to 2.5× over 400ms, fading out), in `slateTextTitle` at 10%, which is nearly the product's black at 10%.
- `338ad46` **Built:** the Button component used for icon buttons (Modal footer and close, Table row actions, sidebar search); product hover added to the secondary button.
  - **Decided:** icon-only ghost buttons at 28px with negative margin, to keep Figma's layout. The Modal close icon is 16px (Figma 14px) because the Button's icon slot is 16px.
- `d9ed561` **Fixed:** secondary Button hover matched to the product's Button (grey fill, grey border), replacing Figma's blue pressed look.
- `4055c0f` **Built:** Right panel with drag-and-drop sections; Drag icon.
  - **Decided:** the field row (icon, label, value) is plain markup with shared CSS, not a component (your decision). Dragging is copied from the omni-boilerplate right panel (`@dnd-kit`). The drag shadow uses the text colour token at 12%.

## 09-Oct

- `942eb4a` **Built:** Right panel database (data for five channels: Chat, Slack, WhatsApp, SMS, Email), Customize widgets, per-channel inbox views in the Conversations sidebar, SMS and Ticket icons, updated Slack icon, `slate150` sidebar hover.
  - **Decided:** section names stay as drawn in Figma even when the same section is named differently per channel; every section starts open; icons per field chosen by meaning for now; Voice's right panel comes later; Customize widgets lists the sections with a checkbox each; the "Priorityy" and "Custom Fields" labels were cleaned up.
  - **Decided:** the Customize widgets flyout is placed by hand because there is no popover component; the Dropdown got an optional `reorderable` setting so its rows can be dragged.
- `f483c7a` **Built:** Tick-2 icon, used for the Closed view.

## 10-Oct

- `4b666f6` **Built:** Search option in Input, an optional label control, updated Bot icon, the Customize widgets flyout fades in and out.
- `bebbe06` **Built:** Right panel: all 10 sections in the Playground, Custom fields icon. **Fixed:** row and header sizes matched to Figma (rows 36px, header 49px, top section rows 32px).
- `f2da712` **Built:** Right panel: Activity & Notes layout from Figma; updated Mailbox icon.
  - **Decided:** the note box and day divider are plain markup (no components exist for them); the clock icon stands in for the history icon that the DS lacks.
- `4342fcf` **Built:** Conversations sidebar: expandable My Work, press ripple on rows, Settings-3 hover icon, bolt glyph.

## 14-Oct

- `0f605ca` **Built:** Textarea 80px minimum and 100px maximum height.
- **Built:** Main nav menus (avatar menu and Help Center menu), committed on 17-Oct.
  - **Decided:** the menu rows are their own markup, because the Dropdown and List item rows were smaller; menus fade in over 200ms, like the tooltips.

## 15-Oct

Built on this day (per the notes) and committed on 17-Oct:

- **Built:** Sub-nav and its database (page lists for Email, Slack, Chat, Voice, SMS and WhatsApp).
- **Built:** Admin panel > Shared Inbox page (channel list, inbox table, per-inbox Sub-nav, delete on row hover).
- **Built:** Create inbox button on each inbox list page; Sub-nav switch menu (a list of the channel's other inboxes).
  - **Decided:** the page shows the inbox's own name as the heading (not the channel name); the heading of the placeholder page is only the page name, centred; every inbox list page has a primary "Create [Inbox]" button at the top right.
  - **Decided:** the switch menu follows a product screenshot, because the Figma link held only the arrow button.
  - **Decided:** the Dropdown option got a `description` line and the List item a choice of tick or chevron on the right, for this menu.
  - **Decided:** the Voice inbox uses the DS Voice icon everywhere.

## 17-Oct

- `9bd45f6` **Icons, Sub-nav, Shared Inboxes and Input.**
  - **Built:** whole icon set re-synced from the DS file (new: Conversation Rules, Widget Design, Transcript, AI Agent, Code 3, Mailbox 24px, Email Inbox 24px; changed: Mailbox, Bot).
  - **Built:** Conversations, Help-Chat and Spam icons in the DS icon set; Chevron_Left, Chevron_Top and Chevron_Down; Bolt Filled added to Storybook.
  - **Decided:** Dropdown (icon) deleted from the DS and replaced by Chevron_Down, which draws the same thing (your choice): its 122 instances in Figma were swapped first. The new chevrons were made by rotating Chevron_Right.
  - **Decided:** Bolt Filled lives only in Storybook, not in Figma.
  - **Decided:** the empty-state icons are named `emptystate_[name]` and kept in their own frame in Figma, not inside the main Icon set.
  - **Built:** Input prefix (none, icon, text) and suffix (none, icon, text, count), replacing `showCount`; the country list is at least 320px wide, the default width of the phone input. **Decided:** this model was your design.
  - **Built:** Sub-nav spacing set from the Figma frames (12px padding, 12px under the heading, 4px between items).
  - **Built:** Storybook housekeeping: Controls panels tidied and ordered for every story, a play icon for Playground stories, the PAGES section split into PAGES (Home page, Admin panel) and ADMIN PANEL (Shared inboxes).
  - **Fixed:** hand-drawn glyphs replaced by DS icons (Conversations, Help-Chat, Spam, Add for the plus, Bolt Filled for the SLA bolt); the sidebar's tick and chevron icons use the DS Tick and Chevron_Right.
  - **Fixed:** `tsc -p .` checks nothing in this repo; `tsc -p tsconfig.app.json` is the real check, and it found a duplicate import and two type errors, now fixed.
  - **Fixed:** the glyph system hid DS icons of the same name; the DS icons are used now.
- `5c5e73a` **Right panel Assignee and Status.**
  - **Built:** Popover component; Avatar `color` prop; status icons (open, pending, closed) that keep their own token colours (the icon generator keeps any colour written as `var(--token)`); Assignee and Status fields with a hover chevron and a dropdown, in the top section of every channel's panel.
  - **Decided:** the Dropdown is not tied to a row style: any row can bring its own icon, avatar colour, round icon fill or left element, so lists can mix row kinds (for example a "None" icon row above avatar rows). The icon style no longer draws a placeholder flag.
  - **Decided:** hover on the Assignee and Status values uses the same grey as the Conversations sidebar (`slateSurfaceSlate150`) and a white 18px box with a down chevron. The status icons stay at 14px (scaled to 18px in the row).
  - **Decided:** Dropdown spacing (all yours): rows 40px (36px text only), 8px insets for the search box and the rows, 8px above the search box, 6px above the options, a 10px visible gap between a mark and its text, the tick and text-only rows 9px in, the Status dropdown 160px wide.
  - **Fixed:** the Dropdown's selected row now shows the blue tick in the plain, avatar and icon styles; the Dropdown Playground ignored its `reorderable` control (it never passed it on); the title is now a toggle in the Playground.
  - **Fixed:** the gap under the search box was measured from the search area instead of the visible box, so it was 8px or 14px, not 6px; fixed by moving all spacing to the list.
  - **Fixed:** the Controls panel showed "Set boolean" and hyphen rows; plain on/off props now start at false, and rows that cannot be set from a panel are hidden.

## 18-Oct

- `c387480` **Built:** `emptystate_notification` and `emptystate_aiagent` (2px stroke), so all 17 empty-state icons are in the icon set and read from there.
  - **Decided:** all empty-state icons use a 2px stroke (your decision); Notification and AI agent got their own versions instead of reusing the DS icons. The Conversations empty state still uses the DS Conversations icon.
  - **Fixed:** the last pattern glyph (`unassigned`) was the same drawing as the DS Unassigned 2 icon; the sidebar now uses it, and `glyphs.tsx` is deleted. A note that called the 14px Chevron_Right misnamed was out of date (it had already been renamed in Figma).
- `4eecc95` **Built:** Modal moved from Patterns to Components (your decision: it is one reusable container, like Dropdown and Tooltip); sidebar sections in a fixed order with everything inside a section alphabetical; background and grid buttons hidden from the toolbar; Page layout docs link to the other pages.
- `18d0ebb` Notes entry for the above.
- **Decided:** the Figma Design tab (`@storybook/addon-designs`) was tried and removed again, at your request.
- **Built:** pull request [storybookjs/storybook#36853](https://github.com/storybookjs/storybook/pull/36853), opened from the `Vinay-Hiver` account with no co-author line, fixing a broken link in Storybook's README.
- **Decided:** `THINGS_TO_BE_FIXED.md` holds only what needs action; this file holds what was built, decided and fixed.

## 26-Oct

- **Built:** Agent docs and the starter template. `public/COMPONENTS.md` (components, props, tokens, page recipes, about 5,600 tokens) and `ICONS.md` are generated from the code before every Storybook build; `starter/` is a ready Vite and React project with the components; `public/START-HERE.md` is the one file a designer drops into a folder and asks Claude to read. **Decided:** the package option is parked for later; the setup has to be plug and play (a plain markdown file, no install).
- **Built:** Email and Account Type columns in the Shared Inboxes > Email inboxes table (one account type for each of the four inboxes).
- **Decided:** every counted view in each inbox shows 1 conversation by default, so an inbox's total is its number of counted views.
- **Built:** the Voice inbox now has views (Mine, Unassigned, All assigned, Tags, Closed) and Personal has views (Inbox, Tags, Archived, Trash), from the screenshots you sent.
- **Built:** the 11 file-type icons for attachments (PDF, PPT, XLS, DOC, DOCX, MP4, MOV, TXT, ZIP, RAR, Image) from the Multiple Attachments in Notes file, as `filepdf`, `fileppt` and so on, at a new 30px size. **Decided:** the 24×30 drawing sits in a 30×30 canvas (3px added on each side, so the square is exact); the icons keep their own colours, bound to the pastel tokens; the ZIP and RAR body uses the same colour as DOC (`pastelYellow700`).
- **Built:** Sub-navs for Admin panel > Schedule (Shifts, Business Hours) and Settings (Identity & Access, Deliverability, Plans & Billing, Account), in the Sub-nav database; the Pages > Admin panel story now switches between Shared Inbox, Schedule and Settings from the Admin sidebar. Icons: calendar, clock, identity, building, wallet and the DS Account icon.
- **Decided:** Admin sidebar items follow the Sub-nav item spacing (Figma 3209:8118): 216px wide, 12px in from each side, 2px apart (changed from the Figma 4px at the user's request), 32px high, 8px padding and gap. The section headings and the header now start at 20px, in line with the icons.
- **Decided:** the browser tab reads "Storybook • Page name" (was "Page name ⋅ Storybook"), set in `.storybook/manager.ts`.
- **Decided:** text in the Admin sidebar and the Sub-nav cannot be selected (`user-select: none`).
- **Decided:** Voice, SMS and WhatsApp inbox Sub-navs now use the boxed switcher with the inbox menu, like Email, Slack and Chat (Voice had none; SMS and WhatsApp had the bare arrow).
