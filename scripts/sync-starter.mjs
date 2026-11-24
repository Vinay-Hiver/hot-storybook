// Refreshes starter/ (the template for new prototypes) from this repo: the components, patterns, icons, tokens and the
// Shared Inboxes page, plus the agent docs. Run with `npm run agent-docs` (it runs this after building the docs).
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'

const keep = (src) => !/\.(stories\.tsx|mdx)$/.test(src) && !/node_modules/.test(src)
const folders = ['components', 'patterns', 'icons', 'tokens', 'pages/SharedInboxes', 'pages/HomePage']

for (const f of folders) {
  rmSync(`starter/src/${f}`, { recursive: true, force: true })
  mkdirSync(`starter/src/${f}`, { recursive: true })
  cpSync(`src/${f}`, `starter/src/${f}`, { recursive: true, filter: keep })
}
// Files in src/assets that components import (the Slack logo); the rest of src/assets is Vite's demo art
mkdirSync('starter/src/assets', { recursive: true })
for (const f of ['slack-logo.svg', 'bulk-select.png']) cpSync(`src/assets/${f}`, `starter/src/assets/${f}`)
for (const f of ['COMPONENTS.md', 'ICONS.md', 'PRODUCT-GUIDE.md']) cpSync(`public/${f}`, `starter/${f}`)
rmSync('starter/docs', { recursive: true, force: true })
cpSync('public/docs', 'starter/docs', { recursive: true })
if (existsSync('public/favicon.svg')) { mkdirSync('starter/public', { recursive: true }); cpSync('public/favicon.svg', 'starter/public/favicon.svg') }
console.log('starter/ refreshed from the components, patterns, icons, tokens and docs')
