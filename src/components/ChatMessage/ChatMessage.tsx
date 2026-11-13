import type { HTMLAttributes, ReactNode } from 'react'
import { Icon } from '../../icons/Icon'
import './ChatMessage.css'

export type ChatMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The channel. On `whatsapp` and `sms` an agent message is a white card with a border instead of a blue bubble. Default is `chat`. */
  channel?: 'chat' | 'whatsapp' | 'sms'
  /** Who sent it. `user` is the customer: a pale blue bubble on the left. `agent` is someone on the team: a blue bubble on the right. */
  from: 'user' | 'agent'
  /** The message. */
  text: ReactNode
  /** When it was sent, for example `Jul 23, 10:01 AM`. Shown under the bubble. */
  time: string
  /** Agent messages only: the name shown before the time, for example `Michael Scott - Jul 23, 10:02 AM`. */
  agentName?: string
  /** Agent messages only, WhatsApp only: how far the message has got. Shows ticks after the time: `sent` is one grey tick, `delivered` two grey ticks, `read` two blue ticks. Leave out for no ticks (Chat). */
  status?: 'sent' | 'delivered' | 'read'
}

/** One message in a Chat conversation (Figma "user-message" and "agent-message"). */
export function ChatMessage({ channel = 'chat', from, text, time, agentName, status, className, ...rest }: ChatMessageProps) {
  return (
    <div className={['hot-chat-message', `hot-chat-message--${from}`, channel !== 'chat' && 'hot-chat-message--card', className].filter(Boolean).join(' ')} {...rest}>
      <div className="hot-chat-message__bubble">{text}</div>
      <div className="hot-chat-message__meta">
        <span>{from === 'agent' && agentName ? `${agentName} - ${time}` : time}</span>
        {from === 'agent' && channel === 'whatsapp' && status && (
          <span className={`hot-chat-message__tick hot-chat-message__tick--${status}`} role="img" aria-label={status}>
            <Icon name={status === 'sent' ? 'tick' : 'doubletick'} size={14} />
          </span>
        )}
      </div>
    </div>
  )
}
