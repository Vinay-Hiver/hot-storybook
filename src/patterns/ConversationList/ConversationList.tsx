import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { Dropdown } from '../../components/Dropdown'
import { Popover } from '../../components/Popover'
import { Tabs } from '../../components/Tabs'
import { ConversationCard } from '../../components/ConversationCard'
import type { ConversationChannel } from '../../components/ConversationCard'
import type { ConversationListItem } from './sampleData'
import './ConversationList.css'

export type ConversationListProps = {
  /** The name of the view the list belongs to, for example "Unassigned". */
  title: string
  /** The icon before the title. */
  icon?: IconName
  /** The label next to the select-all checkbox, under the title. Shows while the list shows every conversation. */
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
  /** The ids of the conversations that are ticked. Leave out to let the list keep track of them. */
  checkedIds?: string[]
  /** Called with the ticked ids whenever a box changes, and with an empty list when the view changes. */
  onCheckedIdsChange?: (ids: string[]) => void
  /** Shows the status tabs under the title: Unresolved (open and pending, with a count and an arrow to choose which), Closed and All. Used when the list is filtered by a tag. */
  statusTabs?: boolean
  /** Called with the ids of the conversations the list shows (after the tab and the unread filter), whenever they change. A page can use it to show its own empty state when there are none. */
  onShownIdsChange?: (ids: string[]) => void
  className?: string
}

export function ConversationList({ title, icon = 'collapseview', subtitle = 'All Conversations', channel, conversations, selectedId, onSelect, onIconClick, iconLabel = 'Toggle the sidebar', checkedIds, onCheckedIdsChange, statusTabs, onShownIdsChange, className }: ConversationListProps) {
  // A conversation that is unread becomes read once it has been opened.
  const [opened, setOpened] = useState<Set<string>>(() => new Set())
  // The box under the title selects every conversation shown; the label opens a menu to show all or only the unread ones.
  const [ownChecked, setOwnChecked] = useState<Set<string>>(() => new Set())
  const checked = checkedIds ? new Set(checkedIds) : ownChecked
  const setChecked = (next: Set<string> | ((prev: Set<string>) => Set<string>)) => {
    const value = typeof next === 'function' ? next(checked) : next
    setOwnChecked(value)
    onCheckedIdsChange?.([...value])
  }
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // The status tabs: which tab, and which statuses Unresolved covers.
  const [statusTab, setStatusTab] = useState('unresolved')
  const [unresolvedIs, setUnresolvedIs] = useState<string[]>(['open', 'pending'])
  const [statusMenuOpen, setStatusMenuOpen] = useState(false)
  const statusAnchor = useRef<HTMLElement | null>(null)
  const menuRef = useRef<HTMLButtonElement>(null)
  // A different view starts with nothing selected.
  useEffect(() => { setChecked(new Set()); setStatusTab('unresolved'); setUnresolvedIs(['open', 'pending']); setStatusMenuOpen(false) }, [title, channel]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (selectedId) setOpened((prev) => (prev.has(selectedId) ? prev : new Set(prev).add(selectedId))) }, [selectedId])
  const isUnread = (c: ConversationListItem) => !!c.unread && !opened.has(c.id) && c.id !== selectedId
  const statusOf = (c: ConversationListItem) => c.status ?? 'open'
  const inTab = (c: ConversationListItem) => !statusTabs || statusTab === 'all' || (statusTab === 'closed' ? statusOf(c) === 'closed' : unresolvedIs.includes(statusOf(c)))
  const unresolvedCount = conversations.filter((c) => unresolvedIs.includes(statusOf(c))).length
  const tabbed = conversations.filter(inTab)
  const shown = unreadOnly && !statusTabs ? tabbed.filter(isUnread) : tabbed
  const shownKey = shown.map((c) => c.id).join('\u0000')
  useEffect(() => { onShownIdsChange?.(shown.map((c) => c.id)) }, [shownKey]) // eslint-disable-line react-hooks/exhaustive-deps
  const allChecked = shown.length > 0 && shown.every((c) => checked.has(c.id))
  const someChecked = shown.some((c) => checked.has(c.id))
  const setCard = (id: string, on: boolean) => setChecked((prev) => { const next = new Set(prev); if (on) next.add(id); else next.delete(id); return next })
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
      {statusTabs && (
        <>
          <Tabs className="hot-conv-list__tabs" aria-label="Status" value={statusTab} onChange={setStatusTab}
            tabs={[
              { value: 'unresolved', label: 'Unresolved', count: String(unresolvedCount), menu: { label: 'Choose statuses', open: statusMenuOpen, onClick: (el) => { statusAnchor.current = el.closest<HTMLElement>('[role="tab"]') ?? el; setStatusMenuOpen((o) => !o) } } },
              { value: 'closed', label: 'Closed' },
              { value: 'all', label: 'All' },
            ]} />
          <Popover open={statusMenuOpen} onClose={() => setStatusMenuOpen(false)} anchorRef={statusAnchor} placement="bottom-start" gap={0}>
            <Dropdown variant="checkbox" className="hot-conv-list__status-menu" value={unresolvedIs} onChange={(v) => setUnresolvedIs(v as string[])}
              options={[{ value: 'open', label: 'Open' }, { value: 'pending', label: 'Pending' }]} />
          </Popover>
        </>
      )}
      <div className="hot-conv-list__sub">
        <Checkbox aria-label="Select all conversations" checked={allChecked} indeterminate={someChecked && !allChecked} onChange={(e) => setChecked(e.target.checked ? new Set(shown.map((c) => c.id)) : new Set())} />
        {/* In the tag view (status tabs) the tabs do the filtering, so the label is plain text with no menu. */}
        {statusTabs ? <span className="hot-conv-list__filter hot-conv-list__filter--plain">{subtitle}</span> : (
        <button ref={menuRef} type="button" className="hot-conv-list__filter" aria-haspopup="menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
          <span>{unreadOnly ? 'Unread Conversations' : subtitle}</span>
          <Icon name={menuOpen ? 'chevrontop' : 'chevrondown'} size={16} />
        </button>)}
        <Popover open={menuOpen && !statusTabs} onClose={() => setMenuOpen(false)} anchorRef={menuRef} placement="bottom-start">
          <Dropdown className="hot-conv-list__filter-menu" value={unreadOnly ? 'unread' : 'all'} options={[{ value: 'all', label: 'Show all' }, { value: 'unread', label: 'Unread only' }]}
            onChange={(v) => { setUnreadOnly(v === 'unread'); setMenuOpen(false) }} />
        </Popover>
      </div>
      {shown.length === 0 && (
        <>
          <div className="hot-conv-list__count">{statusTabs && statusTab !== 'all' ? `0 ${statusTab === 'closed' ? 'Closed' : 'Unresolved'} conversations` : unreadOnly ? '0 Unread conversations' : '0 conversations'}</div>
          <p className="hot-conv-list__none">No conversations found</p>
        </>
      )}
      <div className="hot-conv-list__cards">
        {shown.map(({ id, status: _status, ...card }) => (
          <ConversationCard key={id} channel={channel} {...card} selected={id === selectedId} unread={isUnread({ id, ...card })} checked={checked.has(id)} onCheckedChange={(on) => setCard(id, on)} onClick={() => onSelect?.(id)} />
        ))}
      </div>
    </section>
  )
}
