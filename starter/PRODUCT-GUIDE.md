# HIVER PRODUCT GUIDE (AI-facing)
This file wins over your guesses. Not covered: state your assumption in one line, continue. Never invent product behaviour.

## MODEL
- Support agents answer conversations. Channels: chat, whatsapp, sms, slack, email, voice. Channel has inboxes (e.g. two email inboxes).
- Home = agent view: nav, sidebar (inboxes>views), conversation list, open conversation, right panel (+custom fields).
- Admin > Shared Inboxes = admin view: per-channel inbox tables.
- INVARIANT: inbox on Home <=> inbox in Admin (same channels, same names, same count). Always change both.

## FILES (src/pages/...)
- HomePage/homeData.ts: Home data. Types in file header. Edit. HomePage.tsx: never.
- SharedInboxes/data.ts `sharedInboxChannels`: Admin data. Per channel: {id,label,singular,icon,inboxes:[{id,name,(email,accountType: email only)}]}. SharedInboxesPage.tsx: never.
- src/App.tsx: switches Home/Admin from Main nav (Conversations/Admin Panel). Already done.

## PLAYBOOK (do ALL steps of a request, not only what was named)
- "boilerplate/home page": App.tsx already shows it. Only edit data.
- "only channels X,Y": homeData.inboxes keep X,Y; data.ts sharedInboxChannels keep X,Y. Tell user channels now on both.
- "N inboxes" / "two <channel> inboxes": Home: one HomeInbox per inbox; several of one channel = same `channel`, unique `id` (e.g. email-2), own label + conversations. Admin: N rows under the channel (SharedInboxes/data.ts), names = Home labels.
- "N dummy convos" (none given = 2-3 per inbox, general support topics): N conversations per inbox in homeData. Names ONLY from NAMES below, never invent others. Unique ids `<channel>-<n>`. Mix unread, some agent replies. Channel voice: sms/whatsapp short; email has `subject`,`email`, paragraph bodies; slack has `slackChannel`; voice has `call:'incoming'|'outgoing'`, no messages.
- "custom fields": homeData.customFields [{id,label,kind:'text'|'number'|'date',value?}], date value YYYY-MM-DD. Other kinds NOT BUILT: tell user.
- "show admin": Main nav Admin Panel already opens it. Ensure data.ts matches Home.
- "new page": src/pages/<Name>.tsx; PageLayout variant home|admin; read COMPONENTS.md then docs/<Name>.md of components used; layouts in docs/recipes.md.
- "change look": existing component props only; tokens only; cannot => tell user what is missing.

## NAMES (the only people in the product)
Any dropdown/list of people: "None" first, then A-Z by name (sort in code, do not rely on data order).
Agents: Aarav Mehta (the signed-in user, "Me"/"You"), Priya Nair, Rohan Iyer, Emma Clarke, Liam Carter, Sophie Turner, Daniel Brooks.
Customers: Kavya Reddy, Arjun Menon, Olivia Hayes, Noah Bennett, Chloe Parker, Ethan Cole, Grace Miller, Lucas Reed.
Emails: first.last@example.com (customers), first.last@acme.com (agents). 5 of the 15 are Indian names.

## INVARIANTS
- Only an inbox has Tags / All Views sidebars (Personal's Tags does not open one). In the tag view the "All Conversations" label has no dropdown.
- A list showing nothing (empty view, empty tab or filter) shows the Empty state beside it, no conversation and no right panel.
- Ticking any conversation card in the list replaces the conversation and right panel with the bulk actions panel (Cancel clears it); its actions do nothing yet.
- Co-assignee field: email only. Card 2nd line = latest message (sent = reply arrow); never an activity.
- Tags view (inboxes only): Tags sidebar slides over the Conversations sidebar (tags+counts from the inbox's conversations; back arrow returns). Choosing a tag filters the list, titles it with the tag and shows Unresolved/Closed/All tabs (Unresolved arrow: Open/Pending checkboxes); conversation `status` open|pending|closed, default open. Each tag row has a more menu (Edit/Delete, not wired).
- All Views (Email only): All Views sidebar over the Conversations sidebar. Stars choose the favourite views; an Email inbox lists only its favourites (default Mine, Unassigned, Team, Tickets), then Tags and All Views. Max 5.
- Tags/All Views change the sidebar only: the conversation view stays as it is.
- Conversation list: select-all checkbox + "All Conversations" menu (Show all / Unread only; no menu in the tag view). Ticking any card shows the Bulk actions panel (Mark as unread, Assign to, Change status, Manage tags, Cancel; the four do nothing yet) in place of conversation and right panel.
- Tags field in the right panel is editable (Add chip, remove, Apply); cards and Tags counts follow it. Edits reset on reload.
- Right panel values (email, names, custom fields) stay on one line and end in "..." when too long (full text on hover); only Tags wrap.
- Voice: list only, no conversation view. Customer auto-replies ~2s after agent sends (built in; keep).
- Never edit src/components or src/patterns. Wrong behaviour there: tell user.

## GAPS (edit as closed)
- Home/Admin data not shared: edit both files.
- Custom field kinds: text, number, date. Voice: no conversation view. Nav items other than Conversations/Admin Panel do nothing.

## EXTEND
Add a PLAYBOOK line when a request needed a decision not made here: quoted request -> exact steps+files.
