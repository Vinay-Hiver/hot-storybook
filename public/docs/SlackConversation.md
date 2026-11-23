# SlackConversation
`import { SlackConversation } from './patterns/SlackConversation'` — The Slack conversation: a top bar with the customer and the Slack channel, the threa…
- `name`: string — The customer's name, shown in the top bar and on their messages.
- `channelName`: string — The Slack channel the conversation is in, without the #, for example support.
- `avatarColor?`: "lightBlue" | "red" | "orange" | "yellow" | "green" | "purple" | "violet" | "grey" (default violet) — The colour of the customer's avatar.
- `items`: SlackThreadItem[] — The thread, oldest first.
- `onSend?`: function
- `onAddReaction?`: function
- `onRemoveReaction?`: function
- `onDelete?`: function
