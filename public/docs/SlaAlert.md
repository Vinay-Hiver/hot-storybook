# SlaAlert
`import { SlaAlert } from './components/Sla'`
- `onClick?`: () => void
- `kind`: "frt" | "rt" — Which time the alert is about: first response time (frt) or resolution time (rt).
- `status`: "done" | "upcoming" | "due" | "overdue" — Where that time stands.
- `time`: string — The time shown in the text, for example "6:00 PM tomorrow".
