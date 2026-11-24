# ConversationList
`import { ConversationList } from './patterns/ConversationList'`
- `title`: string — The name of the view the list belongs to, for example "Unassigned".
- `icon?`: "search" | "send" | "document" | "link" | "note" | "status" | "switch" | "timer" | "text" | "account" | "add"… (default collapseview) — The icon before the title.
- `subtitle?`: string (default All Conversations) — The label next to the select-all checkbox, under the title.
- `channel`: "email" | "slack" | "sms" | "voice" | "whatsapp" | "chat" — The channel of the inbox.
- `conversations`: ConversationListItem[] — The conversations, newest first.
- `selectedId?`: string — The id of the selected conversation.
- `onIconClick?`: function
- `iconLabel?`: string (default Toggle the sidebar) — The accessible name of the icon button.
- `onSelect?`: function
- `checkedIds?`: string[] — The ids of the conversations that are ticked.
- `onCheckedIdsChange?`: function
- `statusTabs?`: boolean — Shows the status tabs under the title: Unresolved (open and pending, with a count an…
- `onShownIdsChange?`: function
