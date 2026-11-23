# Tooltip
`import { Tooltip } from './components/Tooltip'`
- `content`: ReactNode — The text shown in the bubble.
- `placement?`: "top" | "bottom" | "left" | "right" (default top) — Which side of the element the bubble appears on.
- `open?`: boolean — Force it open or closed.
- `portal?`: boolean — Draws the bubble on the page itself instead of inside the element's container, so a…
- `boundary?`: string — With portal: a CSS selector for a parent, for example .hot-main-nav.
- `gap?`: number (default 6) — With portal: the space in px between the bubble and the edge it sits next to.

```tsx
<Tooltip content="Delete"><Button iconOnly variant="ghost" aria-label="Delete"><Icon name="delete" /></Button></Tooltip>
```
