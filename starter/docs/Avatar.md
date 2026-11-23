# Avatar
`import { Avatar } from './components/Avatar'`
- `title?`: string — Accessible name, for example the person's full name.
- `color?`: "lightBlue" | "red" | "orange" | "yellow" | "green" | "purple" | "violet" | "grey" — Background colour of the circle.
- `initial`: string — The letter shown in the circle.
- `size?`: "default" | "large" | "small" (default default) — Default is 24px, small is 18px and large is 32px.
- `showStatus?`: boolean (default false) — Shows the status dot at the bottom right.
- `status?`: "online" | "offline" (default online) — With showStatus: a green dot when online (default), a grey dot when offline.

```tsx
<Avatar initial="P" size="small" color="red" status="online" />
```
