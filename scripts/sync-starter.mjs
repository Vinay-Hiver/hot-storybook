// Refreshes starter/ (the template for new prototypes) from this repo: the components, patterns, icons, tokens and the
// Shared Inboxes page, plus the agent docs. Run with `npm run agent-docs` (it runs this after building the docs).
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'

const keep = (src) => !/\.(stories\.tsx|mdx)$/.test(src) && !/node_modules/.test(src)
const folders = ['components', 'patterns', 'icons', 'tokens', 'pages/SharedInboxes']

for (const f of folders) {
  rmSync(`starter/src/${f}`, { recursive: true, force: true })
  mkdirSync(`starter/src/${f}`, { recursive: true })
  cpSync(`src/${f}`, `starter/src/${f}`, { recursive: true, filter: keep })
}
for (const f of ['COMPONENTS.md', 'ICONS.md']) cpSync(`public/${f}`, `starter/${f}`)
if (existsSync('public/hiver-favicon.png')) { mkdirSync('starter/public', { recursive: true }); cpSync('public/hiver-favicon.png', 'starter/public/hiver-favicon.png') }
console.log('starter/ refreshed from the components, patterns, icons, tokens and docs')
