import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Avatar } from '../Avatar'
import type { AvatarColor } from '../Avatar'
import { Icon } from '../../icons/Icon'
import slackLogo from '../../assets/slack-logo.svg'
import './SlackMessage.css'

/** The emoji a reaction can be picked from. */
const emojis = ['👍', '❤️', '😀', '🎉', '✅', '🙏', '🔥', '👀', '😂', '💯']

export type SlackMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** Who wrote it, for example `Helly R` or `Mark Scout (You)`. */
  name: string
  /** When it was sent, for example `Nov 10, 04:11 PM`. Shown after the name. */
  time: string
  /** The message. Line breaks are kept. */
  text: string
  /** The colour of the sender's avatar. */
  avatarColor?: AvatarColor
  /** The reactions on the message: each emoji and how many people used it. */
  reactions?: Record<string, number>
  /** Shows the delete button in the hover toolbar. For the agent's own messages. */
  canDelete?: boolean
  /** Called with the emoji picked from the add-emoji button. */
  onAddReaction?: (emoji: string) => void
  /** Called with the emoji of a reaction that was pressed. Pressing a reaction removes it. */
  onRemoveReaction?: (emoji: string) => void
  /** Called when the delete button is pressed. */
  onDelete?: () => void
}

/** One message in a Slack conversation: a full-width row, not a bubble. Pointing at it shows a toolbar (add a reaction, delete, open in Slack). */
export function SlackMessage({ name, time, text, avatarColor, reactions = {}, canDelete, onAddReaction, onRemoveReaction, onDelete, className, ...rest }: SlackMessageProps) {
  const [picker, setPicker] = useState(false)
  const toolbar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!picker) return undefined
    const close = (e: MouseEvent) => { if (toolbar.current && !toolbar.current.contains(e.target as Node)) setPicker(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [picker])
  const list = Object.entries(reactions)

  return (
    <div className={['hot-slack-msg', picker && 'hot-slack-msg--picking', className].filter(Boolean).join(' ')} {...rest}>
      <Avatar initial={name} color={avatarColor} size="large" title={name} />
      <div className="hot-slack-msg__body">
        <div className="hot-slack-msg__head">
          <span className="hot-slack-msg__name">{name}</span>
          <span className="hot-slack-msg__time">{time}</span>
        </div>
        <div className="hot-slack-msg__text">{text}</div>
        {list.length > 0 && (
          <div className="hot-slack-msg__reactions">
            {list.map(([emoji, count]) => (
              <button key={emoji} type="button" className="hot-slack-msg__reaction" title="Remove reaction" onClick={() => onRemoveReaction?.(emoji)}>
                <span className="hot-slack-msg__emoji">{emoji}</span>
                <span>{count}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="hot-slack-msg__toolbar" ref={toolbar}>
        <button type="button" className="hot-slack-msg__tool" aria-label="Add a reaction" title="Add a reaction" onClick={() => setPicker((o) => !o)}>
          <Icon name="emoji" size={14} />
        </button>
        {canDelete && (
          <button type="button" className="hot-slack-msg__tool" aria-label="Delete message" title="Delete message" onClick={onDelete}>
            <Icon name="delete" size={14} />
          </button>
        )}
        <button type="button" className="hot-slack-msg__tool" aria-label="Open in Slack" title="Open in Slack">
          <img src={slackLogo} width={14} height={14} alt="" />
        </button>
        {picker && (
          <div className="hot-slack-msg__picker">
            {emojis.map((emoji) => (
              <button key={emoji} type="button" className="hot-slack-msg__pick" onClick={() => { onAddReaction?.(emoji); setPicker(false) }}>{emoji}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
