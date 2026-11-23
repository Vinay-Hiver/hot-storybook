// Builds public/COMPONENTS.md: one short page an AI agent can read to build screens with the HOT components,
// instead of opening component files. Run with `npm run agent-docs`; it also runs before every Storybook build.
// Everything is read from the code (props, defaults, icon names, tokens), so it cannot go out of date. Only the
// examples and the rules at the bottom are written by hand, in EXAMPLES and RULES below.
import { globSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
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

const RULES = `RULES
- Use only these components. Missing component/icon/behaviour: tell the user which, never draw a copy.
- Colours/fonts: CSS vars only (\`var(--slateTextBody)\`), no hex. Spacing/radius/icon sizes: \`--spacingN\` (N=px/4), \`--radiusN\` (N=px), \`--iconSizeXs|Sm|Md|Lg\` when the value matches.
- Icons: \`<Icon name size={14|16|24} />\` (14 marks, 16 buttons/rows). No own SVG.
- Never start Storybook. Run \`npm run dev\` only. Each component imports its own CSS; tokens/fonts load in src/main.tsx.
- Page shell: \`PageLayout\` variant home (nav, sidebar, content, rightPanel) | admin (nav, sidebar, subNav, content). Snippets: docs/recipes.md.
- Before using a component read docs/<Name>.md (props, defaults, example). Do not open files in src/components or src/patterns.`

const RECIPES = `# Page recipes (only for NEW layouts; Home and Admin already exist as pages, see PRODUCT-GUIDE.md)

Home layout:
\`\`\`tsx
<PageLayout variant="home"
  nav={<MainNav items={navSampleItems} footerItems={navSampleFooterItems} value="conversations" user={{ initial: 'A', name: 'Alex' }} userMenu={navSampleUserMenu} />}
  sidebar={<ConversationsSidebar sections={sampleSections(true, ['chat'])} value="chat-unassigned" />}
  rightPanel={<RightPanel aria-label="Details" tabs={[{ id: 'inbox', label: 'Shared Inbox', icon: 'sminbox' }]}><RightPanelTop title="Inbox name"><AssigneeField /><StatusField /></RightPanelTop></RightPanel>}>
  {content}
</PageLayout>
\`\`\`
imports: PageLayout, MainNav, ConversationsSidebar, RightPanel, RightPanelTop, AssigneeField, StatusField from ./patterns/<Name>; navSample* from ./patterns/MainNav/sampleData; sampleSections from ./patterns/ConversationsSidebar/sampleData.

Admin layout:
\`\`\`tsx
<PageLayout variant="admin" nav={<MainNav ... value="admin" />} sidebar={<AdminSidebar sections={adminSampleSections} value="shared-inbox" />} subNav={<SubNav title="…" items={items} value={id} onChange={setId} />}>{content}</PageLayout>
\`\`\`
sample* data only fills navigation with example entries; replace with real items.
`

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

let out = `# HOT components (AI index, generated by npm run agent-docs)\n\n${RULES}\n\n`

const used = new Set()
let compText = ''
for (const g of groups) {
  const exported = exportsOf(g.dir)
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
      compText += `### Radio\n\`import { Radio } from './components/Radio'\` — one option inside a RadioGroup (below).\n- \`value\`: string — what this option stands for\n- \`label?\`: ReactNode\n- \`disabled?\`: boolean\n\n`
      continue
    }
    compText += `### ${d.displayName}\n`
    const desc = firstSentence(d.description ?? '')
    compText += `\`import { ${d.displayName} } from './${g.dir.replace('src/', '')}/${folder}'\`${desc ? ` — ${desc}` : ''}\n`
    if (props.length) compText += `${props.map(([n, p]) => propLine(n, p, htmlOnly(n, p) ? ownDeclaration(source, n) : null)).join('\n')}\n`
    else compText += '(no props)\n'
    if (EXAMPLES[d.displayName]) compText += `\n\`\`\`tsx\n${EXAMPLES[d.displayName]}\n\`\`\`\n`
    compText += '\n'
  }
}

// Icons: their own file (read it only when you need to pick an icon)
const iconSrc = readFileSync('src/icons/iconData.ts', 'utf8')
const iconNames = JSON.parse(iconSrc.match(/export const iconNames = (\[.*?\]) as const/s)[1])
const iconsDoc = `# HOT icons\n\nGenerated by \`npm run agent-docs\`. \`import { Icon } from './icons'\` then \`<Icon name="mailbox" size={16} />\`. The colour is the text colour of the parent (set \`color: var(--slateTextBody)\`). If a size is not drawn for an icon, the nearest one is used. Icons starting with \`emptystate\` are for empty states only. Icons \`filepdf\`, \`filedoc\`, \`filexls\` and the other \`file…\` ones are the 30px file-type icons: use \`size={30}\`.\n\n${iconNames.length} names: ${iconNames.join(', ')}\n`
writeFileSync('public/ICONS.md', iconsDoc)
const iconsLine = `ICONS: ${iconNames.length} names in ICONS.md (read only to pick one). \`<Icon name="mailbox" size={16} />\` from './icons'.`

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
// Components: an index line each here, the props and example in docs/<Name>.md (read on demand)
rmSync('public/docs', { recursive: true, force: true })
mkdirSync('public/docs', { recursive: true })
const index = []
for (const sec of compText.split(/^### /m).slice(1)) {
  const name = sec.split('\n')[0].trim()
  const importLine = sec.split('\n')[1] ?? ''
  const path = importLine.match(/from '\.\/([^']+)'/)?.[1] ?? ''
  const purpose = (importLine.split(' — ')[1] ?? '').trim()
  writeFileSync(`public/docs/${name}.md`, `# ${name}\n${sec.split('\n').slice(1).join('\n').trim()}\n`)
  index.push(`${name} | ${path} | ${purpose}`)
}
writeFileSync('public/docs/recipes.md', RECIPES)
out += `COMPONENTS (Name | import path under src | purpose; props+example in docs/<Name>.md)\n${index.join('\n')}\n\n${iconsLine}\n\n`

out += `COLOUR TOKENS: var(--<family><Role><Variant>), e.g. var(--slateTextBody). Roles: ${roles.join(', ')}.\n`
const pastel = Object.keys(fam).filter((f) => /^pastel/.test(f))
for (const [f, r] of Object.entries(fam)) {
  if (/^pastel/.test(f)) continue
  out += `${f}: ${roles.filter((x) => r[x]).map((x) => `${x}[${r[x].join('/')}]`).join(' ')}\n`
}
if (pastel.length) out += `${pastel.join(',')}: Surface/Text/Border, same variants\n`
out += `FONTS: Inter. Classes .text-<style> (e.g. .text-body-md-medium 14/20, .text-heading-lg 20/28); vars font: var(--text-body-md-medium). All styles: src/tokens/typography.css\n`

writeFileSync('public/COMPONENTS.md', out)
const chars = out.length
console.log(`public/COMPONENTS.md: ${chars} characters, about ${Math.round(chars / 4)} tokens at start (${used.size} components, ${iconNames.length} icons)`)
