import { useEffect, useRef } from 'react'
import type { HTMLAttributes } from 'react'
import type { AvatarColor } from '../../components/Avatar'
import { ReplyBox } from '../../components/ReplyBox'
import { SlackMessage } from '../../components/SlackMessage'
import { Tag } from '../../components/Tag'
import { slackAgentName } from './slackThread'
import type { SlackThreadItem } from './slackThread'
import './SlackConversation.css'

export type SlackConversationProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The customer's name, shown in the top bar and on their messages. */
  name: string
  /** The Slack channel the conversation is in, without the `#`, for example `support`. Shown as a chip in the top bar. */
  channelName: string
  /** The colour of the customer's avatar. */
  avatarColor?: AvatarColor
  /** The thread, oldest first. */
  items: SlackThreadItem[]
  /** Called with the text when the agent sends a reply. */
  onSend?: (text: string) => void
  /** Called with a message id and the emoji picked for it. */
  onAddReaction?: (id: string, emoji: string) => void
  /** Called with a message id and the emoji of the reaction that was pressed (removes it). */
  onRemoveReaction?: (id: string, emoji: string) => void
  /** Called with the id of an agent message that was deleted. */
  onDelete?: (id: string) => void
}

/** The Slack conversation: a top bar with the customer and the Slack channel, the thread of full-width messages, and the reply box (Figma frame 3017:24702). */
export function SlackConversation({ name, channelName, avatarColor = 'violet', items, onSend, onAddReaction, onRemoveReaction, onDelete, className, ...rest }: SlackConversationProps) {
  const thread = useRef<HTMLDivElement>(null)
  // Keep the newest message in view.
  useEffect(() => {
    const el = thread.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items.length])

  return (
    <section className={['hot-slack-conv', className].filter(Boolean).join(' ')} aria-label={`Slack conversation with ${name}`} {...rest}>
      <header className="hot-slack-conv__top">
        <h2 className="hot-slack-conv__name">{name}</h2>
        <Tag>#{channelName}</Tag>
      </header>
      <div className="hot-slack-conv__thread" ref={thread}>
        {items.map((m) => (
          <SlackMessage
            key={m.id}
            name={m.from === 'agent' ? slackAgentName : name}
            avatarColor={m.from === 'agent' ? 'red' : avatarColor}
            time={m.time}
            text={m.text}
            reactions={m.reactions}
            canDelete={m.from === 'agent'}
            onAddReaction={(emoji) => onAddReaction?.(m.id, emoji)}
            onRemoveReaction={(emoji) => onRemoveReaction?.(m.id, emoji)}
            onDelete={() => onDelete?.(m.id)}
          />
        ))}
      </div>
      <div className="hot-slack-conv__composer">
        <ReplyBox onSend={onSend} placeholder="Shift + Enter for new line. Type ‘/’ to search for Slack templates and send quick replies" />
      </div>
    </section>
  )
}
