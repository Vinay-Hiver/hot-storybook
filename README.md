# HOT Design System Storybook

Hiver's HOT design system as working React components, built from Figma. Browse every component, colour, icon and text style, or use them to build a prototype with Claude.

**Browse it:** https://hot-storybook.vercel.app

## Build a prototype with Claude (no coding needed)

1. **Install Node.js** (version 18 or newer) from https://nodejs.org if you don't have it.
2. **Make an empty folder** for your prototype, for example `My prototype`.
3. **Download [`START-HERE.md`](public/START-HERE.md)** and put it in that folder.
4. **Open the folder in Claude Code** (the Claude desktop app, Code tab, or `claude` in a terminal).
5. **Type:** `Follow START-HERE.md`

Claude copies the starter, installs it quietly, runs it and gives you a local address to open. The starter opens on a working Hiver prototype: the **Home page** (sidebar, conversation list, conversations, right panel with custom fields) and the **Admin panel** (Shared Inboxes), switched from the Main nav. Describe what you want in plain words, for example:

> Build me the boilerplate of Hiver. I want only SMS and WhatsApp channels, with 2-3 dummy convos in each, and 3 custom fields: MRR (number), Plan (text) and Date (date).

Claude changes the data, not the page, so the result looks like the product. A new page can be built from the same components, and a screenshot or Figma link works too. If a component you need doesn't exist yet, Claude tells you instead of drawing a copy.

You need access to this GitHub repo for the setup to work.

## What's inside

| Section in Storybook | What you find |
|---|---|
| Foundations | Colours, typography, spacing, radius, icons |
| Components | Button, Input, Dropdown, Modal, Tabs, Table and more, with props and Docs |
| Patterns | Main nav, Sub-nav, Admin sidebar |
| Conversation Views | Chat, WhatsApp, SMS, Slack and Email conversations |
| Pages | Full screens built from the above: Home page and Admin panel |

`starter/` is the template a prototype is copied from. It is refreshed by `npm run agent-docs` (also runs before every Storybook build), so never edit `starter/src` by hand, except `starter/src/App.tsx`, `starter/CLAUDE.md` and `starter/package.json`.

### Files written for the AI (not for people)

They are short and dense on purpose, to keep the designers' token use low. What is read when:

| File | Read | What it is |
|---|---|---|
| `public/START-HERE.md` | first, by the designer's Claude | the setup commands |
| `starter/CLAUDE.md` | at start | the working rules |
| `public/PRODUCT-GUIDE.md` | at start | how Hiver works and what to do for each request (channels, inboxes, Home vs Admin, which data files to edit). **Hand-written: this is the AI's brain; add a line whenever a request needed a decision it did not make.** |
| `public/COMPONENTS.md` | only for a new page or component | index of components, colour tokens, rules (generated) |
| `public/docs/<Name>.md`, `docs/recipes.md` | per component used | props, defaults and an example (generated) |
| `public/ICONS.md` | only to pick an icon | icon names (generated) |

The Home page reads `src/pages/HomePage/homeData.ts` (channels, conversations, custom fields); the Admin panel reads `src/pages/SharedInboxes/data.ts`. The two are not shared yet, so the guide tells the AI to change both together (see its Gaps list).

## Run Storybook locally (for the design system team)

```bash
npm install
npm run storybook
```

Opens at http://localhost:6006. Run `npm run build-storybook` before pushing. `LOG.md` is the history of what was built and `THINGS_TO_BE_FIXED.md` lists open items.
