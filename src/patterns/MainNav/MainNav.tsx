import type { ReactNode } from 'react'
import { Icon } from '../../icons/Icon'
import type { IconName } from '../../icons/iconData'
import { Avatar } from '../../components/Avatar'
import { Tooltip } from '../../components/Tooltip'
import './MainNav.css'

/** Two glyphs in the nav are not in the HOT icon set, so they are drawn here exactly as in Figma. */
const glyphs: Record<'inbox' | 'helpchat', { box: string; paths: string[] }> = {
  inbox: {
    box: '6 6 16 16',
    paths: [
      'M7.6665 14C7.6665 11.0144 7.6665 9.52162 8.594 8.59412C9.5215 7.66663 11.0143 7.66663 13.9998 7.66663C16.9854 7.66663 18.4782 7.66663 19.4057 8.59412C20.3332 9.52162 20.3332 11.0144 20.3332 14C20.3332 16.9855 20.3332 18.4783 19.4057 19.4058C18.4782 20.3333 16.9854 20.3333 13.9998 20.3333C11.0143 20.3333 9.5215 20.3333 8.594 19.4058C7.6665 18.4783 7.6665 16.9855 7.6665 14Z',
      'M20.3332 15H17.0494C16.488 15 16.0469 15.4691 15.7995 15.9648C15.5307 16.5034 14.9924 17 13.9998 17C13.0072 17 12.469 16.5034 12.2002 15.9648C11.9528 15.4691 11.5117 15 10.9503 15H7.6665',
    ],
  },
  helpchat: {
    box: '4 4 16 16',
    paths: [
      'M10.6667 9.66816C10.7841 9.33424 11.016 9.05267 11.3211 8.87332C11.6263 8.69397 11.9851 8.6284 12.334 8.68825C12.6829 8.74809 12.9993 8.92947 13.2273 9.20027C13.4553 9.47107 13.58 9.81381 13.5795 10.1678C13.5795 11.1671 12.0806 11.6667 12.0806 11.6667M12.0999 13.6667H12.1066M10.6 16.8L11.5733 18.0978C11.7181 18.2908 11.7905 18.3873 11.8792 18.4218C11.9569 18.452 12.0431 18.452 12.1208 18.4218C12.2095 18.3873 12.2819 18.2908 12.4267 18.0978L13.4 16.8C13.5954 16.5394 13.6931 16.4091 13.8123 16.3097C13.9713 16.1771 14.1589 16.0832 14.3603 16.0357C14.5114 16 14.6743 16 15 16C15.9319 16 16.3978 16 16.7654 15.8477C17.2554 15.6448 17.6448 15.2554 17.8477 14.7654C18 14.3978 18 13.9319 18 13V9.2C18 8.07989 18 7.51984 17.782 7.09202C17.5903 6.71569 17.2843 6.40973 16.908 6.21799C16.4801 6 15.9201 6 14.8 6H9.2C8.07989 6 7.51984 6 7.09202 6.21799C6.71569 6.40973 6.40973 6.71569 6.21799 7.09202C6 7.51984 6 8.07989 6 9.2V13C6 13.9319 6 14.3978 6.15224 14.7654C6.35523 15.2554 6.74458 15.6448 7.23463 15.8477C7.60217 16 8.06812 16 9 16C9.32572 16 9.48858 16 9.63967 16.0357C9.84113 16.0832 10.0287 16.1771 10.1877 16.3097C10.3069 16.4091 10.4046 16.5394 10.6 16.8Z',
    ],
  },
}

export type MainNavIcon = IconName | keyof typeof glyphs

export type MainNavItem = {
  /** Unique id, also the value passed to `onChange`. */
  id: string
  /** Shown as a tooltip and read by screen readers. */
  label: string
  icon: MainNavIcon
}

export type MainNavProps = {
  /** The icons under the logo. */
  items: MainNavItem[]
  /** The `id` of the selected item. */
  value?: string
  onChange?: (id: string) => void
  /** The small icons above the avatar, such as help and chat. */
  footerItems?: MainNavItem[]
  onFooterClick?: (id: string) => void
  /** The person's letter and status, shown at the bottom. Leave out to hide the avatar. */
  user?: { initial: string; name?: string; status?: 'online' | 'offline' }
  /** Storybook only: pins the hover look on one item, by `id`. */
  forceHoverId?: string
  className?: string
}

function NavIcon({ icon }: { icon: MainNavIcon }): ReactNode {
  if (icon in glyphs) {
    const g = glyphs[icon as keyof typeof glyphs]
    return (
      <svg width={16} height={16} viewBox={g.box} fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {g.paths.map((d) => <path key={d.slice(0, 24)} d={d} />)}
      </svg>
    )
  }
  return <Icon name={icon as IconName} size={16} />
}

function HiverLogo() {
  return (
    <svg className="hot-main-nav__logo" width={24} height={24} viewBox="0 0 24 24" fill="none" role="img" aria-label="Hiver">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3107 0.941501C11.3554 0.32614 12.6446 0.32614 13.6893 0.941501L20.5541 4.98508C21.5924 5.59673 22.2316 6.72355 22.2316 7.94258V16.0574C22.2316 17.2764 21.5924 18.4032 20.5541 19.0149L13.6893 23.0585C12.6446 23.6738 11.3554 23.6738 10.3107 23.0585L3.44596 19.0149C2.40758 18.4032 1.76843 17.2764 1.76843 16.0574V7.94258C1.76843 6.72355 2.40758 5.59673 3.44596 4.98508L10.3107 0.941501Z"
        fill="#FDB022"
      />
      <path d="M8.89636 6.62842V6.62842C10.39 6.62842 11.6009 7.83927 11.6009 9.33292V17.3023V17.3023C10.1072 17.3023 8.89636 16.0915 8.89636 14.5978V6.62842Z" fill="var(--slateSurfaceDarkest)" />
      <path d="M12.951 11.4917V11.4917C14.4447 11.4917 15.6556 12.7025 15.6556 14.1962V17.5911V17.5911C14.1619 17.5911 12.951 16.3802 12.951 14.8866V11.4917Z" fill="var(--slateSurfaceDarkest)" />
    </svg>
  )
}

export function MainNav({ items, value, onChange, footerItems = [], onFooterClick, user, forceHoverId, className }: MainNavProps) {
  return (
    <nav className={['hot-main-nav', className].filter(Boolean).join(' ')} aria-label="Main">
      <div className="hot-main-nav__top">
        <div className="hot-main-nav__logo-cell"><HiverLogo /></div>
        <ul className="hot-main-nav__group">
          {items.map((item) => (
            <li key={item.id}>
              <Tooltip content={item.label} placement="right">
                <button
                  type="button"
                  className="hot-main-nav__item"
                  aria-label={item.label}
                  aria-current={item.id === value ? 'page' : undefined}
                  data-force-state={item.id === forceHoverId && item.id !== value ? 'hover' : undefined}
                  onClick={() => onChange?.(item.id)}
                >
                  <NavIcon icon={item.icon} />
                </button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
      <div className="hot-main-nav__bottom">
        {footerItems.map((item) => (
          <Tooltip key={item.id} content={item.label} placement="right">
            <button
              type="button"
              className="hot-main-nav__footer-item"
              aria-label={item.label}
              data-force-state={item.id === forceHoverId ? 'hover' : undefined}
              onClick={() => onFooterClick?.(item.id)}
            >
              <NavIcon icon={item.icon} />
            </button>
          </Tooltip>
        ))}
        {user && <Avatar initial={user.initial} status={user.status ?? 'online'} title={user.name} />}
      </div>
    </nav>
  )
}
