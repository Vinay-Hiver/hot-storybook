# Popover
`import { Popover } from './components/Popover'` — Places any panel under a trigger.
- `open`: boolean — Whether the popover is showing.
- `onClose`: function
- `anchorRef`: RefObject<HTMLElement | null> — The element the popover opens under, usually the button that opened it.
- `placement?`: "bottom-start" | "bottom-end" | "right-start" (default bottom-start) — Which edge of the anchor the popover lines up with.
- `gap?`: number (default 4) — The space in px between the anchor and the popover.
- `matchAnchorWidth?`: boolean — Stretch to at least the width of the anchor.

```tsx
<Popover open={open} onClose={() => setOpen(false)} anchorRef={ref}><Dropdown options={options} /></Popover>   // ref points at the button that opens it
```
