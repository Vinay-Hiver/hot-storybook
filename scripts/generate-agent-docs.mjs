// Builds public/COMPONENTS.md: one short page an AI agent can read to build screens with the HOT components,
// instead of opening component files. Run with `npm run agent-docs`; it also runs before every Storybook build.
// Everything is read from the code (props, defaults, icon names, tokens), so it cannot go out of date. Only the
// examples and the rules at the bottom are written by hand, in EXAMPLES and RULES below.
import { globSync, readFileSync, writeFileSync } from 'node:fs'
import { withCustomConfig } from 'react-docgen-typescript'

// ---------- hand-written parts ----------

/** One short example per component, as it would be written in a page (imports are shown once at the top of each group). */
const EXAMPLES = {
  Button: `<Button variant="primary" size="sm" iconLeft={<Icon name="add" size={16} />}>Create</Button>`,
  Input: `<Input label="Email" placeholder="name@company.com" prefix={<Icon name="mailbox" size={14} />} helperText="We never share it" />`,
  Textarea: `<Textarea label="Note" placeholder="Write a note" maxLength={200} showCount />`,
  Checkbox: `<Checkbox label="Remember me" checked={on} onChange={(e) => setOn(e.target.checked)} />`,
  RadioGroup: `<RadioGroup label="Priority" name="p" value={p} onChange={setP}><Radio value="low" label="Low" /><Radio value="high" label="High" /></RadioGroup>`,
  Switch: `<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="Enabled" />`,
  Dropdown: `<Dropdown variant="avatar" searchable searchPlaceholder="Search" options={[{ value: 'a', label: 'Abhay', color: 'yellow' }]} value={v} onChange={setV} />`,
  Popover: `<Popover open={open} onClose={() => setOpen(false)} anchorRef={ref}><Dropdown options={options} /></Popover>   // ref points at the button that opens it`,
  Modal: `<Modal title="Delete inbox?" onClose={close} actions={<><Button variant="secondary">Cancel</Button><Button variant="error">Delete</Button></>}>This cannot be undone.</Modal>`,
  Table: `<Table aria-label="Inboxes" columns={[{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }]} rows={rows} getRowId={(r) => r.id} rowActions={[{ icon: 'delete', label: 'Delete' }]} />`,
  Tabs: `<Tabs tabs={[{ value: 'all', label: 'All' }, { value: 'mine', label: 'Mine' }]} value={tab} onChange={setTab} />`,
  Tag: `<Tag color="violet" onRemove={remove}>Finance</Tag>`,
  Badge: `<Badge type="primary">12</Badge>`,
  Avatar: `<Avatar initial="P" size="small" color="red" status="online" />`,
  Tooltip: `<Tooltip content="Delete"><Button iconOnly variant="ghost" aria-label="Delete"><Icon name="delete" /></Button></Tooltip>`,
  Loader: `<Loader />`,
  ListItem: `<ListItem label="Billing" description="billing@acme.com" leading={<ListIcon name="mailbox" />} onClick={open} />`,
  SlaPill: `<SlaPill kind="frt" status="due" />`,
  EmptyState: `<EmptyState icon="search" title="No inboxes yet" description="Create one to get started." action={<Button size="sm">Create</Button>} />`,
  PageLayout: `<PageLayout variant="home" nav={<MainNav ... />} sidebar={<ConversationsSidebar ... />} rightPanel={<RightPanel ... />}>{content}</PageLayout>`,
  SubNav: `<SubNav title="Shared Inboxes" items={[{ id: 'email', label: 'Email Inboxes', icon: 'mailbox' }]} value={id} onChange={setId} />`,
  AssigneeField: `<AssigneeField value={who} onChange={setWho} />   // inside <RightPanelTop>, next to <StatusField />`,
}

const RULES = `## Rules

- Build with the components above. If something you need is not here, say so instead of drawing a copy of it by hand.
- Colours and fonts come from the tokens (CSS variables), never from hex values: \`color: var(--slateTextBody)\`, not \`#334155\`.
- Icons come from \`<Icon name="…" size={14 | 16 | 24} />\` (names below). 14px is for non-clickable marks, 16px for buttons and rows, 24px is rarely used. Do not paste your own SVGs.
- Do not start Storybook to find out what exists: this file lists it. Start the app with \`npm run dev\` only.
- Each component imports its own CSS. Tokens and fonts load once, in \`src/main.tsx\` (\`tokens/tokens.css\`, \`tokens/typography.css\`).
- Layout: wrap a page in \`PageLayout\` (\`variant="home"\` has Main nav, sidebar, content, right panel; \`variant="admin"\` has Main nav, Admin sidebar, Sub-nav, content). The content area fills what is left.`

