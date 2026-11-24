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
- **Decided:** typography now follows the Inter text styles in the Figma file (22 styles; it was Hanken Grotesk until 28-Oct, Figma moved to Inter by 01-Nov). Classes are named after the styles, for example `.text-body-md-medium`, replacing `.text-label-small`, `.text-body-small` and the H1–H4 classes. No component used the old H1–H4 or large body classes, so nothing else changed. H1 (36/44) and H2 (30/36) are gone because Figma has no matching style.
- **Built:** Input and Textarea helper text can show a 16px icon (`helperIcon`) and a success look (`success`: green `successTextBody` text with a tick). The helper text is now 12/18 (`body/xs/regular`). The 8px gap between icon and text is my estimate from a screenshot, not from Figma.
- **Built:** every Figma text style is now also a CSS variable (`--text-body-md-medium` and so on, in `typography.css`), and the `.text-*` classes use them. 60 hard-coded `font:` rules in component CSS now use the variables; the values are the same, so nothing should look different. Four story files that set a font inline use them too.
- **Fixed:** refetched the WhatsApp (14, 16), SMS (14, 16, 24) and Voice (14, 16) icons from the HOT Design System file; the drawings and stroke widths had changed in Figma. WhatsApp 24 and the Voice empty-state icon were unchanged.
- **Built:** new tokens from the HOT Design System file: three focus-ring colours (`--primaryEffectFocus`, `--slateEffectFocus`, `--errorEffectFocus`) in Style tokens, and a Numeric set: `--scale*` (px), `--spacing*`, `--radius*` and `--iconSize*` aliasing the scale. New Foundations/Spacing page (Spacing, Radius, Icon size, Scale). The token generator now also splits names on hyphens.
- **Built:** Badge, Button, Checkbox and Tag use the spacing, radius and icon-size tokens where their values sit on the scale (same pixel values, so nothing moves). Avatar had nothing on the scale. Values off the scale stay as px.
- **Built:** Avatar sizes, status dot, rings and radius use the spacing, icon-size and radius tokens. Small avatar stays 18px (hardcoded for now) and the small status dot is 8px (was 7.5px), because it snaps to the scale.
- **Built:** Checkbox uses the spacing, radius and icon-size tokens. The box margin is now 4px (was 5px; 2px, was 3px, without a label), and the corner radius 4px (was 3px), because they snap to the scale. The check and dash are centred with left 50% so they stay centred whatever the border width.
- **Built:** Button heights (28, 32, 40px) and the Button and Tag focus-ring width (2px) use the spacing tokens, same pixel values. The Tag close-button focus ring offset is now 2px (was 1px).
- **Built:** Dropdown, Input (with Textarea fields, tags and country list), List item and Modal use the spacing, radius and icon-size tokens wherever the value is on the scale (same pixel values). Off-scale values stay as px.
- **Built:** Dropdown: title line height 0 (token `--spacing0`, was 1px), row offsets 5px and 9px snapped to 4px and 8px, options max-height 256px (was 264px); Input country list offset 4px (was 5px).
- **Built:** List item checkbox radius 4px (was 3px) and its check mark centred with left 50% (as in Checkbox); radio and dot radius use `--radiusFull`; Modal corner button top is 16px (was 17px).
- **Built:** Radio, Sla, Switch (including its size variables) and Table use the spacing, radius and icon-size tokens wherever the value is on the scale (same pixel values). Popover had no pixel values. Off-scale values stay as px.
- **Built:** Radio circle margin 4px (was 5px), Radio and Switch circles use `--radiusFull`, SLA alert gap 12px (was 13px), Table row-actions padding 2px (was 3px).
- **Built:** Loader, Tabs and Tooltip use the spacing and radius tokens wherever the value is on the scale (same pixel values). Textarea shares the Input styles and the ripple helper has no pixel values, so both were already covered or needed nothing. Off-scale values stay as px.
- **Built:** Loader ring radius uses `--radiusFull` and its ring is 6px thick (was 7px); Tab underline width uses `--spacing05`.
- **Built:** Shared Inbox page uses the spacing tokens for its gaps and padding (same pixel values). The 60px heading bar height stays as px.
- **Built:** Empty state and Admin sidebar use the spacing and radius tokens wherever the value is on the scale (same pixel values). Widths stay as px. The Admin sidebar header is 48px (was 47px) and the Empty state icon is fully round (`--radiusFull`, was 110px).
- **Built:** Sub-nav, Conversations sidebar, Main nav and Right panel use the spacing, radius and icon-size tokens wherever the value is on the scale (same pixel values). Widths stay as px. Off-scale values stay as px.
- **Built:** Sub-nav menu top 64px (was 66px). Conversations sidebar header 48px (was 47px), split button gap 0 (was 1px), count pill radius `--radiusFull` (was 1000px) and the views line 16px from the left (was 17px).
- **Built:** Conversation card (components/ConversationCard): channel icon (email, Slack, chat, voice, SMS, WhatsApp) that turns into a checkbox on hover, name, date, one-line message with an optional reply arrow, SLA pills, tags and a +N count. Unselected (white, grey on hover) and selected (pale blue with a blue bar, no hover). Built from the Figma frame 3275:4534 using Checkbox, SlaPill, Tag and Icon.
- **Fixed:** Conversation card: selected bar uses `--primarySurfaceDefault` (as in the updated Figma), the message line uses the plain body/md/regular style (14/20), and coloured tags in the card get the 0.5px Border/Default border.
- **Fixed:** Tags follow the Figma frames 3275:4856 and 3275:4826: the seven pastel colours use Surface/Subtle, Text/Title and Border/Default. Every tag (grey default included) is 13px medium text (19px line) with 4px at the sides, a 0.5px border and a 14px close button at half strength, and is 20px tall. The SLA pills (FRT and RT) are 20px tall too (were 18px), with 4px at the sides and no gap between the icon and the text. The Conversation card gets this look from the Tag itself.
- **Built:** Conversation list pattern (patterns/ConversationList): a header with an icon and the view name, an "All Conversations" bar and a scrolling column of Conversation cards, with 5 to 8 dummy conversations per channel. On the Home page, choosing any view of a shared inbox (except Tags and All Views) shows the list; pressing a card selects it and shows nothing else yet. The sidebar counts now match the dummy lists.
- **Fixed:** Conversation card: the selected bar is drawn inside the card (a 1.5px inset shadow), so nothing moves when a card becomes selected. The content now starts 12px from the left in both states (Figma has it at 13.5px when selected).
- **Built:** Chat conversation view from the Figma frames 3278:5166, 3278:5244, 3278:5245 and 3278:5249: Chat message (user and agent), Reply box, and the Chat conversation pattern (top bar with the customer, scrolling thread, reply box that adds an agent message). Chat only.
- **Built:** Home page: pressing a Chat conversation in the list opens it in the Chat conversation view next to the list, with a dummy thread for each of the 8 Chat conversations. Replies sent there stay in the thread while you move between conversations. Other channels still show only the list.
- **Fixed:** The top row of the Home page is 44px tall in all three columns: the Conversation list header (was 43px), the Chat conversation top bar and the Right panel tab bar (was 48px). The Chat conversation no longer has left and right borders.
- **Built:** new icon from the HOT Design System file: Collapse view (14 and 16px), name `collapseview`.
- **Fixed:** the Conversation list header uses the new `collapseview` icon (was `splitview`).
- **Fixed:** Right panel tab: the tab was still 48px tall inside the 44px bar, so its underline sat below the bar line. The tab now stretches to the bar, so the underline sits on the line.
- **Fixed:** the Conversation list header title uses body/md/medium (14/20), was body/lg/medium (16/24).
- **Built:** Home page: opening an inbox in the sidebar lands on its first view, and going to any view of a shared inbox selects its first conversation card (also when the page loads), and for Chat it opens the conversation. The Chat inbox is now called Website Chat (was Chat inbox 01).
- **Built:** new icon from the HOT Design System file: Double tick (14 and 16px), name `doubletick`.
- **Built:** WhatsApp conversation (Figma frame 3280:6031): the Chat conversation pattern takes channel=whatsapp, which adds read ticks (new Double tick icon) after agent messages and a WhatsApp templates button (new Whatsapp Template icon, 14 and 16px) to the reply box. WhatsApp conversations open on the Home page with dummy threads. Messages in the thread are 12px apart in Chat and WhatsApp.
- **Built:** a new Storybook section, Conversation Views, with Chat and WhatsApp (moved out of Patterns). WhatsApp agent messages follow the updated Figma frame 3280:6097: a white card with a 1px border and a faint shadow, with blue ticks after the time.
- **Fixed:** Conversation card: the second line (the message, and the reply arrow before it) uses `--slateTextSubtle`.
- **Built:** SMS conversation view (Conversation Views / SMS): like Chat, but agent messages use the WhatsApp white card, with no ticks. SMS conversations open on the Home page with dummy threads for all 6.
- **Fixed:** Chat message: the bubble hugs its text (it no longer stretches to the width of the name and time line). Agent messages are right-aligned with their name and time, user messages left-aligned.
- **Built:** Chat, SMS and WhatsApp conversation views mimic the customer: about 2 seconds after the agent sends a message, a generic reply from the customer arrives (stories and Home page). Shared helper: simulatedReply.ts.
- **Changed:** WhatsApp and SMS: the user message background is `--slateSurfaceSlate150` (Slate/Surface/slate_150), was pale blue. Chat is unchanged.
- **Built:** Agentation installed (dev dependency) and mounted in the Storybook preview, in development only: a toolbar at the bottom right of the canvas to click elements and leave notes for an AI agent.
- **Built:** Home page: pressing the icon at the top of the Conversation list hides the Conversations sidebar (the Main nav stays and the list moves up next to it); pressing it again shows the sidebar. New: PageLayout `sidebarCollapsed`, Conversation list `onIconClick`.
- **Built:** hiding the Conversations sidebar slides over 250ms with ease-in-out (the content slides with it), and it is hidden from Tab once gone. No motion with reduced-motion. Easing is now the default for anything that shows, hides or slides.
- **Fixed:** the icon button at the top of the Conversation list no longer turns blue when pressed: the icon keeps its colour and the hover grey stays.
- **Built:** Conversation card: Unread state (Figma frames 3291:390 and 3291:344): light grey (`--slateSurfaceSubtle100Hover`), an 8px blue dot before the date, and a medium-weight date and message. In the Conversation list a few conversations per channel are unread, and an unread conversation becomes read once opened.
- **Fixed:** the unread card background follows the updated Figma frames: `--slateSurfaceSubtle100Hover` (Slate/Surface/Subtle_100 (Hover)), was pale blue.
- **Built:** Slack conversation view (Conversation Views / Slack), from the Slack frame 3017:24702 and the linked-conversations repo, in the new Inter typography: full-width Slack messages (new Slack message component) with a hover toolbar (add a reaction, delete your own message, open in Slack), reactions you can add and remove, the channel chip (#support) in the top bar and the shared reply box with the Slack hint. Slack conversations open on the Home page with 6 dummy threads, and the customer replies about 2 seconds after you send.
- **Changed:** the hint (placeholder) text in the Reply box, used by Chat, WhatsApp, SMS and Slack, uses `--slateTextDisabled` (Slate/Text/Disabled), was `--slateBorderDark`.
- **Built:** Email conversation view (Conversation Views / Email), from the linked-conversations prototype, mapped to the new typography and tokens: Email message card (open and closed), Email editor (Tiptap rich text with a formatting bar and Send), and the Email conversation pattern (top bar, subject bar, thread, reply above the message). Send adds the message and the customer answers about 2 seconds later. Email conversations open on the Home page with 8 dummy threads. Tiptap installed.
- **Built:** Avatar large size (32px, `size="large"`, 14px medium letter, 8px status dot in the corner). The Slack message and the Email message (open and closed) use it.
- **Changed:** the Chat message, Reply box, Slack message, Email message and Email editor pages are no longer in the sidebar. Their descriptions moved into the Docs of the Chat, WhatsApp, SMS, Slack and Email conversation views. The components stay in the code.
- **Fixed:** Email message: the avatar, address and time stay at the same position when a message opens or closes (the open header used to centre the 32px avatar, 4.5px lower than in the closed card).
- **Changed:** Email conversation: the toolbar from the Figma frame 3295:303 (expand all, divider, reply, reply all, forward, divider, open in new window) sits beside the subject, replacing the reply, reply all and forward buttons there. The top bar keeps its four icon buttons (unread, mailbox, print, AI).
- **Changed:** the second line of a conversation card always shows the latest message that was received or sent, never an activity ("chat was reopened"). A sent message shows with the reply arrow; a received one shows its first line. The arrow now shows on every channel except voice. On the Home page the line updates as you send and the customer answers.
- **Changed:** Right panel top section: the Assignee, Status and Tags rows are 36px tall, like the field rows in the sections below (were 44px, 44px and 34.5px).
- **Built:** new icon from the HOT Design System file: Co-assignee (14px only, name `coassignee`). Right panel: a Co-assignee field right below Assignee, with the same people list and search, starting as None (`CoAssigneeField`). Only the Email channel has it. The top-section labels stay on one line so "Co-assignee" does not wrap.
- **Changed:** Co-assignee is only on the Email channel (removed from the other channels). Checked in the browser: the top-section rows of the right panel are 36px on every channel.
- **Built:** editable custom fields in the Right panel, copied from the activity-notes prototype: text and number (press, type, Enter saves, Escape drops; numbers take digits and one decimal point) and a new date field with a calendar (react-day-picker installed). New CustomField and CustomFieldsList; the example panel has MRR (number), Plan (text) and Date (date).
- **Changed:** Right panel: the hover fill of the Assignee, Co-assignee and Status select is `--slateSurfaceSubtle100Hover` (was `--slateSurfaceSlate150`), the same as the custom fields. It applies to every channel.
- **Fixed:** Right panel: the line on its left no longer disappears when a section header is hovered. It was an inside shadow that the header fill painted over; it is now a 1px line drawn above the sections. Applies to every channel.
- **Built:** the Home page is now a reusable page, `src/pages/HomePage` (`<HomePage data={…} />`), driven by one data file, `homeData.ts`: the inboxes (channels), their conversations and messages, and the custom fields. The Storybook story feeds it every channel's dummy conversations. The starter shows it from `App.tsx`, so a designer's AI only edits `homeData.ts` (for example "only SMS and WhatsApp, 2-3 conversations each, three custom fields"). The Right panel's contact name and email follow the open conversation. Not browser-checked.
- **Built:** `public/PRODUCT-GUIDE.md` (copied to the starter): a guide for the designers' AI on how Hiver works (channels, inboxes, Home vs Admin) and what to do for each kind of request, for example keeping the Home page and the Admin panel's inboxes in step. `CLAUDE.md` and `START-HERE.md` tell the AI to read it first. It is written by hand and grows as new requests need a decision.
- **Built:** the starter switches between the Home page and the Admin panel from the Main nav (Conversations and Admin Panel). HomePage and SharedInboxesPage take an `onNavChange` prop; `starter/src/App.tsx` holds the current page. Not browser-checked.
- **Changed:** START-HERE no longer reads `COMPONENTS.md` at the start (about 8k tokens); it reads `CLAUDE.md` and `PRODUCT-GUIDE.md` only (about 2k), and `COMPONENTS.md` later when a request needs a new page or component.
- **Changed:** the AI docs are written for the AI, not for people: START-HERE, the starter CLAUDE.md and PRODUCT-GUIDE are short and dense; COMPONENTS.md is now an index (about 1.5k tokens, was 8.2k) and each component's props and example are in `docs/<Name>.md`, read only when that component is used. Page layouts are in `docs/recipes.md`. START-HERE installs quietly.
- **Changed:** the phone input's default country (United States) uses the emoji flag like every country in the list; the drawn `UnitedStatesFlag` component is removed.
- **Fixed:** the starter failed to start (`slack-logo.svg` not found by the Slack message): the sync now copies that asset to `starter/src/assets`. A copy of the starter was installed, type-checked and built in a scratch folder with no errors.
- **Changed:** START-HERE asks its questions first (after only the Node and empty-folder checks), waits for the answers, then copies, installs, builds the data and only then starts the app, so the first thing the designer sees is the finished prototype.
- **Changed:** START-HERE tells the AI to ask its three questions with its own question UI when it has one (Claude Code: AskUserQuestion, with checkboxes for channels and single-choice for the rest), and in plain text otherwise.
- **Changed:** START-HERE's questions use fixed wording and one label per option (the AI had merged channels such as "Chat + WhatsApp"): the channel question is "All six channels" or "Only some", with the names typed under Other (the tool allows 4 options, so six checkboxes are not possible); conversations 3 or 5; "Anything else you wanna include?"; no "(Recommended)" tags. Then simplified: channels are a typed answer in chat, conversations "3 to 5" or "8 to 10" plus Other.
- **Changed:** START-HERE asks two questions (channels typed in chat; "Anything else you wanna include?"). Dummy conversations are no longer asked: 2-3 per inbox by default.

## Several inboxes of one channel on Home
- `HomeInbox` has an optional `id`; the Home sidebar tells inboxes apart by `id` (else channel), so two Email inboxes show as two entries. PRODUCT-GUIDE updated. Not browser-checked (tsc only).

## Tags sidebar
- New pattern `TagsSidebar` (Patterns/Tags sidebar) from Figma node 3298:565. On Home, choosing Tags in an inbox slides it over the Conversations sidebar (250ms ease-in-out, reduced-motion off); back arrow slides out. Tags and counts come from the inbox conversations. Not browser-checked (tsc only). Create-tag plus and tag selection do nothing yet.

## All Views sidebar
- New pattern `AllViewsSidebar` (Patterns/All Views sidebar) from Figma node 3298:673, Email only. On Home it slides over the Conversations sidebar like Tags (250ms ease-in-out). Favourites open their view; others only highlight. Not browser-checked (tsc only).

## Tags sidebar: more menu
- Tag count is right-aligned; on hover it gives way to a vertical-dots button that opens Edit / Delete (Popover + icon Dropdown). `onEdit` / `onDelete` props; Home does not act on them yet. Not browser-checked (tsc only).

## Tags / All Views keep the conversation view
- Choosing Tags or All Views only swaps the sidebar; the open conversation view and selected conversation stay. Back arrow returns to the previous view. Tags and All Views rows now have 6px corners. Not browser-checked (tsc only).

## Tag more menu: right side, narrower
- `Popover` has a new `right-start` placement (beside the anchor). The Tags row menu opens on the right of the dots button, 140px wide; the dots button has no background. Not browser-checked (tsc only).

## Menu component
- New `Menu` component (Components/Menu) from Figma node 3302:3657: the Edit / Delete flyout. The Tags row more button opens it (Popover right-start), replacing the Dropdown. Not browser-checked (tsc only).

## Smoother Tags / All Views slide
- 300ms on cubic-bezier(0.32, 0.72, 0, 1) (was 250ms ease-in-out), panel also fades in, the sidebar under it drifts 24px right and dims; GPU-only (transform, opacity). Not browser-checked (tsc only).

## Tags interactions in the right panel
- Ported `TagsField` from Vinay-Hiver/activity-notes (only that): removable tag chips plus an Add chip that opens a searchable checkbox list with Cancel / Apply. Home keeps tags per conversation; the cards and the Tags sidebar counts follow the edits. Not browser-checked (tsc only). Not brought over: the activity log of tag changes.

## Tags / All Views slide: only the panel moves
- The Conversations sidebar behind the Tags / All Views panel no longer drifts or dims; only the panel slides (300ms, cubic-bezier(0.32, 0.72, 0, 1), fades in). Not browser-checked (tsc only).

## Tags / All Views exit slower
- Exit now 300ms ease-in-out (it reused the fast-start ease-out curve and felt abrupt); entrance unchanged. Not browser-checked.

## All Views: favourite stars
- Added a `star` icon (14px, from the fav-views prototype, same drawing as the Figma frame). Favourites show a filled yellow star; the other views show an empty star on hover that moves them up to My favorites on press (max 5, tooltip at the limit). Counts moved to the extreme right. Taken from Vinay-Hiver/fav-views: only the star interaction (no team/admin favourites, no drag reorder, no kebab). Not browser-checked (tsc only).

## Email sidebar lists only favourite views
- On Home, an Email inbox in the Conversations sidebar lists only its favourite views (starred in All Views; default Mine, Unassigned, Team, Tickets), then Tags and All Views. Starring or unstarring updates the sidebar. Other channels unchanged. Not browser-checked (tsc only).

## Tag filter in the Conversation list
- In the Tags sidebar, choosing a tag titles the Conversation list with the tag name and keeps only conversations with that tag (live with tag edits); choosing it again or going back clears it. Not browser-checked (tsc only).

## Conversation list: select all and unread filter
- Under the list title: a select-all checkbox (selects every conversation shown in the view, dash when partly selected; cleared when the view changes) and the "All Conversations" label with an arrow that opens Show all / Unread only. Works for every channel and view since they share the list. The Menu is now as wide as its content (no 200px minimum). "Unread Conversations" as the label for the unread filter, and the 176px menu width, are my guesses from the screenshot. Not browser-checked (tsc only).

## Bulk actions panel
- New pattern `BulkActionsPanel` (Patterns/Bulk actions panel) taken from Vinay-Hiver/tickets-add-merge: illustration, "N items selected", Mark as unread, Assign to, Change status, Manage tags, line, Cancel (no Merge, no Add to ticket). On Home it shows as soon as one conversation is ticked, replacing the conversation and right panel. ConversationList has new `checkedIds` / `onCheckedIdsChange`. Actions do nothing yet. Not browser-checked (tsc only).

- Bulk actions panel: the Email-only restriction was undone; it shows for every channel again.

## Status tabs in the tag view
- Filtering by a tag now shows tabs right under the list title (Figma 3302:5400): Unresolved (count, arrow with Open / Pending checkboxes), Closed, All. Tabs got an optional per-tab arrow (`menu`); conversations got an optional `status` (default open). Not browser-checked (tsc only). Not built from that frame: the sort and filter icons in its header.

## Tag tabs polish and empty states
- Status tabs fill the width equally; underline on the bottom edge; the Open/Pending menu opens under the Unresolved tab, left edges lined up (gap 0, as in Figma). Empty list: grey count band + "No conversations found" (Figma 3302:5577); Home shows the Empty state (email icon, "Take a chill pill!") beside an empty list in place of the conversation and right panel. Not browser-checked (tsc only).

## Tag tabs fix
- Tabs were cut off ("Unresolved" clipped, arrow hidden): they now fill the width but are never narrower than their content. In the tag view "All Conversations" is plain text, no dropdown. Personal's Tags no longer opens an empty Tags sidebar. Checked in the browser (Storybook Home page): tab widths 148/77/47 in a 299px row, underline at the row bottom, menu left edge and top equal the tab left and bottom, menu 165px wide.

- Status tabs label size 14px -> 13px, the same as the "All Conversations" label.

- Status tabs: the Unresolved arrow now sits at the far end of its tab (label and count at the start). Not browser-checked.
