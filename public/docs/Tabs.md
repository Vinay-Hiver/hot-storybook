# Tabs
`import { Tabs } from './components/Tabs'` — The row of tabs only.
- `tabs`: TabItem[]
- `value`: string — The selected tab's value.
- `onChange`: function
- `variant?`: "outlined" | "filled" (default outlined) — Outlined = underline tabs.

```tsx
<Tabs tabs={[{ value: 'all', label: 'All' }, { value: 'mine', label: 'Mine' }]} value={tab} onChange={setTab} />
```
