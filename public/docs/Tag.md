# Tag
`import { Tag } from './components/Tag'`
- `color?`: "default" | "yellow" | "lightBlue" | "green" | "purple" | "orange" | "red" | "violet" — The colour.
- `iconLeft?`: ReactNode — 14px icon before the text, such as <Icon name="tag" size={14} />.
- `iconRight?`: ReactNode — 14px icon after the text.
- `onRemove?`: function
- `removeLabel?`: string (default Remove) — Accessible name for the close button.

```tsx
<Tag color="violet" onRemove={remove}>Finance</Tag>
```
