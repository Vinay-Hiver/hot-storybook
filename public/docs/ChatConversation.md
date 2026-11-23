# ChatConversation
`import { ChatConversation } from './patterns/ChatConversation'` — The Chat, SMS and WhatsApp conversation: a top bar with the customer, the thread of…
- `channel?`: "sms" | "whatsapp" | "chat" (default chat) — The channel.
- `name`: string — The customer's name, shown in the top bar.
- `avatarColor?`: "lightBlue" | "red" | "orange" | "yellow" | "green" | "purple" | "violet" | "grey" (default violet) — The colour of the customer's avatar.
- `items`: ChatThreadItem[] — The thread, oldest first.
- `onSend?`: function
