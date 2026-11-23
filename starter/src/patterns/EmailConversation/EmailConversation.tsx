import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Button } from '../../components/Button'
import { EmailEditor } from '../../components/EmailEditor'
import { EmailMessage } from '../../components/EmailMessage'
import { Icon } from '../../icons/Icon'
import type { EmailThreadMessage } from './emailThread'
import './EmailConversation.css'

export type EmailConversationProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The subject of the email conversation. */
  subject: string
  /** The messages, in the order they are shown. The first one starts open. */
  messages: EmailThreadMessage[]
  /** The address the conversation was sent to, shown as "To: …" under the sender. */
  inboxEmail?: string
  /** Called with the text when the agent sends a reply. */
  onSend?: (text: string) => void
}

/** The Email conversation: a top bar, the subject, and the thread of messages, each open or closed. Reply opens an editor above the message (the "linked-conversations" prototype). */
export function EmailConversation({ subject, messages, inboxEmail = 'support@acme.com', onSend, className, ...rest }: EmailConversationProps) {
  const [expanded, setExpanded] = useState<string[]>(() => (messages[0] ? [messages[0].id] : []))
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const count = useRef(messages.length)
  // A new message (one the agent sent, or the customer's answer) opens, and the thread scrolls to it.
  useEffect(() => {
    if (messages.length > count.current) {
      const last = messages[messages.length - 1]
      setExpanded((prev) => [...prev, last.id])
      requestAnimationFrame(() => { const el = scroller.current; if (el) el.scrollTop = el.scrollHeight })
    }
    count.current = messages.length
  }, [messages])

  const toggle = (id: string) => setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  const reply = (id: string) => setReplyingTo((prev) => (prev === id ? null : id))
  const firstOpen = expanded[0] ?? messages[0]?.id
  const recipientFor = (id: string) => messages.find((m) => m.id === id)?.email

  return (
    <section className={['hot-email-conv', className].filter(Boolean).join(' ')} aria-label={`Email conversation: ${subject}`} {...rest}>
      <header className="hot-email-conv__top">
        <Button iconOnly variant="ghost" size="xs" aria-label="Mark as unread"><Icon name="markasunread" size={16} /></Button>
        <Button iconOnly variant="ghost" size="xs" aria-label="Move to mailbox"><Icon name="mailbox" size={16} /></Button>
        <Button iconOnly variant="ghost" size="xs" aria-label="Print"><Icon name="print" size={16} /></Button>
        <Button iconOnly variant="ghost" size="xs" aria-label="AI"><Icon name="ai" size={16} /></Button>
      </header>
      <div className="hot-email-conv__scroll" ref={scroller}>
        <div className="hot-email-conv__subject">
          <h1 className="hot-email-conv__subject-text">{subject}</h1>
          <div className="hot-email-conv__subject-actions">
            <Button iconOnly variant="ghost" size="xs" aria-label="Reply" onClick={() => reply(firstOpen)}><Icon name="reply" size={16} /></Button>
            <Button iconOnly variant="ghost" size="xs" aria-label="Reply all" onClick={() => reply(firstOpen)}><Icon name="replyall" size={16} /></Button>
            <Button iconOnly variant="ghost" size="xs" aria-label="Forward"><Icon name="forward" size={16} /></Button>
          </div>
        </div>
        <div className="hot-email-conv__messages">
          {messages.map((m) => (
            <div key={m.id} className="hot-email-conv__item">
              {replyingTo === m.id && (
                <EmailEditor
                  recipient={recipientFor(m.id)}
                  onDiscard={() => setReplyingTo(null)}
                  onSend={(text) => { onSend?.(text); setReplyingTo(null) }}
                />
              )}
              <EmailMessage
                sender={m.email}
                avatarColor={m.avatarColor}
                time={m.time}
                body={m.body}
                to={inboxEmail}
                expanded={expanded.includes(m.id)}
                onToggle={() => toggle(m.id)}
                onReply={() => reply(m.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
