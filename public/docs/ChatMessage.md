# ChatMessage
`import { ChatMessage } from './components/ChatMessage'` — One message in a Chat conversation (Figma "user-message" and "agent-message").
- `channel?`: "sms" | "whatsapp" | "chat" (default chat) — The channel.
- `from`: "user" | "agent" — Who sent it.
- `text`: ReactNode — The message.
- `time`: string — When it was sent, for example Jul 23, 10:01 AM.
- `agentName?`: string — Agent messages only: the name shown before the time, for example Michael Scott - Jul…
- `status?`: "sent" | "delivered" | "read" — Agent messages only, WhatsApp only: how far the message has got.
