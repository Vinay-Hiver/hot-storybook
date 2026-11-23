# RightPanel
`import { RightPanel } from './patterns/RightPanel'` — The panel on the right of a page.
- `tabs?`: RightPanelTab[] — The tab bar at the very top.
- `activeTab?`: string — The selected tab's id, when you control it yourself.
- `onTabChange?`: function
- `onReorder?`: function
- `customizeWidgets?`: boolean — Shows the "Customize widgets" button after the last section.
- `visibleIds?`: string[] — The ids of the sections that are shown, when you control it yourself.
- `onVisibleChange?`: function