const RECIPES = `## Page recipes

**Home page** (Main nav, Conversations sidebar, content, right panel):

\`\`\`tsx
import { PageLayout } from './patterns/PageLayout'
import { MainNav } from './patterns/MainNav'
import { ConversationsSidebar } from './patterns/ConversationsSidebar'
import { RightPanel, RightPanelTop } from './patterns/RightPanel'
import { navSampleItems, navSampleFooterItems, navSampleUserMenu } from './patterns/MainNav/sampleData'
import { sampleSections } from './patterns/ConversationsSidebar/sampleData'

<PageLayout
  variant="home"
  nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value="conversations" user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
  sidebar={<ConversationsSidebar sections={sampleSections(true, ['chat'])} value="chat-unassigned" />}
  rightPanel={<RightPanel aria-label="Details" tabs={[{ id: 'inbox', label: 'Shared Inbox', icon: 'sminbox' }]}><RightPanelTop title="Inbox name"><AssigneeField /><StatusField /></RightPanelTop></RightPanel>}
>
  {/* the page content */}
</PageLayout>
\`\`\`

**Admin page** (Main nav, Admin sidebar, Sub-nav, content): a ready-made one is \`src/pages/SharedInboxes\` (\`<SharedInboxesPage channel="email" />\`); build a new one the same way:

\`\`\`tsx
<PageLayout variant="admin" nav={<MainNav ... value="admin" />} sidebar={<AdminSidebar sections={adminSampleSections} value="shared-inbox" />} subNav={<SubNav title="…" items={items} value={id} onChange={setId} />}>
  {/* the page content */}
</PageLayout>
\`\`\`

The \`sample…\` data files only fill the navigation with example entries; replace them with your own items.`

// ---------- read the code ----------

const groups = [
  { title: 'Components', dir: 'src/components', note: 'Import from `components/<Name>` (for example `import { Button } from \'./components/Button\'`).' },
  { title: 'Patterns', dir: 'src/patterns', note: 'Bigger pieces of a page. Import from `patterns/<Name>`.' },
]

const exportsOf = (dir) => {
  const names = new Map()
  for (const idx of globSync(`${dir}/*/index.ts`)) {
    const folder = idx.split('/').at(-2)
    const text = readFileSync(idx, 'utf8')
    for (const m of text.matchAll(/^export \{([^}]*)\} from/gm)) {
      for (const part of m[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/).at(-1)
        if (/^[A-Z]/.test(name) && !/^export type/.test(m[0])) names.set(name, folder)
      }
    }
  }
  return names
}

const files = globSync('src/{components,patterns}/**/*.tsx').filter((f) => !/stories|sampleData|ripple/.test(f))
const parser = withCustomConfig('tsconfig.app.json', {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: () => true, // filtered below, because the filter cannot see where a prop is declared
})
const docs = parser.parse(files)

const SKIP_PROPS = /^(id|className|style|key|ref|children|forceState|force[A-Z].*|data-force-state|aria-.*)$/
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s)
const firstSentence = (s) => clip(s.replace(/\s+/g, ' ').replace(/`/g, '').split(/(?<=\.)\s/)[0] ?? '', 85)

const typeOf = (p) => {
  const t = p.type
  if (t.name === 'enum' && Array.isArray(t.value)) {
    const vals = t.value.map((v) => v.value).filter((v) => v !== 'undefined')
    if (vals.length) return clip(vals.join(' | '), 110)
  }
  const raw = (t.raw ?? t.name).replace(/\s*\|\s*undefined$/, '').replace(/\s+/g, ' ').replace(/^\((.*)\)$/, '$1')
  if (/=>/.test(raw) && !/^[{[]/.test(raw)) return 'function'
  if (/^\{/.test(raw)) return clip(raw, 60)
  return clip(raw, 90)
}

// For a prop that has the same name as a browser attribute (color, title), the type checker only reports the browser's
// type and comment, so read the component's own line from its file instead.
const ownDeclaration = (source, name) => {
  const m = source.match(new RegExp(`(?:/\\*\\*([^*]*(?:\\*(?!/)[^*]*)*)\\*/\\s*)?\\n?\\s+${name}\\??:\\s*([^\\n]+)`))
  if (!m) return null
  let type = m[2].trim().replace(/\s*\/\/.*$/, '')
  const alias = source.match(new RegExp(`type ${type} =\\s*([^\\n]+)`))
  if (alias) type = alias[1].trim()
  return { description: (m[1] ?? '').replace(/\s*\n\s*\*?\s*/g, ' ').trim(), type }
}

const propLine = (name, p, own) => {
  const def = p.defaultValue?.value
  const type = own ? clip(own.type.replace(/'/g, '"'), 110) : typeOf(p)
  const bits = [`- \`${name}${p.required ? '' : '?'}\`: ${type}`]
  if (def !== undefined && def !== null && def !== '' && !/\n/.test(String(def)) && String(def).length <= 40) bits.push(`(default ${def})`)
  // the long comments on callbacks add little; the name says it
  const d = /^on[A-Z]/.test(name) ? '' : firstSentence(own ? own.description : (p.description ?? ''))
  return `${bits.join(' ')}${d ? ` — ${d}` : ''}`
}

let out = `# HOT components for building pages

Generated from the code by \`npm run agent-docs\` (do not edit by hand). Read this one file instead of opening component files.

`
out += `${RULES}\n\n`

