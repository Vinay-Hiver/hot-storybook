# HOT Design System Storybook

Hiver's HOT design system as working React components, built from Figma. Browse every component, colour, icon and text style, or use them to build a prototype with Claude.

**Browse it:** https://hot-storybook.vercel.app

## Build a prototype with Claude (no coding needed)

1. **Install Node.js** (version 18 or newer) from https://nodejs.org if you don't have it.
2. **Make an empty folder** for your prototype, for example `My prototype`.
3. **Download [`START-HERE.md`](public/START-HERE.md)** and put it in that folder.
4. **Open the folder in Claude Code** (the Claude desktop app, Code tab, or `claude` in a terminal).
5. **Type:** `Follow START-HERE.md`

Claude copies the starter, installs it, runs it and gives you a local address to open. Then it asks what page you want to build. Describe the page in plain words, or paste a screenshot or a Figma link.

Your prototype uses the real HOT components, colours and icons, so it looks like the product. If a component you need doesn't exist yet, Claude tells you instead of drawing a copy.

You need access to this GitHub repo for the setup to work.

## What's inside

| Section in Storybook | What you find |
|---|---|
| Foundations | Colours, typography, spacing, radius, icons |
| Components | Button, Input, Dropdown, Modal, Tabs, Table and more, with props and Docs |
| Patterns | Main nav, Sub-nav, Admin sidebar |
| Pages | Full screens built from the above |

`starter/` is the template your prototype is copied from. `public/COMPONENTS.md` and `public/ICONS.md` list every component and icon for Claude.

## Run Storybook locally (for the design system team)

```bash
npm install
npm run storybook
```

Opens at http://localhost:6006. Run `npm run build-storybook` before pushing. `LOG.md` is the history of what was built and `THINGS_TO_BE_FIXED.md` lists open items.
