# PageLayout
`import { PageLayout } from './patterns/PageLayout'`
- `variant?`: "home" | "admin" (default home) — Which page anatomy to use.
- `nav`: ReactNode — The Main nav.
- `sidebar`: ReactNode — The Conversations sidebar or the Admin sidebar.
- `sidebarCollapsed?`: boolean — Hides the sidebar so the content moves up next to the Main nav.
- `subNav?`: ReactNode — A second 240px column next to the sidebar, used by the admin variant.
- `rightPanel?`: ReactNode — The right panel.

```tsx
<PageLayout variant="home" nav={<MainNav ... />} sidebar={<ConversationsSidebar ... />} rightPanel={<RightPanel ... />}>{content}</PageLayout>
```
