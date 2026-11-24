import { startRipple } from '../ripple'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import './Menu.css'

export type MenuItem = {
  /** Unique value, passed to `onSelect`. */
  value: string
  label: string
  /** A 16px icon from the icon set, before the label. */
  icon?: IconName
}

export type MenuProps = {
  items: MenuItem[]
  /** Called with the `value` of the row that was pressed. */
  onSelect?: (value: string) => void
  className?: string
}

/** A small action menu: rows with an icon and a label. Put it in a Popover to open it from a button (for example a row's more button). */
export function Menu({ items, onSelect, className }: MenuProps) {
  return (
    <div className={['hot-menu', className].filter(Boolean).join(' ')}>
      <div className="hot-menu__list" role="menu">
        {items.map((item) => (
          <button key={item.value} type="button" role="menuitem" className="hot-menu__item" onMouseDown={startRipple} onClick={() => onSelect?.(item.value)}>
            {item.icon && <Icon name={item.icon} size={16} />}
            <span className="hot-menu__label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
