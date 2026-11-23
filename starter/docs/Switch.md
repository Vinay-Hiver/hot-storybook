# Switch
`import { Switch } from './components/Switch'`
- `size?`: "regular" | "large" (default regular) — Regular is 32x16, large is 40x20.
- `label?`: ReactNode — Optional text next to the switch.

```tsx
<Switch checked={on} onChange={(e) => setOn(e.target.checked)} label="Enabled" />
```
