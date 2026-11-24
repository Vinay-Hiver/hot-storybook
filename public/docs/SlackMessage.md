# SlackMessage
`import { SlackMessage } from './components/SlackMessage'` — One message in a Slack conversation: a full-width row, not a bubble.
- `name`: string — Who wrote it, for example Kavya Reddy or Aarav Mehta (You).
- `time`: string — When it was sent, for example Nov 10, 04:11 PM.
- `text`: string — The message.
- `avatarColor?`: "lightBlue" | "red" | "orange" | "yellow" | "green" | "purple" | "violet" | "grey" — The colour of the sender's avatar.
- `reactions?`: Record<string, number> (default {}) — The reactions on the message: each emoji and how many people used it.
- `canDelete?`: boolean — Shows the delete button in the hover toolbar.
- `onAddReaction?`: function
- `onRemoveReaction?`: function
- `onDelete?`: function
