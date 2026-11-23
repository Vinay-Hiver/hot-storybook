# AssigneeField
`import { AssigneeField } from './patterns/RightPanel'` — The Assignee field: pressing the name opens a searchable list of people (with a "Non…
- `value?`: string — The value of the person who owns the conversation, or none.
- `onChange?`: function
- `people?`: Assignee[]
- `label?`: string (default Assignee) — The name of the field.
- `icon?`: "search" | "send" | "document" | "link" | "note" | "status" | "switch" | "timer" | "text" | "account" | "add"… (default assigned) — The icon before the name.
- `defaultValue?`: string — Which row starts selected when no value is given: a person's value, or none.

```tsx
<AssigneeField value={who} onChange={setWho} />   // inside <RightPanelTop>, next to <StatusField />
```
