import { useRef, useState } from 'react'
import { Button } from '../../components/Button'
import { Menu } from '../../components/Menu'
import { Input } from '../../components/Input'
import { Popover } from '../../components/Popover'
import type { ChipColor } from '../../components/Tag'
import { startRipple } from '../../components/ripple'
import { Icon } from '../../icons/Icon'
import './TagsSidebar.css'

export type TagsSidebarTag = {
  /** Unique id, also the value passed to `onSelect`. */
  id: string
  label: string
  /** The colour of the square before the name. Default is grey. */
  color?: ChipColor
  /** How many conversations have this tag. */
  count: number
}

export type TagsSidebarProps = {
  /** The heading at the top. */
  title?: string
  /** The line under the heading: the inbox the tags belong to. */
  subtitle?: string
  tags: TagsSidebarTag[]
  /** The `id` of the selected tag. */
  value?: string
  onSelect?: (id: string) => void
  /** Called when the arrow at the top left is pressed, to go back to the Conversations sidebar. */
  onBack?: () => void
  /** Called when the plus at the top right is pressed, to create a tag. */
  onCreate?: () => void
  /** Called when Edit is chosen in the menu that a row's more button opens. */
  onEdit?: (id: string) => void
  /** Called when Delete is chosen in that menu. */
  onDelete?: (id: string) => void
  className?: string
}

/** The list of tags of an inbox. It takes the place of the Conversations sidebar when Tags is chosen. */
export function TagsSidebar({ title = 'Tags', subtitle, tags, value, onSelect, onBack, onCreate, onEdit, onDelete, className }: TagsSidebarProps) {
  const [query, setQuery] = useState('')
  // The row whose menu is open, and the button it opens under.
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const anchorRef = useRef<HTMLElement | null>(null)
  const shown = tags.filter((t) => t.label.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <nav className={['hot-tags-sidebar', className].filter(Boolean).join(' ')} aria-label={title}>
      <div className="hot-tags-sidebar__header">
        <div className="hot-tags-sidebar__heading">
          <Button iconOnly variant="ghost" size="xs" className="hot-tags-sidebar__icon-button" aria-label="Back" onClick={onBack}>
            <Icon name="arrowback" size={16} />
          </Button>
          <div className="hot-tags-sidebar__titles">
            <h2 className="hot-tags-sidebar__title">{title}</h2>
            {subtitle && <p className="hot-tags-sidebar__subtitle">{subtitle}</p>}
          </div>
        </div>
        <Button iconOnly variant="ghost" size="xs" className="hot-tags-sidebar__icon-button" aria-label="Create tag" onClick={onCreate}>
          <Icon name="add" size={16} />
        </Button>
      </div>
      <Input search size="sm" fullWidth placeholder="Search Tags" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul className="hot-tags-sidebar__list">
        {shown.map((tag) => (
          <li key={tag.id} className="hot-tags-sidebar__item" data-menu-open={menuFor === tag.id || undefined}>
            <button type="button" className="hot-tags-sidebar__row" aria-current={tag.id === value ? 'page' : undefined} onMouseDown={startRipple} onClick={() => onSelect?.(tag.id)}>
              <span className={`hot-tags-sidebar__dot hot-tags-sidebar__dot--${tag.color ?? 'default'}`} aria-hidden="true" />
              <span className="hot-tags-sidebar__label">{tag.label}</span>
              <span className="hot-tags-sidebar__count">{tag.count}</span>
            </button>
            {/* The number gives way to this button on hover (it stays while its menu is open). */}
            <button type="button" className="hot-tags-sidebar__more" aria-label={`More options for ${tag.label}`} aria-haspopup="menu" aria-expanded={menuFor === tag.id} onClick={(e) => { anchorRef.current = e.currentTarget; setMenuFor(tag.id) }}>
              <Icon name="vmore" size={16} />
            </button>
          </li>
        ))}
      </ul>
      <Popover open={menuFor !== null} onClose={() => setMenuFor(null)} anchorRef={anchorRef} placement="right-start">
        <Menu items={[{ value: 'edit', label: 'Edit', icon: 'edit' }, { value: 'delete', label: 'Delete', icon: 'delete' }]}
          onSelect={(v) => { const id = menuFor; setMenuFor(null); if (id) (v === 'edit' ? onEdit : onDelete)?.(id) }} />
      </Popover>
    </nav>
  )
}
