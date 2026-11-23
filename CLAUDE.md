Maintainer notes for AI working in THIS repo (the Storybook). The designers' prototype instructions are in starter/CLAUDE.md and public/PRODUCT-GUIDE.md.
- `npm run storybook` runs it; run `npm run build-storybook` before pushing (it also runs `npm run agent-docs`).
- `npm run agent-docs` regenerates public/COMPONENTS.md, public/docs/, public/ICONS.md and refreshes starter/ (copies components, patterns, icons, tokens, pages/SharedInboxes, pages/HomePage; no stories or mdx). Never hand-edit starter/src except starter/src/App.tsx; starter/CLAUDE.md and starter/package.json are hand-maintained.
- public/PRODUCT-GUIDE.md is hand-written, AI-facing: add a PLAYBOOK line whenever a designer request needed a decision it did not make. Keep it terse.
- The designers' start: public/START-HERE.md, fetched from the raw GitHub URL in README.md (repo is public, branch main).
- LOG.md = history; THINGS_TO_BE_FIXED.md = open items only.
- Update a component's .mdx Docs page whenever its values change. Use spacing/radius/iconSize tokens when the value is exact. Never test in the browser unless asked.
