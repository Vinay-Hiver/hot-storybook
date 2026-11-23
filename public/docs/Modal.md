# Modal
`import { Modal } from './components/Modal'`
- `title`: string — The heading.
- `layout?`: "standard" | "centered" (default standard) — Standard has a header bar, the content and the actions on the right.
- `width?`: 400 | 500 (default 400) — Width in px.
- `icon?`: ReactNode — Standard: a small icon name before the title, such as delete for a destructive modal.
- `onClose?`: function
- `actions?`: ReactNode — The buttons, for example Cancel and a primary Button.

```tsx
<Modal title="Delete inbox?" onClose={close} actions={<><Button variant="secondary">Cancel</Button><Button variant="error">Delete</Button></>}>This cannot be undone.</Modal>
```
