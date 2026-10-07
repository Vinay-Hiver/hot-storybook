import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { isPatternGlyph, PatternGlyph } from '../glyphs'
import type { PatternGlyphName } from '../glyphs'
import './ConversationsSidebar.css'

export type ConversationsSidebarItem = {
  /** Unique id, also the value passed to `onChange`. */
  id: string
  label: string
  /** An icon name from the HOT icon set, or one of the pattern glyphs (`inbox`, `voice`, `spam`). */
  icon: IconName | PatternGlyphName
  /** The unread count shown on the right, for example `99+`. Leave out for no count. */
  count?: string
}

export type ConversationsSidebarSection = {
  /** The small heading above the items, such as "Shared Inbox". Leave out for a group without a heading. */
  title?: string
  items: ConversationsSidebarItem[]
}

export type ConversationsSidebarProps = {
  /** The heading at the top. */
  title?: string
  sections: ConversationsSidebarSection[]
  /** The `id` of the selected item. */
  value?: string
  onChange?: (id: string) => void
  /** Called when the search button is pressed. */
  onSearch?: () => void
  /** Called when the plus button is pressed, for example to start a new conversation. */
  onCreate?: () => void
  /** Called when the arrow next to the plus is pressed, for example to open a menu of things to create. */
  onCreateMenu?: () => void
  /** Storybook only: pins the hover look on one item, by `id`. */
  forceHoverId?: string
  className?: string
}

function ItemIcon({ icon }: { icon: IconName | PatternGlyphName }) {
  return isPatternGlyph(icon) ? <PatternGlyph name={icon} /> : <Icon name={icon} size={16} />
}

export function ConversationsSidebar({ title = 'Conversations', sections, value, onChange, onSearch, onCreate, onCreateMenu, forceHoverId, className }: ConversationsSidebarProps) {
  return (
    <nav className={['hot-conv-sidebar', className].filter(Boolean).join(' ')} aria-label={title}>
      <div className="hot-conv-sidebar__header">
        <h2 className="hot-conv-sidebar__title">{title}</h2>
        <div className="hot-conv-sidebar__actions">
          <button type="button" className="hot-conv-sidebar__search" aria-label="Search" onClick={onSearch}>
            <Icon name="search" size={16} />
          </button>
          <div className="hot-conv-sidebar__split">
            <button type="button" className="hot-conv-sidebar__create" aria-label="New" onClick={onCreate}>
              <PatternGlyph name="plus" />
            </button>
            <button type="button" className="hot-conv-sidebar__menu" aria-label="More options" onClick={onCreateMenu}>
              <Icon name="dropdown" size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="hot-conv-sidebar__sections">
        {sections.map((section, si) => (
          <div key={section.title ?? si} className="hot-conv-sidebar__section">
            {section.title && <div className="hot-conv-sidebar__section-title">{section.title}</div>}
            <ul className="hot-conv-sidebar__list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`hot-conv-sidebar__item${section.title ? ' hot-conv-sidebar__item--grouped' : ''}`}
                    aria-current={item.id === value ? 'page' : undefined}
                    data-force-state={item.id === forceHoverId && item.id !== value ? 'hover' : undefined}
                    onClick={() => onChange?.(item.id)}
                  >
                    <span className="hot-conv-sidebar__item-main">
                      <ItemIcon icon={item.icon} />
                      <span className="hot-conv-sidebar__label">{item.label}</span>
                    </span>
                    {item.count && <span className="hot-conv-sidebar__count">{item.count}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
