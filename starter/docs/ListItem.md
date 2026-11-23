# ListItem
`import { ListItem } from './components/List'`
- `label`: ReactNode — The row text.
- `description?`: ReactNode — Smaller grey text under the label (Figma "Lists_Description").
- `leading?`: ReactNode — Left element: ListAvatar, ListIcon, ListRadio or ListCheck.
- `rightElement?`: boolean — Shows the right element: a blue check on a label row, or a blue chevron on a row wit…
- `trailing?`: "chevron" | "check" — Which mark the right element draws: a chevron (default on a row with a description)…
- `compact?`: boolean — The tighter size used inside dropdown menus (32px, or 28px for text only).

```tsx
<ListItem label="Billing" description="billing@acme.com" leading={<ListIcon name="mailbox" />} onClick={open} />
```
