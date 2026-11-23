import type { HTMLAttributes } from 'react'
import { Avatar } from '../Avatar'
import type { AvatarColor } from '../Avatar'
import { Button } from '../Button'
import { Icon } from '../../icons/Icon'
import './EmailMessage.css'

export type EmailMessageProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The sender's email address. */
  sender: string
  /** The sender's avatar colour. The letter comes from the address. */
  avatarColor?: AvatarColor
  /** When it was sent, for example `Feb 4, 02:45 PM`. */
  time: string
  /** The message text. Line breaks are kept. */
  body: string
  /** Who it was sent to, shown under the address when the message is open. */
  to?: string
  /** Open shows the whole message and its Reply and Forward buttons. Closed is one line with the start of the text. */
  expanded?: boolean
  /** Called when the header (open) or the card (closed) is pressed. */
  onToggle?: () => void
  /** Called when Reply, or the reply-all button in the header, is pressed. */
  onReply?: () => void
  /** Called when Forward is pressed. */
  onForward?: () => void
}

/** One message in an email conversation: a card, open or closed. */
export function EmailMessage({ sender, avatarColor, time, body, to = 'support@acme.com', expanded, onToggle, onReply, onForward, className, ...rest }: EmailMessageProps) {
  if (!expanded) {
    return (
      <div className={['hot-email-msg', 'hot-email-msg--closed', className].filter(Boolean).join(' ')} role="button" tabIndex={0} onClick={onToggle} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle?.() } }} {...rest}>
        <Avatar initial={sender} color={avatarColor} size="large" />
        <div className="hot-email-msg__info">
          <h3 className="hot-email-msg__address">{sender}</h3>
          <p className="hot-email-msg__preview">{body.replace(/\s+/g, ' ').slice(0, 80)}...</p>
        </div>
        <span className="hot-email-msg__time">{time}</span>
      </div>
    )
  }
  return (
    <div className={['hot-email-msg', className].filter(Boolean).join(' ')} {...rest}>
      <div className="hot-email-msg__head">
        <Avatar initial={sender} color={avatarColor} size="large" />
        <button type="button" className="hot-email-msg__info hot-email-msg__info--button" onClick={onToggle} aria-expanded="true">
          <span className="hot-email-msg__address">{sender}</span>
          <span className="hot-email-msg__to">To: {to}<Icon name="chevrondown" size={14} /></span>
        </button>
        <div className="hot-email-msg__head-actions">
          <span className="hot-email-msg__time">{time}</span>
          <Button iconOnly variant="ghost" size="xs" aria-label="Reply all" onClick={onReply}><Icon name="replyall" size={16} /></Button>
          <Button iconOnly variant="ghost" size="xs" aria-label="More options"><Icon name="vmore" size={16} /></Button>
        </div>
      </div>
      <div className="hot-email-msg__body">{body}</div>
      <button type="button" className="hot-email-msg__more" aria-label="Show trimmed content">...</button>
      <div className="hot-email-msg__actions">
        <Button variant="secondary" size="sm" iconLeft={<Icon name="reply" size={16} />} onClick={onReply}>Reply</Button>
        <Button variant="secondary" size="sm" iconLeft={<Icon name="forward" size={16} />} onClick={onForward}>Forward</Button>
      </div>
    </div>
  )
}
