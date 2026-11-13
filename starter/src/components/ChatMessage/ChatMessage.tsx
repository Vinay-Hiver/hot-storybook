import type { HTMLAttributes, ReactNode } from 'react'
import './ChatMessage.css'

export type ChatMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Who sent it. `user` is the customer: a pale blue bubble on the left. `agent` is someone on the team: a blue bubble on the right. */
  from: 'user' | 'agent'
  /** The message. */
  text: ReactNode
  /** When it was sent, for example `Jul 23, 10:01 AM`. Shown under the bubble. */
  time: string
  /** Agent messages only: the name shown before the time, for example `Michael Scott - Jul 23, 10:02 AM`. */
  agentName?: string
}

/** One message in a Chat conversation (Figma "user-message" and "agent-message"). */
export function ChatMessage({ from, text, time, agentName, className, ...rest }: ChatMessageProps) {
  return (
    <div className={['hot-chat-message', `hot-chat-message--${from}`, className].filter(Boolean).join(' ')} {...rest}>
      <div className="hot-chat-message__bubble">{text}</div>
      <p className="hot-chat-message__meta">{from === 'agent' && agentName ? `${agentName} - ${time}` : time}</p>
    </div>
  )
}
