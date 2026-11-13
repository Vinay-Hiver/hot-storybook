import { useEffect, useRef } from 'react'
import type { HTMLAttributes } from 'react'
import { Avatar } from '../../components/Avatar'
import type { AvatarColor } from '../../components/Avatar'
import { ChatMessage } from '../../components/ChatMessage'
import { ReplyBox } from '../../components/ReplyBox'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import './ChatConversation.css'

/** One entry in the thread: a message, or a line about something that happened, such as "Jim Halpert assigned this conversation to you". */
export type ChatThreadItem =
  | { id: string; kind: 'message'; from: 'user' | 'agent'; text: string; time: string; agentName?: string; status?: 'sent' | 'delivered' | 'read' }
  | { id: string; kind: 'activity'; text: string; icon?: IconName }

export type ChatConversationProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The channel. `whatsapp` adds ticks to agent messages (a message's `status`) and a WhatsApp templates button to the reply box. */
  channel?: 'chat' | 'whatsapp'
  /** The customer's name, shown in the top bar. */
  name: string
  /** The colour of the customer's avatar. */
  avatarColor?: AvatarColor
  /** The thread, oldest first. */
  items: ChatThreadItem[]
  /** Called with the text when the agent sends a reply. */
  onSend?: (text: string) => void
}

/** The Chat and WhatsApp conversation: a top bar with the customer, the thread of messages, and the reply box (Figma "overall-view" 3278:5166). */
export function ChatConversation({ channel = 'chat', name, avatarColor = 'violet', items, onSend, className, ...rest }: ChatConversationProps) {
  const thread = useRef<HTMLDivElement>(null)
  // Keep the newest message in view.
  useEffect(() => {
    const el = thread.current
    if (el) el.scrollTop = el.scrollHeight
  }, [items.length])

  return (
    <section className={['hot-chat-conv', className].filter(Boolean).join(' ')} aria-label={`Conversation with ${name}`} {...rest}>
      <header className="hot-chat-conv__top">
        <Avatar initial={name} color={avatarColor} />
        <h2 className="hot-chat-conv__name">{name}</h2>
      </header>
      <div className="hot-chat-conv__thread" ref={thread}>
        {items.map((item) =>
          item.kind === 'message' ? (
            <ChatMessage key={item.id} channel={channel} from={item.from} text={item.text} time={item.time} agentName={item.agentName} status={channel === 'whatsapp' ? item.status : undefined} className="hot-chat-conv__message" />
          ) : (
            <div key={item.id} className="hot-chat-conv__activity">
              <Icon name={item.icon ?? 'assigned'} size={14} />
              <span>{item.text}</span>
            </div>
          ),
        )}
      </div>
      <div className="hot-chat-conv__composer">
        <ReplyBox
          onSend={onSend}
          showTemplates={channel === 'whatsapp'}
          placeholder={channel === 'whatsapp' ? 'Shift + Enter for new line. Type ‘/’ to search for WhatsApp templates and send quick replies' : undefined}
        />
      </div>
    </section>
  )
}
