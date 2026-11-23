# SubNav
`import { SubNav } from './patterns/SubNav'`
- `title`: string — The heading at the top, for example the name of the inbox being set up.
- `subtitle?`: string — The small line under the heading, for example the inbox's email address.
- `items`: SubNavItem[]
- `value?`: string — The id of the selected item.
- `onChange?`: function
- `onBack?`: function
- `onTitleClick?`: function
- `switcher?`: "box" | "plain" (default box) — How the arrow beside the title looks: a boxed button (default) or a bare arrow.
- `switchOptions?`: { value: string; label: string; description?: string | unde… — Inboxes to switch between.
- `switchValue?`: string — The value of the inbox that is open now.
- `onSwitch?`: function

```tsx
<SubNav title="Shared Inboxes" items={[{ id: 'email', label: 'Email Inboxes', icon: 'mailbox' }]} value={id} onChange={setId} />
```