const used = new Set()
for (const g of groups) {
  const exported = exportsOf(g.dir)
  out += `## ${g.title}\n\n${g.note}\n\n`
  const mine = docs
    .filter((d) => exported.has(d.displayName) && d.filePath.includes(`/${g.dir.split('/').at(-1)}/`))
    .sort((a, b) => a.displayName.localeCompare(b.displayName))
  for (const d of mine) {
    if (used.has(d.displayName)) continue
    used.add(d.displayName)
    const folder = exported.get(d.displayName)
    // keep a prop when it is declared in our code (even if the browser's HTML attributes also have one of that name, like `color`)
    // (the type checker sometimes lists only the browser's declaration for such a prop, so also accept a prop that the component's own file declares)
    const source = readFileSync(d.filePath, 'utf8')
    const declaredHere = (n, p) => (p.declarations ?? []).some((x) => !/node_modules/.test(x.fileName)) || new RegExp(`\\n\\s+${n}\\??:`).test(source)
    const htmlOnly = (n, p) => !(p.declarations ?? []).some((x) => !/node_modules/.test(x.fileName))
    const props = Object.entries(d.props).filter(([n, p]) => !SKIP_PROPS.test(n) && declaredHere(n, p))
    if (d.displayName === 'Radio') {
      // Radio and RadioGroup share a file, and the type checker mixes their props: write Radio's by hand
      out += `### Radio\n\`import { Radio } from './components/Radio'\` — one option inside a RadioGroup (below).\n- \`value\`: string — what this option stands for\n- \`label?\`: ReactNode\n- \`disabled?\`: boolean\n\n`
      continue
    }
    out += `### ${d.displayName}\n`
    const desc = firstSentence(d.description ?? '')
    out += `\`import { ${d.displayName} } from './${g.dir.replace('src/', '')}/${folder}'\`${desc ? ` — ${desc}` : ''}\n`
    if (props.length) out += `${props.map(([n, p]) => propLine(n, p, htmlOnly(n, p) ? ownDeclaration(source, n) : null)).join('\n')}\n`
    else out += '(no props)\n'
    if (EXAMPLES[d.displayName]) out += `\n\`\`\`tsx\n${EXAMPLES[d.displayName]}\n\`\`\`\n`
    out += '\n'
  }
}

// Icons: their own file (read it only when you need to pick an icon)
const iconSrc = readFileSync('src/icons/iconData.ts', 'utf8')
const iconNames = JSON.parse(iconSrc.match(/export const iconNames = (\[.*?\]) as const/s)[1])
const iconsDoc = `# HOT icons\n\nGenerated by \`npm run agent-docs\`. \`import { Icon } from './icons'\` then \`<Icon name="mailbox" size={16} />\`. The colour is the text colour of the parent (set \`color: var(--slateTextBody)\`). If a size is not drawn for an icon, the nearest one is used. Icons starting with \`emptystate\` are for empty states only. Icons \`filepdf\`, \`filedoc\`, \`filexls\` and the other \`file…\` ones are the 30px file-type icons: use \`size={30}\`.\n\n${iconNames.length} names: ${iconNames.join(', ')}\n`
writeFileSync('public/ICONS.md', iconsDoc)
out += `## Icons\n\n\`<Icon name="mailbox" size={16} />\` (\`import { Icon } from './icons'\`). ${iconNames.length} icons: the names are in \`ICONS.md\` (read it only when you need to pick one). Sizes 14 (marks), 16 (buttons and rows), 24 (rare).\n\n`

// Tokens
const css = readFileSync('src/tokens/tokens.css', 'utf8')
const names = [...new Set([...css.matchAll(/^\s*--([A-Za-z0-9]+):/gm)].map((m) => m[1]))]
const roles = ['Text', 'Surface', 'Border', 'Icons']
const fam = {}
for (const n of names) {
  const m = n.match(/^([a-z][A-Za-z]*?)(Text|Surface|Border|Icons)([A-Z][A-Za-z0-9]*)?$/)
  if (!m) continue
  ;((fam[m[1]] ??= {})[m[2]] ??= []).push(m[3] ?? 'Default')
}
out += `## Colour tokens\n\nUse them as \`var(--<family><Role><Variant>)\`, for example \`var(--slateTextBody)\`, \`var(--primarySurfaceDefault)\`, \`var(--slateBorderLight)\`. Roles: ${roles.join(', ')}. Families and the variants that exist:\n\n`
const pastel = Object.keys(fam).filter((f) => /^pastel/.test(f))
for (const [f, r] of Object.entries(fam)) {
  if (/^pastel/.test(f)) continue
  const parts = roles.filter((x) => r[x]).map((x) => `${x}: ${r[x].join('/')}`)
  out += `- ${f} — ${parts.join('; ')}\n`
}
if (pastel.length) out += `- ${pastel.join(', ')} — the accent colours; each has Surface, Text and Border in the same variants as above\n`
out += `\nFonts: Hanken Grotesk 400 and 500, already set on the page. Text sizes in use: 12/18, 14/20, 16/24 (size/line-height).\n\n`

out += `${RECIPES}\n`

writeFileSync('public/COMPONENTS.md', out)
const chars = out.length
console.log(`public/COMPONENTS.md: ${chars} characters, about ${Math.round(chars / 4)} tokens (${used.size} components, ${iconNames.length} icons)`)
