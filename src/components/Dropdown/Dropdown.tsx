import { useMemo, useState } from 'react'
import { Button } from '../Button'
import { ListAvatar, ListCheck, ListIcon, ListItem, ListRadio } from '../List'
import { Icon } from '../../icons'
import './Dropdown.css'

export type DropdownOption = {
  value: string
  label: string
  /** Avatar style only: the dot on the avatar. Defaults to online. */
  status?: 'online' | 'offline'
}
export type DropdownVariant = 'default' | 'avatar' | 'icon' | 'checkbox' | 'radio'

export type DropdownProps = {
  /** What each row looks like. `default` is text only. */
  variant?: DropdownVariant
  options: DropdownOption[]
  /** Heading at the top of the panel. */
  title?: string
  /** Selected value (a list of values for `checkbox`). */
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  /** Shows a search box above the options. */
  searchable?: boolean
  searchPlaceholder?: string
  /** Shows Cancel and Apply buttons below the options. */
  actions?: { cancelLabel?: string; applyLabel?: string; onCancel?: () => void; onApply?: () => void }
  className?: string
}

/** The menu panel only. Place it under a trigger yourself, for example with a popover. */
export function Dropdown({
  variant = 'default', options, title, value, defaultValue, onChange, searchable, searchPlaceholder = 'Search', actions, className,
}: DropdownProps) {
  const [inner, setInner] = useState<string | string[] | undefined>(defaultValue)
  const [query, setQuery] = useState('')
  const current = value ?? inner
  const selectedList = Array.isArray(current) ? current : current ? [current] : []
  const multi = variant === 'checkbox'

  const shown = useMemo(() => options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())), [options, query])

  const choose = (v: string) => {
    const next = multi ? (selectedList.includes(v) ? selectedList.filter((x) => x !== v) : [...selectedList, v]) : v
    setInner(next)
    onChange?.(next)
  }

  const leadingFor = (o: DropdownOption) => {
    const on = selectedList.includes(o.value)
    switch (variant) {
      case 'avatar': return <ListAvatar initial={o.label} status={o.status ?? 'online'} />
      case 'icon': return <ListIcon name="flag" />
      case 'checkbox': return <ListCheck selected={on} />
      case 'radio': return <ListRadio selected={on} />
      default: return undefined
    }
  }

  const classes = ['hot-dropdown', !actions && 'hot-dropdown--no-actions', !searchable && 'hot-dropdown--no-search', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {title && <div className="hot-dropdown__title">{title}</div>}

      {searchable && (
        <div className="hot-dropdown__search">
          <label className="hot-dropdown__field">
            <span className="hot-dropdown__field-icon" aria-hidden="true"><Icon name="search" size={16} /></span>
            <input className="hot-dropdown__field-input" placeholder={searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={searchPlaceholder} />
          </label>
        </div>
      )}

      <ul className="hot-dropdown__list" role="listbox" aria-multiselectable={multi || undefined} aria-label={title}>
        {shown.map((o) => (
          <li key={o.value} role="presentation">
            <ListItem compact role="option" aria-selected={selectedList.includes(o.value)} label={o.label} leading={leadingFor(o)} onClick={() => choose(o.value)} />
          </li>
        ))}
        {!shown.length && <li className="hot-dropdown__empty">No results</li>}
      </ul>

      {actions && (
        <div className="hot-dropdown__actions">
          <Button variant="secondary" size="sm" onClick={actions.onCancel}>{actions.cancelLabel ?? 'Cancel'}</Button>
          <Button variant="primary" size="sm" onClick={actions.onApply}>{actions.applyLabel ?? 'Apply'}</Button>
        </div>
      )}
    </div>
  )
}
