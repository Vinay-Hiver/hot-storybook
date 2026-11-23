Hiver prototype on the HOT design system. AI-facing; terse on purpose.
- Read PRODUCT-GUIDE.md first (what to do per request). COMPONENTS.md (index) only for a new page/component; then docs/<Name>.md per component used. ICONS.md only to pick an icon.
- Home page is ready: src/App.tsx shows HomePage/SharedInboxesPage (Main nav switches). Change content by editing data files only (homeData.ts, SharedInboxes/data.ts). Never rebuild pages.
- Run: `npm run dev`. No Storybook, no new project.
- Components + `var(--tokens)` + `<Icon>` only. No hex, own SVG, other UI lib. Missing component: tell user which, don't fake it.
- Do not open src/components or src/patterns. Do not re-read files you just wrote. Verify with `npx tsc --noEmit` only; no screenshots/browser unless asked. Keep replies short.
- New pages: src/pages/<Name>.tsx, shown from src/App.tsx.
