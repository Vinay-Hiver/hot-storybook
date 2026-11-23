# SlaPill
`import { SlaPill } from './components/Sla'`
- `kind`: "frt" | "rt" — Which time the pill is about: first response time (frt) or resolution time (rt).
- `status`: "done" | "upcoming" | "due" | "overdue" — Where that time stands.

```tsx
<SlaPill kind="frt" status="due" />
```
