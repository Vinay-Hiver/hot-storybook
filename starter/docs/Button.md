# Button
`import { Button } from './components/Button'`
- `variant?`: "error" | "primary" | "secondary" | "secondary-filled" | "ghost" | "neutral" — Visual style.
- `size?`: "sm" | "md" | "xs" — xs = 28px, sm = 32px, md = 40px tall.
- `iconOnly?`: boolean
- `iconLeft?`: ReactNode — 16px icon shown before the label.
- `iconRight?`: ReactNode — 16px icon shown after the label.

```tsx
<Button variant="primary" size="sm" iconLeft={<Icon name="add" size={16} />}>Create</Button>
```
