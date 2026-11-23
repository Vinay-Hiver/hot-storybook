# Checkbox
`import { Checkbox } from './components/Checkbox'`
- `label?`: ReactNode — Text next to the box.
- `indeterminate?`: boolean — Shows the dash instead of the check.
- `invalid?`: boolean — Shows the red error border.

```tsx
<Checkbox label="Remember me" checked={on} onChange={(e) => setOn(e.target.checked)} />
```
