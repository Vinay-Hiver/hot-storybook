import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { ConversationCard } from '../../components/ConversationCard'
import type { ConversationChannel } from '../../components/ConversationCard'
import type { ConversationListItem } from './sampleData'
import './ConversationList.css'

export type ConversationListProps = {
  /** The name of the view the list belongs to, for example "Unassigned". */
  title: string
  /** The icon before the title. */
  icon?: IconName
  /** The small heading under the title. */
  subtitle?: string
  /** The channel of the inbox. Sets each card's channel icon. */
  channel: ConversationChannel
  /** The conversations, newest first. */
  conversations: ConversationListItem[]
  /** The id of the selected conversation. */
  selectedId?: string
  /** Called with the id of the conversation that was pressed. */
  onSelect?: (id: string) => void
  className?: string
}

export function ConversationList({ title, icon = 'collapseview', subtitle = 'All Conversations', channel, conversations, selectedId, onSelect, className }: ConversationListProps) {
  return (
    <section className={['hot-conv-list', className].filter(Boolean).join(' ')} aria-label={title}>
      <header className="hot-conv-list__header">
        <span className="hot-conv-list__icon"><Icon name={icon} size={16} /></span>
        <h2 className="hot-conv-list__title">{title}</h2>
      </header>
      <div className="hot-conv-list__sub">{subtitle}</div>
      <div className="hot-conv-list__cards">
        {conversations.map(({ id, ...card }) => (
          <ConversationCard key={id} channel={channel} {...card} selected={id === selectedId} onClick={() => onSelect?.(id)} />
        ))}
      </div>
    </section>
  )
}
