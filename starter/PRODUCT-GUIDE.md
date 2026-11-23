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
- "N inboxes" / "two <channel> inboxes": Home sidebar = ONE inbox per channel today. If N>1 for a channel say so, don't fake via rename. Admin: N rows under the channel, names = Home names.
- "N dummy convos": N conversations per inbox in homeData. Names from The Office (Michael Scott, Dwight Schrute, Pam Beesly, Jim Halpert, Angela Martin...). Unique ids `<channel>-<n>`. Mix unread, some agent replies. Channel voice: sms/whatsapp short; email has `subject`,`email`, paragraph bodies; slack has `slackChannel`; voice has `call:'incoming'|'outgoing'`, no messages.
- "custom fields": homeData.customFields [{id,label,kind:'text'|'number'|'date',value?}], date value YYYY-MM-DD. Other kinds NOT BUILT: tell user.
- "show admin": Main nav Admin Panel already opens it. Ensure data.ts matches Home.
- "new page": src/pages/<Name>.tsx; PageLayout variant home|admin; read COMPONENTS.md then docs/<Name>.md of components used; layouts in docs/recipes.md.
- "change look": existing component props only; tokens only; cannot => tell user what is missing.

## INVARIANTS
- Co-assignee field: email only. Tags and All Views views: no list. Card 2nd line = latest message (sent = reply arrow); never an activity.
- Voice: list only, no conversation view. Customer auto-replies ~2s after agent sends (built in; keep).
- Never edit src/components or src/patterns. Wrong behaviour there: tell user.

## GAPS (edit as closed)
- Home/Admin data not shared: edit both files.
- Home: 1 inbox per channel. Custom field kinds: text, number, date. Voice: no conversation view. Nav items other than Conversations/Admin Panel do nothing.

## EXTEND
Add a PLAYBOOK line when a request needed a decision not made here: quoted request -> exact steps+files.
