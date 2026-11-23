# ConversationCard
`import { ConversationCard } from './components/ConversationCard'`
- `name`: string — Who the conversation is with: a name, an email or a phone number.
- `date`: string — The date or time of the latest message, for example Nov 12.
- `preview?`: string — The latest message or the email subject.
- `callDirection?`: "incoming" | "outgoing" (default incoming) — Voice only: the second line reads "Incoming voice call started" or "Outgoing voice c…
- `channel?`: "email" | "slack" | "sms" | "voice" | "whatsapp" | "chat" (default chat) — The channel the conversation came from.
- `replied?`: boolean — The latest message was sent from here, so a small reply arrow shows before it.
- `selected?`: boolean — The card of the conversation that is open: pale blue with a blue bar on the left.
- `unread?`: boolean — An unread conversation: light grey, a blue dot before the date, and a medium-weight…
- `sla?`: ConversationCardSla[] — SLA pills (first response time, resolution time) shown on the chips row.
- `tags?`: ConversationCardTag[] — Tags shown on the chips row after the SLA pills, for example a priority or a ticket…
- `moreCount?`: number — How many more tags there are than shown.
- `checked?`: boolean — Whether the checkbox that replaces the channel icon is checked.
- `onCheckedChange?`: function
