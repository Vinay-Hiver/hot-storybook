# Textarea
`import { Textarea } from './components/Textarea'`
- `label?`: ReactNode — Label shown above the field.
- `helperText?`: ReactNode — Small text below the field.
- `error?`: boolean — Shows the error border and red helper text.
- `success?`: boolean — Turns the helper text green with a tick before it.
- `helperIcon?`: "search" | "send" | "document" | "link" | "note" | "status" | "switch" | "timer" | "text" | "account" | "add"… — A 16px icon before the helper text, by name from the HOT icon set (for example info).
- `showCount?`: boolean — Shows a live "0/500" counter.
- `fullWidth?`: boolean — Stretch to the width of the parent instead of 320px.
- `tags?`: string[] — Turns the field into a tags field.
- `defaultTags?`: string[] — Initial tags when the field manages them itself.
- `onTagsChange?`: function

```tsx
<Textarea label="Note" placeholder="Write a note" maxLength={200} showCount />
```
