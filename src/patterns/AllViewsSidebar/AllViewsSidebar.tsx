import { useState } from 'react'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Tooltip } from '../../components/Tooltip'
import { startRipple } from '../../components/ripple'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import '../TagsSidebar/TagsSidebar.css'
import './AllViewsSidebar.css'

export type AllViewsSidebarItem = {
  /** Unique id, also the value passed to `onSelect`. */
  id: string
  label: string
  icon: IconName
  /** How many conversations are in the view. */
  count: number
}

export type AllViewsSidebarProps = {
  /** The heading at the top. */
  title?: string
  /** The line under the heading: the inbox the views belong to. */
  subtitle?: string
  /** The views under "My favorites" to begin with, at the top. Each has a filled yellow star. */
  favorites: AllViewsSidebarItem[]
  /** The other views, under a line. Pointing at one shows an empty star; pressing it moves the view up to My favorites. */
  others: AllViewsSidebarItem[]
  /** The most views that can be favourites at once. Default 5. */
  maxFavorites?: number
  /** Called with the ids of the favourite views, in order, whenever a star is pressed. */
  onFavoritesChange?: (ids: string[]) => void
  /** The `id` of the selected view. */
  value?: string
  onSelect?: (id: string) => void
  /** Called when the arrow at the top left is pressed, to go back to the Conversations sidebar. */
  onBack?: () => void
  /** Called when the plus at the top right is pressed, to create a view. */
  onCreate?: () => void
  className?: string
}

/** Every view of an inbox, favourites first. It takes the place of the Conversations sidebar when All Views is chosen (Email inboxes only). */
export function AllViewsSidebar({ title = 'All Views', subtitle, favorites, others, maxFavorites = 5, onFavoritesChange, value, onSelect, onBack, onCreate, className }: AllViewsSidebarProps) {
  const [query, setQuery] = useState('')
  // The favourites, in the order they were starred. The other views keep the order they were given in.
  const [favIds, setFavIds] = useState<string[]>(() => favorites.map((v) => v.id))
  const all = [...favorites, ...others]
  const byId = new Map(all.map((v) => [v.id, v]))
  const atLimit = favIds.length >= maxFavorites
  const toggleFavorite = (id: string) => {
    const next = favIds.includes(id) ? favIds.filter((f) => f !== id) : atLimit ? favIds : [...favIds, id]
    if (next === favIds) return
    setFavIds(next)
    onFavoritesChange?.(next)
  }
  const match = (v: AllViewsSidebarItem) => v.label.toLowerCase().includes(query.trim().toLowerCase())
  const favs = favIds.map((id) => byId.get(id)).filter((v): v is AllViewsSidebarItem => !!v && match(v))
  const rest = all.filter((v) => !favIds.includes(v.id) && match(v))
  const row = (v: AllViewsSidebarItem) => {
    const starred = favIds.includes(v.id)
    const blocked = !starred && atLimit
    return (
      <li key={v.id} className="hot-all-views-sidebar__item">
        <button type="button" className="hot-tags-sidebar__row hot-all-views-sidebar__row" aria-current={v.id === value ? 'page' : undefined} onMouseDown={startRipple} onClick={() => onSelect?.(v.id)}>
          <Icon name={v.icon} size={16} />
          <span className="hot-tags-sidebar__label">{v.label}</span>
          <span className="hot-all-views-sidebar__count">{v.count}</span>
        </button>
        {/* A filled yellow star marks a favourite. A view that is not one shows an empty star on hover. */}
        <span className="hot-all-views-sidebar__star-slot">
          <Tooltip portal placement="top" content={starred ? 'Remove from favorites' : blocked ? `You can add up to ${maxFavorites} favorites` : 'Add to favorites'}>
            <button type="button" className="hot-all-views-sidebar__star" data-starred={starred || undefined} disabled={blocked} aria-pressed={starred}
              aria-label={`${starred ? 'Remove' : 'Add'} ${v.label} ${starred ? 'from' : 'to'} favorites`} onClick={() => toggleFavorite(v.id)}>
              <Icon name="star" size={14} />
            </button>
          </Tooltip>
        </span>
      </li>
    )
  }
  return (
    <nav className={['hot-tags-sidebar', 'hot-all-views-sidebar', className].filter(Boolean).join(' ')} aria-label={title}>
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
        <Button iconOnly variant="ghost" size="xs" className="hot-tags-sidebar__icon-button" aria-label="Create view" onClick={onCreate}>
          <Icon name="add" size={16} />
        </Button>
      </div>
      <Input search size="sm" fullWidth placeholder="Search views" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="hot-all-views-sidebar__groups">
        {favs.length > 0 && (
          <div className="hot-all-views-sidebar__group">
            <div className="hot-all-views-sidebar__label"><span>My favorites</span><Icon name="info" size={14} /></div>
            <ul className="hot-tags-sidebar__list hot-all-views-sidebar__list">{favs.map(row)}</ul>
          </div>
        )}
        {favs.length > 0 && rest.length > 0 && <hr className="hot-all-views-sidebar__divider" />}
        {rest.length > 0 && <ul className="hot-tags-sidebar__list hot-all-views-sidebar__list">{rest.map(row)}</ul>}
      </div>
    </nav>
  )
}
