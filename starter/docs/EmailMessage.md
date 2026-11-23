# EmailMessage
`import { EmailMessage } from './components/EmailMessage'` — One message in an email conversation: a card, open or closed.
- `onToggle?`: () => void
- `sender`: string — The sender's email address.
- `avatarColor?`: "lightBlue" | "red" | "orange" | "yellow" | "green" | "purple" | "violet" | "grey" — The sender's avatar colour.
- `time`: string — When it was sent, for example Feb 4, 02:45 PM.
- `body`: string — The message text.
- `to?`: string (default support@acme.com) — Who it was sent to, shown under the address when the message is open.
- `expanded?`: boolean — Open shows the whole message and its Reply and Forward buttons.
- `onReply?`: function
- `onForward?`: function
