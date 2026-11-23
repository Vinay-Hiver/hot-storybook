# EmptyState
`import { EmptyState } from './patterns/EmptyState'`
- `icon`: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor… — An icon name from the empty-state icon set (for example signature or search), or you…
- `title`: string — The heading, for example "No signatures yet".
- `description`: string — One or two lines under the heading that say what to do next.
- `action?`: ReactNode — The main action, when there is one, for example a primary Button.

```tsx
<EmptyState icon="search" title="No inboxes yet" description="Create one to get started." action={<Button size="sm">Create</Button>} />
```
