# Dropdown
`import { Dropdown } from './components/Dropdown'` — The menu panel only.
- `variant?`: "checkbox" | "radio" | "icon" | "default" | "avatar" (default default) — What each row looks like.
- `options`: DropdownOption[]
- `title?`: string — Heading at the top of the panel.
- `value?`: string | string[] — Selected value (a list of values for checkbox).
- `defaultValue?`: string | string[]
- `onChange?`: function
- `searchable?`: boolean — Shows a search box above the options.
- `searchPlaceholder?`: string (default Search)
- `reorderable?`: boolean — Lets the person drag the rows into a new order.
- `onReorder?`: function
- `actions?`: { cancelLabel?: string | undefined; applyLabel?: string | u… — Shows Cancel and Apply buttons below the options.

```tsx
<Dropdown variant="avatar" searchable searchPlaceholder="Search" options={[{ value: 'a', label: 'Abhay', color: 'yellow' }]} value={v} onChange={setV} />
```
