import { useEffect, useState } from 'react'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { Button } from '../../components/Button'
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
  /** Makes the icon before the title a button, for example to hide the Conversations sidebar. Called when it is pressed. */
  onIconClick?: () => void
  /** The accessible name of the icon button. */
  iconLabel?: string
  /** Called with the id of the conversation that was pressed. */
  onSelect?: (id: string) => void
  className?: string
}

export function ConversationList({ title, icon = 'collapseview', subtitle = 'All Conversations', channel, conversations, selectedId, onSelect, onIconClick, iconLabel = 'Toggle the sidebar', className }: ConversationListProps) {
  // A conversation that is unread becomes read once it has been opened.
  const [opened, setOpened] = useState<Set<string>>(() => new Set())
  useEffect(() => { if (selectedId) setOpened((prev) => (prev.has(selectedId) ? prev : new Set(prev).add(selectedId))) }, [selectedId])
  return (
    <section className={['hot-conv-list', className].filter(Boolean).join(' ')} aria-label={title}>
      <header className="hot-conv-list__header">
        {onIconClick ? (
          <Button iconOnly variant="ghost" size="xs" className="hot-conv-list__toggle" aria-label={iconLabel} onClick={onIconClick}>
            <Icon name={icon} size={16} />
          </Button>
        ) : (
          <span className="hot-conv-list__icon"><Icon name={icon} size={16} /></span>
        )}
        <h2 className="hot-conv-list__title">{title}</h2>
      </header>
      <div className="hot-conv-list__sub">{subtitle}</div>
      <div className="hot-conv-list__cards">
        {conversations.map(({ id, ...card }) => (
          <ConversationCard key={id} channel={channel} {...card} selected={id === selectedId} unread={card.unread && !opened.has(id) && id !== selectedId} onClick={() => onSelect?.(id)} />
        ))}
      </div>
    </section>
  )
}
